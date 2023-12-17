import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import storeMiddleware from '../middlewares/store.middleware.js';
import OrderController from '../modules/orders/orders.controller.js';
const orderController = new OrderController();

const router = express.Router();

//주문 하기
router.post('', authMiddleware, orderController.createOrder);

//유저 주문 목록 보기
router.get('/user/:userId', authMiddleware, orderController.getUserOrders);

//매장 주문 목록 보기
router.get('/store/:storeId', authMiddleware, storeMiddleware, orderController.getStoreOrders);

//주문 진행 상태 수정하기
router.patch('/:id/:state', authMiddleware, storeMiddleware, orderController.updateState);

//주문 거절
router.delete('/:id', authMiddleware, storeMiddleware, orderController.deleteOrder);


export default router;
