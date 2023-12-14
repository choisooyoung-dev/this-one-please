import jwt from 'jsonwebtoken';
import { prisma } from './../utils/prisma/index.js';
import redisClient from '../../auth-utils/redis.util.js';
export default async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies;
        const accessPayload = validToken(
            accessToken,
            process.env.ACC_TOKEN_KEY,
        );

        console.log('accessPayload: ', accessPayload);
        const refreshPayload = validToken(
            refreshToken,
            process.env.REF_TOKEN_KEY,
        );
        const redisRefreshToken = await redisClient.get(refreshToken);
        console.log(redisRefreshToken);

        if (!accessToken) {
            return res.status(401).json({ message: '다시 로그인 해주세요.' });
        }

        // accesstoken이 만료되고, refreshtoken은 있을때
        if (!accessPayload) {
            if (
                refreshPayload &&
                Number(redisRefreshToken) === jwt.decode(refreshToken).user_id
            ) {
                const { user_id } = refreshPayload;
                const newAccessToken = jwt.sign(
                    { user_id },
                    process.env.ACC_TOKEN_KEY,
                );
                res.cookie('accessToken', newAccessToken);
            }

            return res
                .status(200)
                .json({ message: 'ACCESS TOKEN이 갱신 되었습니다.' });
        }

        // refreshtoken 없을때, accesstoken이 인증되었다면 새로운 refreshtoken 발급해주기
        if (!refreshToken) {
            if (accessPayload) {
                const { user_id } = accessPayload;
                const newRefreshToken = jwt.sign(
                    { user_id },
                    process.env.REF_TOKEN_KEY,
                );
                res.cookie('refreshToken', newRefreshToken);
            }
            return res
                .status(401)
                .json({ message: 'REFRESH TOKEN이 존재하지 않습니다.' });
        }

        if (!redisRefreshToken) {
            return res
                .status(401)
                .json({ message: 'REFRESH TOKEN이 서버에 존재하지 않습니다.' });
        }

        // accesstoken은 있고, refreshtoken 만료되었을때
        if (!refreshPayload) {
            if (
                accessPayload &&
                Number(redisRefreshToken) === jwt.decode(accessToken).user_id
            ) {
                const { user_id } = accessPayload;
                const newRefreshToken = jwt.sign(
                    { user_id },
                    process.env.REF_TOKEN_KEY,
                );
                res.cookie('refreshToken', newRefreshToken);
            }
            return res
                .status(200)
                .json({ message: 'REFRESH TOKEN이 갱신 되었습니다.' });
        }

        const { user_id } = accessPayload;
        const user = await prisma.users.findUnique({ where: { id: user_id } });

        res.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

function validToken(token, secretKey) {
    try {
        const payload = jwt.verify(token, secretKey);
        return payload;
    } catch (error) {
        console.log(error);
    }
}
