import express from 'express';
import { UsersController } from '../modules/users/users.controller.js';
import authMailMiddleware from '../middlewares/mail.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const usersController = new UsersController();

// 회원가입 폼으로 돌아가기 위한 라우터
router.get('/signup', (req, res) => {
    // Error: path is not defined -> path 값 설정 후 정상 동작
    res.render('signup', { path: '../public/' });
});

// 사용자 회원가입
router.post('/signup', usersController.signup);

// 사용자 인증번호 이메일 보내기
router.post('/signup/send-mail', usersController.sendEmail);

// 사용자 인증번호 이메일 인증
router.post('/signup/verify-mail', usersController.verifyEmail);

// 사용자 정보
router.get('', authMiddleware, usersController.getUser);

export default router;
