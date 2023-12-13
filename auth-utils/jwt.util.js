// node.js의 내장함수인 util모듈 중에  promisify라는 함수
// 비동기로 돌리려는 함수를 promise로 감싸주지 않고 사용할 수 있다.
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import redisClient from './redis.util.js';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.TOKEN_KEY;

const sign = (user_id) => {
    // access token 발급
    const payload = {
        // access token에 들어갈 payload
        user_id,
    };
    return jwt.sign(payload, secret, {
        // secret으로 sign하여 발급하고 return
        // env로 빼기
        expiresIn: '5m', // 유효기간
        algorithm: 'HS256', // 암호화 알고리즘
    });
};

const verify = (token) => {
    // access token 검증
    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
        return {
            ok: true,
            id: decoded.id,
            role: decoded.role,
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
};

const refresh = () => {
    // refresh token 발급
    return jwt.sign({}, secret, {
        // refresh token은 payload 없이 발급
        // env로 빼기
        algorithm: 'HS256',
        expiresIn: '30m',
    });
};

const refreshVerify = async (token, user_id) => {
    // refresh token 검증
    /* redis 모듈은 기본적으로 promise를 반환하지 않으므로,
       promisify를 이용하여 promise를 반환하게 해줍니다.*/
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
        const data = await getAsync(user_id); // refresh token 가져오기
        if (token === data) {
            try {
                await promisify(jwt.verify)(token, secret);
                return true;
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export { sign, verify, refresh, refreshVerify };
