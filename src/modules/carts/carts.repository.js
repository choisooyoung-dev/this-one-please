import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';

export class CartsRepository {
    createCart = async (menu_id, user_id, store_id, count, price) => {
        const createdCart = await prisma.$transaction(
            async (tx) => {
                const cart = await tx.cart.create({
                    data: {
                        menu_id: +menu_id,
                        user_id: +user_id,
                        store_id: +store_id,
                        count: +count,
                        price: +price,
                    },
                });
                return cart;
            },
            {
                isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
            },
        );
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
