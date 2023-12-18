import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';
import { UsersRepository } from '../users/users.repository.js';
import { StoreRepository } from '../stores/stores.repository.js';
import { CartsRepository } from '../carts/carts.repository.js';

export default class OrderRepository {
    userRepository = new UsersRepository();
    storeRepository = new StoreRepository();
    cartsRepository = new CartsRepository();

    createOrder = async (user_id, store_id) => {
        const self = this;
        const carts = await self.cartsRepository.getOrderCarts(user_id, store_id);
        const info = JSON.stringify(carts);

        let price = 0;
        console.log(carts);
        carts.forEach((cart) => {
            price += cart.menu_price * cart.count;
        });

        // 유저 가져오기
        const user = await self.userRepository.getUser(user_id);

        if (user.point < price) {
            return { success: false, message: '금액이 부족합니다.' };
        }

        // 매장주 가져오기
        const storeUser = await self.storeRepository.getUser(store_id);

        try {
            const data = await prisma.$transaction(
                async (tx) => {
                    // 유저 금액에서 토탈 금액 뺴기
                    const updateUser = await tx.users.update({
                        where: { id: user.id },
                        data: {
                            point: user.point - price,
                        },
                    });
                    // 마이너스 되면 롤백
                    if (updateUser.point < 0) {
                        throw new Error('금액이 부족합니다.');
                    }
                    console.log('1');

                    // 매장주 한테 금액 넣어주기
                    const updateStoreUser = await tx.users.update({
                        where: { id: storeUser.id },
                        data: {
                            point: storeUser.point + price,
                        },
                    });
                    console.log('2');

                    const order = await tx.orders.create({
                        data: {
                            user_id: user_id,
                            store_id: store_id,
                            info,
                            price,
                            state: 0,
                        },
                    });
                    console.log('3');

                    return {
                        user_point: updateUser.point,
                        store_point: updateStoreUser.point,
                        order,
                        success: true,
                    };
                },
                {
                    isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
                },
            );
            return data;
        } catch (error) {
            // 롤백이 필요한 경우 에러 처리
            console.log(error);
            // 롤백을 위해 throw한 에러이므로 롤백은 이미 수행됨
            // 추가적인 롤백 작업은 필요하지 않음
            return { success: false, message: error.message };
        } finally {
            //await prisma.$disconnect(); // Prisma 클라이언트 연결 해제
        }
    };

    getOrder = async (id) => {
        const order = await prisma.orders.findUnique({
            where: { id: +id },
            select: { state: true, store_id: true },
        });
        return order;
    };

    getUserOrders = async (user_id) => {
        const orders = await prisma.orders.findMany({
            where: { user_id: +user_id },
            select: {
                id: true,
                user_id: true,
                store_id: true,
                info: true,
                price: true,
                state: true,
                created_at: true,
                updated_at: true,
                Store: {
                    select: { name: true },
                },
            },
        });
        return orders;
    };

    getStoreOrders = async (store_id) => {
        const orders = await prisma.orders.findMany({
            where: { store_id: +store_id },
            select: {
                id: true,
                user_id: true,
                store_id: true,
                info: true,
                price: true,
                User: {
                    select: { name: true },
                },
            },
        });
        return orders;
    };

    updateState = async (id, state) => {
        const updateOrder = await prisma.orders.update({
            where: { id: +id },
            data: {
                state: +state,
            },
        });
        return updateOrder;
    };

    deleteOrder = async (id) => {
        const self = this;
        try {
            const data = await prisma.$transaction(
                async (tx) => {
                    const order = await prisma.orders.findUnique({
                        where: { id: +id },
                        select: {
                            user_id: true,
                            store_id: true,
                            info: true,
                            price: true,
                        },
                    });

                    if (!order) {
                        throw new Error('해당 주문이 존재하지 않습니다.');
                    }

                    // 매장주 가져오기
                    const storeUser = await self.storeRepository.getUser(orders.store_id);
                    if (updateStoreUser.point < price) {
                        throw new Error('금액이 부족합니다.');
                    }
                    // 매장주 금액에서 토탈 금액 뺴기
                    const updateStoreUser = await tx.users.update({
                        where: { id: storeUser.id },
                        data: {
                            point: storeUser.point - orders.price,
                        },
                    });
                    // 마이너스 되면 롤백
                    if (updateUser.point < 0) {
                        throw new Error('금액이 부족합니다.');
                    }

                    // 유저 가져오기
                    const user = await self.userRepository.getUser(orders.user_id);
                    // 유저 금액에서 토탈 금액 돌려주기
                    const updateUser = await tx.users.update({
                        where: { id: user.id },
                        data: {
                            point: user.point + orders.price,
                        },
                    });

                    await prisma.orders.delete({
                        where: { id: +id },
                    });

                    return {
                        user_point: updateUser.point,
                        store_point: storeUser.point,
                        success: true,
                    };
                },
                {
                    isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
                },
            );
            return data;
        } catch (error) {
            // 롤백이 필요한 경우 에러 처리
            console.log(error);
            // 롤백을 위해 throw한 에러이므로 롤백은 이미 수행됨
            // 추가적인 롤백 작업은 필요하지 않음
            return { success: false, message: error.message };
        } finally {
            await prisma.$disconnect(); // Prisma 클라이언트 연결 해제
        }
    };
}
