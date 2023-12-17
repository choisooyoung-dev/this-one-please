import { prisma } from '../../utils/prisma/index.js';

export class UsersRepository {
    signup = async (email, password, name, type, address) => {
        const createdUser = await prisma.users.create({
            data: { email, password, name, type, address },
        });
        return { createdUser };
    };

    getUser = async (id) => {
        const user = await prisma.users.findUnique({
            where: { id },
        });
        return user;
    };

    getUserEmail = async (email) => {
        const userEmail = await prisma.users.findUnique({
            where: { email },
        });
        return userEmail;
    };
}
