import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';

export class CartsRepository {
    createCart = async (menu_id, user_id, store_id, count) => {
        const menu = await prisma.menus.findUnique({
            where: { id: menu_id },
            select: { price: true },
        });

        const price = menu?.price * count;

        const createdCart = await prisma.cart.create({
            data: {
                menu_id,
                user_id,
                store_id,
                count,
                price,
            },
        });

        return createdCart;
    };

    getCarts = async (userId) => {
        const carts = await prisma.cart.findMany({
            where: { user_id: +userId },
            select: {
                id: true,
                menu_id: true,
                store_id: true,
                count: true,
            },
        });
        return carts;
    };

    updateCart = async (id, updatedData) => {
        console.log(id, updatedData);
        const updatedCart = await prisma.$transaction(
            async (tx) => {
                await tx.cart.update({
                    data: {
                        ...updatedData,
                    },
                    where: {
                        id: +id,
                    },
                });
            },
            {
                isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
            },
        );
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
