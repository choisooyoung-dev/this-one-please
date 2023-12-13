import redisClient from '../../../auth-utils/redis.util.js';
import { AuthService } from './auth.service.js';
import { sign, refresh } from '../../../auth-utils/jwt.util.js';
import dotenv from 'dotenv';
// import { refresh } from '../../../auth-utils/jwt.util.js';
dotenv.config();

export class AuthController {
    authService = new AuthService();

    login = async (req, res, next) => {
        try {
            console.log(req.body);
            const { email, password } = req.body;

            const user = await this.authService.login(email, password);

            if (!user) {
                throw error;
            }

            const secret = process.env.TOKEN_KEY;
            if (!secret) {
                return res
                    .status(500)
                    .json({ error: 'JWT secret key is missing' });
            }
            const accessToken = sign({ user }, secret);
            const refreshToken = refresh();

            redisClient.set(toString(user.id), refreshToken);

            res.status(200).send({
                // client에게 토큰 모두를 반환합니다.
                ok: true,
                data: {
                    accessToken,
                    refreshToken,
                },
            });

            //return res.status(200).json({ message: '로그인 성공' });
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    logout = async (req, res, next) => {
        try {
            res.clearCookie('authorization');
            return res.status(200).json({
                message: '로그아웃 성공',
            });
        } catch (err) {
            next(err);
        }
    };
}
