import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';

export class CartsRepository {
    createCart = async (menu_id, user_id, store_id, count) => {
        const menu = await prisma.menus.findUnique({
            where: { id: menu_id },
            select: { price: true },
        });

        // const price = menu?.price * count;

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

    getCarts = async (user_id) => {
        const carts = await prisma.cart.findMany({
            where: { user_id: user_id },
            select: {
                id: true,
                user_id: true,
                menu_id: true,
                store_id: true,
                count: true,
                price: true,
                Menu: {
                    select: { name: true },
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
                store_name: cart.Store?.name,
                count: cart.count,
                price: cart.price,
            };
        });
    };

    updateCart = async (id, count) => {
        console.log(id, count);

        const cart = await prisma.cart.findUnique({
            where: { id },
            select: { menu_id: true },
        });

        const menu = await prisma.menus.findUnique({
            where: { id: cart?.menu_id },
            select: { price: true },
        });

        const price = menu?.price * count;

        const updatedCart = await prisma.cart.update({
            where: { id },
            data: { count, price },
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
