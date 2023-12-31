import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { AuthController } from '../modules/auth/auth.controller.js';

const router = express.Router();

const authController = new AuthController();

// 로그인
router.post('/login', authController.login);

// 로그아웃
router.get('/logout', authMiddleware, authController.logout);

export default router;
