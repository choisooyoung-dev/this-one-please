import { UsersService } from './users.service.js';

export class UsersController {
    usersService = new UsersService();

    // 회원 가입
    signup = async (req, res, next) => {
        try {
            const { email, password, name, type, address } = req.body;
            await this.usersService.signup(
                email,
                password,
                name,
                type,
                address,
            );
            return res
                .status(201)
                .json({ data: email, password, name, type, address });
        } catch (error) {
            next(error);
        }
    };

    // 회원 정보 가져오기
    getUser = async (req, res, next) => {
        try {
            console.log(req.params);
            const id = Number(req.params.id);

            const user = await this.usersService.getUser(id);
            return res.status(201).json({ data: user });
        } catch (error) {
            next(error);
        }
    };

    // 회원 수정

    // 회원 탈퇴
    deleteUser = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };
}
