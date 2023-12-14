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
            // const paramId = Number(req.params.id);
            // // console.log(res.locals);
            const localUserId = res.locals.user.id;

            // 파라미터에서 받은 user의 id 값과 res.locals 안에있는 user id 값이 다르다면
            // if (paramId !== localUserId) {
            //     return res.status(401).json({ message: '권한이 없습니다.' });
            // }

            const user = await this.usersService.getUser(localUserId);
            return res.status(201).json({ data: user });
        } catch (error) {
            next(error);
        }
    };

    // 회원 수정
    updateUser = async (req, res, next) => {
        try {
            const paramId = Number(req.params.id);
            const localUserId = res.locals.user.id;
        } catch (error) {}
    };

    // 회원 탈퇴
    deleteUser = async (req, res, next) => {
        try {
            const paramId = Number(req.params.id);
            const localUserId = res.locals.user.id;
        } catch (error) {
            next(error);
        }
    };
}
