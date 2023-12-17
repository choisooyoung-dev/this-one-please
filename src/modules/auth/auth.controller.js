import redisClient from '../../../auth-utils/redis.util.js';
import { AuthService } from './auth.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { loginSchemaValidation } from '../../middlewares/validation.middleware.js';
dotenv.config();

export class AuthController {
    authService = new AuthService();

    login = async (req, res, next) => {
        try {
            const { email, password } = await loginSchemaValidation.validateAsync(req.body);

            const user = await this.authService.login(email, password);

            if (!user) {
                return res.status(400).json({ success: false, error: '가입되어있지 않은 계정입니다. 회원가입 해주세요.' });
            }

            const user_id = user.id;

            if (email !== user.email) {
                return res.status(400).json({ success: false, error: '가입되어있지 않은 계정입니다. 회원가입 해주세요.' });
            }

            if (password !== user.password) {
                return res.status(401).json({ success: false, error: '비밀번호가 일치하지 않습니다.' });
            }

            const accessToken = jwt.sign({ user_id }, process.env.ACC_TOKEN_KEY, {
                expiresIn: process.env.ACCESS_EXP_IN,
            });
            const refreshToken = jwt.sign({ user_id }, process.env.REF_TOKEN_KEY, {
                expiresIn: process.env.REFRESH_EXP_IN,
            });

            // Accesstoken 쿠키 저장
            res.cookie('accessToken', accessToken);
            // Refreshtoken redis 저장 (key, value)
            redisClient.set(refreshToken, user_id);
            res.cookie('refreshToken', refreshToken);

            return res.status(200).json({
                success: true,
                message: '로그인 되었습니다.',
                data: { accessToken, refreshToken },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    logout = async (req, res, next) => {
        try {
            // AccessToken 및 RefreshToken 변수 선언
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            // Redis에서 키 삭제
            redisClient.del(refreshToken);
            redisClient.del(accessToken);

            return res.status(200).json({
                success: true,
                message: '로그아웃 성공',
            });
        } catch (err) {
            next(err);
        }
    };
}
