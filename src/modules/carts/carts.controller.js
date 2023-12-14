import { prisma } from '../../utils/prisma/index.js';
import { CartsService } from './carts.service.js';
import { StoresController } from '../stores/stores.controller.js';

export class CartsController {
    cartsService = new CartsService();

    createCart = async (req, res, next) => {
        try {
            const { menu_id, user_id, store_id, count } = req.body;
            const createdCart = await this.cartsService.createCart(
                menu_id,
                user_id,
                store_id,
                count,
            );
            res.status(201).json({ data: createdCart, message: '성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치못한에러입니다' });
        }
    };

    getCarts = async (req, res, next) => {
        try {
            const userId = req.body.userId;
            const carts = await this.cartsService.getCarts(userId);
            console.log(carts);
            res.status(201).json({ data: carts, message: '성공' });
        } catch (e) {
            res.status(500).json({ message: '예상치못한에러입니다' });
        }
    };

    updateCart = async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const updatedCart = await this.cartsService.updateCart(
                id,
                updatedData,
            );
            res.status(201).json({
                data: updatedCart,
                message: '업데이트가 되었습니다',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치못한에러입니다' });
        }
    };

    deleteCart = async (req, res, next) => {
        try {
            const { id } = req.params;
            const cart = await prisma.cart.findUnique({
                where: { id: +id },
            });
            if (!cart) {
                res.status(404).json({ message: '삭제할 주문목록이 없습니다' });
            }
            await prisma.$transaction(async (tx) => {
                await tx.cart.delete({
                    where: { id: +id },
                });
            });
            res.status(201).json({ message: '삭제 성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치 못한 에러입니다' });
        }
    };
}
