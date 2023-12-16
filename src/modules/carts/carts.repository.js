import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';

export class CartsRepository {
    createCart = async (user_id, menu_id, store_id, count) => {
        const createdCart = await prisma.cart.create({
            data: {
                user_id,
                menu_id,
                store_id,
                count,
            },
        });

        return createdCart;
    };

    getCarts = async (user_id) => {
        const carts = await prisma.cart.findMany({
            where: { user_id: user_id },
            select: {
                id: true,
                user_id: true,
                menu_id: true,
                store_id: true,
                count: true,
                Menu: {
                    select: { name: true, price: true, image_url: true },
                },
                Store: {
                    select: { name: true },
                },
            },
        });

        return carts.map((cart) => {
            return {
                id: cart.id,
                user_id: cart.user_id,
                menu_name: cart.Menu?.name,
                menu_price: cart.Menu?.price,
                menu_image: cart.Menu?.image_url,
                store_name: cart.Store?.name,
                count: cart.count,
            };
        });
    };

    
    getOrderCarts = async (user_id,store_id) => {
        const carts = await prisma.cart.findMany({
            where: { user_id:+user_id, store_id:+store_id },
            select: {
                id: true,
                user_id: true,
                menu_id: true,
                store_id: true,
                count: true,
                Menu: {
                    select: { name: true, price: true, image_url:true },
                },
                Store: {
                    select: { name: true },
                },
            },
        });

        return carts.map((cart) => {
            return {
                id: cart.id,
                user_id: cart.user_id,
                menu_name: cart.Menu?.name,
                menu_price: cart.Menu?.price,
                menu_image: cart.Menu?.image_url,
                store_name: cart.Store?.name,
                count: cart.count
            };
        });
    };

    updateCart = async (id, count) => {
        console.log(id, count);

        const updatedCart = await prisma.cart.update({
            where: { id },
            data: { count },
        });

        return updatedCart;
    };

    getCart = async (id) => {
        const cart = await prisma.cart.findUnique({
            where: { id: +id },
        });
        return cart;
    };

    deleteCart = async (id) => {
        await prisma.$transaction(async (tx) => {
            await tx.cart.delete({
                where: { id: +id },
            });
        });
        return {};
    };
}
