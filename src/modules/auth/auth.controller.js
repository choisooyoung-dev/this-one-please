import { AuthService } from './auth.service.js';

export class AuthController {
    authService = new AuthService();

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.authService.login(email, password);

            res.cookie('authorization', `Bearer ${user.token}`);

            return res.status(200).json({ message: '로그인 성공' });
        } catch (error) {
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
