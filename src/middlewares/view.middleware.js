import jwt from 'jsonwebtoken';
import redisClient from '../../auth-utils/redis.util.js';
import { prisma } from './../utils/prisma/index.js';

export default async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  res.locals.view = {isLogin:false,user:null,store:null};
    if (!accessToken && !refreshToken) {
      next();
      return;
    }

    async function returnData(user_id) {
        const user = await prisma.users.findUnique({ where: { id: user_id } });
        let store = null;
        if (user.type === 1) {
            store = await prisma.stores.findUnique({ where: { user_id } });
        }
        res.locals.view = {isLogin:true,user,store};
        next();
        return;
    }

    function validToken(token, secretKey) {
        try {
            if( !token )
                return null;
            const payload = jwt.verify(token, secretKey);
            return payload;
        } catch (error) {
            console.log(error);
        }
    }

    let accessPayload = null;
    if(accessToken)
        accessPayload =validToken(accessToken, process.env.ACC_TOKEN_KEY);

        
    let refreshPayload = null;
    let redisRefreshToken = null;
    if(refreshToken) {
        refreshPayload =validToken(refreshToken, process.env.REF_TOKEN_KEY);
        redisRefreshToken = await redisClient.get(refreshToken);
    }

    if (!accessPayload) {
        if (refreshPayload && Number(redisRefreshToken) === jwt.decode(refreshToken).user_id) {
            const { user_id } = refreshPayload;
            const newAccessToken = jwt.sign({ user_id }, process.env.ACC_TOKEN_KEY);
            res.cookie('accessToken', newAccessToken);

            return await returnData(user_id);
        } else {
        }
    }

    if (!refreshToken) {
        if (accessPayload) {
            const { user_id } = accessPayload;
            const newRefreshToken = jwt.sign({ user_id }, process.env.REF_TOKEN_KEY);
            res.cookie('refreshToken', newRefreshToken);
            return await returnData(user_id);
        }
    }

    if (!redisRefreshToken) {
        next();
        return;
    }

    if (!refreshPayload) {
        if (accessPayload && Number(redisRefreshToken) === jwt.decode(accessToken).user_id) {
            const { user_id } = accessPayload;
            const newRefreshToken = jwt.sign({ user_id }, process.env.REF_TOKEN_KEY);
            res.cookie('refreshToken', newRefreshToken);
            return await returnData(user_id);
        }
    }
    if (!refreshPayload && !accessPayload) {
      next();
      return;
    }

    const user_id = accessPayload ? accessPayload.user_id : refreshPayload.user_id;
    return await returnData(user_id);
}