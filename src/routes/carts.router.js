import express from 'express';
//controller
import { CartsController } from '../modules/carts/carts.controller.js';

const router = express.Router();
const cartController = new CartsController();

//Cart담기
router.post('', cartController.createCart);

//Cart목록보기
router.get('', cartController.getCarts);

//Cart수정하기
router.patch('/:id', cartController.updateCart);

//Cart삭제하기
router.delete('/:id', cartController.deleteCart);

export default router;
