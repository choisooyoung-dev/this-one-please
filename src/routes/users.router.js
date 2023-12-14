import express from 'express';
import { UsersController } from '../modules/users/users.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const usersController = new UsersController();

// 사용자 회원가입
router.post('/signup', usersController.signup);

// 사용자 정보
router.get('/:id', authMiddleware, usersController.getUser);

export default router;
