import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import storeMiddleware from '../middlewares/store.middleware.js';
import OrderController from '../modules/stores/stores.controller.js';
const orderController = new OrderController();

const router = express.Router();

//주문 하기
router.post('', authMiddleware, orderController.createOrder);

//주문 목록 보기
router.get('', authMiddleware, orderController.getOrders);

//주문 진행 상태 수정하기
router.patch('/:state', authMiddleware, storeMiddleware, orderController.updateState);


export default router;
