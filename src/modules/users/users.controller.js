import { UsersService } from './users.service.js';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import redisClient from '../../../auth-utils/redis.util.js';
dotenv.config();

export class UsersController {
    usersService = new UsersService();

    // 회원 가입 시 인증 이메일 보내기
    sendEmail = async (req, res, next) => {
        const { email } = req.body;

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // gmail 사용
                auth: {
                    user: process.env.MAILS_EMAIL, // env 파일 내 보내는 사람의 메일 주소
                    pass: process.env.MAILS_PWD, // env 파일 내 생성된 앱 비밀번호 16자리
                },
            });

            // 랜덤 인증번호 생성 함수
            const randomStrFunc = (num) => {
                const characters =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                let result = '';
                const randomMaxLength = characters.length;
                for (let i = 0; i < num; i++) {
                    result += characters.charAt(
                        Math.floor(Math.random() * randomMaxLength),
                    );
                }

                return result;
            };

            let randomStr = randomStrFunc(10);
            redisClient.set(
                randomStr,
                randomStr,
                'EX',
                process.env.MAILS_AUTHNUM_EXP_IN,
                async () => {
                    console.log(key + 'redis 저장 완료');
                },
            );
            if (!email) {
                return res
                    .status(400)
                    .json({ success: false, error: '이메일을 입력해주세요.' });
            }
            async function main() {
                await transporter.sendMail({
                    from: process.env.MAILS_EMAIL, // env 파일 내 보내는 사람의 메일 주소
                    to: email, // 받는 사람
                    subject: '👋 2거주세요 가입 인증번호입니다.', // 제목
                    text: `인증번호는 ${randomStr} 입니다.`, // 메일 내용
                    // html: "<b>Hello world?</b>", // html 보내줄 수도 있음
                });
            }
            await main();

            res.status(200).json({
                success: true,
                message:
                    '입력해주신 이메일 주소로 전송되었습니다. 확인해주세요.',
            });

            res.redirect('/');
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    // 회원 가입 시 인증 번호 검증
    verifyEmail = async (req, res, next) => {
        try {
            const { authEmailNum } = req.body;

            const redisAuthEmailNum = await redisClient.get(authEmailNum);

            if (!redisAuthEmailNum) {
                return res.status(400).json({
                    success: false,
                    error: '일치하지 않은 인증번호 입니다. 다시 입력해주세요.',
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: '인증되었습니다. 가입을 진행해주세요.',
                });

                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    // 회원 가입
    signup = async (req, res, next) => {
        try {
            // const { email, password, name, type, address } = req.body;
            // 회원가입 입력 폼에서 받아 온 데이터들로 변경
            const { email, name, type, address, password } = res.data;
            await this.usersService.signup(
                email,
                password,
                name,
                type,
                address,
            );
            return res.status(201).json({
                success: true,
                data: email,
                password,
                name,
                type,
                address,
            });
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
            return res.status(201).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    };

    /*
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
    */
}
