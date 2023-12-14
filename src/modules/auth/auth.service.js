import { AuthRepository } from './auth.repository.js';

export class AuthService {
    authRepository = new AuthRepository();

    login = async (email, password) => {
        const user = await this.authRepository.login(email);

        return { user };
    };
}
