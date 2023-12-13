import { AuthRepository } from './auth.repository.js';
import jwt from 'jsonwebtoken';

export class AuthService {
    authRepository = new AuthRepository();

    login = async (email, password) => {
        const user = await this.authRepository.login(email);

        // JWT 생성
        const token = jwt.sign(
            {
                user_id: user.id,
            },
            process.env.TOKEN_KEY,
            { expiresIn: '12h' }, // 만료시간 12시간
        );

        return { user, token };
    };
}
