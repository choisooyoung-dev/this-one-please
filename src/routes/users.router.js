import express from 'express';
import { UsersController } from '../modules/users/users.controller.js';
import authMailMiddleware from '../middlewares/mail.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const usersController = new UsersController();

// 회원가입 폼으로 돌아가기 위한 라우터
router.get('/signup', (req, res) => {
    res.render('signup');
});

// 사용자 회원가입
router.post('/signup', authMailMiddleware, usersController.signup);

// 사용자 이메일 인증
// router.post('/signup/auth-mail', usersController.signup);

// 사용자 정보
router.get('', authMiddleware, usersController.getUser);

export default router;
