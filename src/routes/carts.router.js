import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { CartsController } from '../modules/carts/carts.controller.js';

const router = express.Router();
const cartController = new CartsController();

//Cart담기
router.post('', authMiddleware, cartController.createCart);

//Cart목록보기
router.get('', authMiddleware, cartController.getCarts);

//Cart수정하기
router.patch('/:id', authMiddleware, cartController.updateCart);

//Cart삭제하기
router.delete('/:id', authMiddleware, cartController.deleteCart);

export default router;
