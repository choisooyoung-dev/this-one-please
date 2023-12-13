import express from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma/index.js';
//controller

const router = express.Router();

//Cart담기
router.post('', async (req, res, next) => {
    //    {
    //     userId:1,
    //     menuId:3,
    //     storeId:1,
    //     count:1,
    //     price:0,
    // }
    // const { menu_id, user_id, count, price } = req.body;
    const cart = await prisma.$transaction(
        async (tx) => {
            const cart = await tx.cart.create({
                data: {
                    menu_id: 2,
                    user_id: 1,
                    store_id: 1,
                    count: 1,
                    price: 0,
                },
            });
            return cart;
        },
        {
            isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
        },
    );
    res.status(201).json({ data: cart, message: '성공' });
});

//Cart목록보기
router.get('', async (req, res, next) => {});

//Cart수정하기
router.patch('/:id', async (req, res, next) => {});

//Cart삭제하기
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    await prisma.$transaction(async (tx) => {
        await tx.cart.delete({
            where: { id: +id },
        });
    });
    res.status(201).json({ message: '삭제 성공' });
});

export default router;
