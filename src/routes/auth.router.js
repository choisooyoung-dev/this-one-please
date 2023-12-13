import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { AuthController } from '../modules/auth/auth.controller.js';
import authJWT from '../middlewares/jwt.middleware.js';

const router = express.Router();

const authController = new AuthController();

// 로그인
router.post('/login', authMiddleware, authController.login);

// 로그아웃
router.get('/logout', authJWT, authController.logout);

export default router;
