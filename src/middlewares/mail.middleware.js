import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import redisClient from '../../auth-utils/redis.util.js';
dotenv.config();

export default async (req, res, next) => {
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
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let result = '';
            const randomMaxLength = characters.length;
            for (let i = 0; i < num; i++) {
                result += characters.charAt(Math.floor(Math.random() * randomMaxLength));
            }

            return result;
        };

        let randomStr = randomStrFunc(10);
        redisClient.set(randomStr, randomStr);

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
        res.redirect('signup');
    } catch (error) {
        console.log(error);
    }
};
