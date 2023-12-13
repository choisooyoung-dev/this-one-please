import { UsersRepository } from './users.repository.js';

export class UsersService {
    usersRespository = new UsersRepository();
    signup = async (email, password, name, type, address) => {
        const createdUser = await this.usersRespository.signup(
            email,
            password,
            name,
            type,
            address,
        );
        return {
            email: createdUser.email,
            password: createdUser.password,
            name: createdUser.name,
            type: createdUser.type,
            address: createdUser.address,
        };
    };

    getUser = async (id) => {
        const user = await this.usersRespository.getUser(id);
        return user;
    };
}
