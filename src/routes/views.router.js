import express from 'express';
import jwt from 'jsonwebtoken';
import redisClient from '../../auth-utils/redis.util.js';
import { prisma } from './../utils/prisma/index.js';

const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const [isLogin, user, store] = await checkLogin(req, res);
    res.render('index', {
        path: '',
        isLogin,
        user,
        store
    });
});

router.get('/category/:categoryId', function (req, res, next) {
    const categoryId = req.params.categoryId;
    res.render('storeList', {
        path: '../../',
        categoryId,
    });
});

router.get('/signup', function (req, res, next) {
    res.render('signup', {
        path: '../',
    });
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        path: '../',
    });
});

router.get('/mypage', function (req, res, next) {
    res.render('myPage', {
        path: '../'
    });
});

router.get('/store', function (req, res, next) {
    res.render('storeCreate', {
        path: '../',
    });
});

router.get('/store/:storeId', function (req, res, next) {
    const storeId = req.params.storeId;
    res.render('store', {
        path: '../',
        storeId,
    });
});


async function checkLogin(req, res) {
    const { accessToken, refreshToken } = req.cookies;
    
    if (!accessToken) {
        return [false,null,null];
    }

    function validToken(token, secretKey) {
        try {
            const payload = jwt.verify(token, secretKey);
            return payload;
        } catch (error) {
            console.log(error);
        }
    }

    const accessPayload = validToken(accessToken, process.env.ACC_TOKEN_KEY);

    console.log('accessPayload: ', accessPayload);
    const refreshPayload = validToken(refreshToken, process.env.REF_TOKEN_KEY);
    const redisRefreshToken = await redisClient.get(refreshToken);


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
    }

    if (!refreshToken) {
        if (accessPayload) {
            const { user_id } = accessPayload;
            const newRefreshToken = jwt.sign(
                { user_id },
                process.env.REF_TOKEN_KEY,
            );
            res.cookie('refreshToken', newRefreshToken);
        }
    }

    if (!redisRefreshToken) {
        return [false,null,null];
    }

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
    }

    const { user_id } = accessPayload;
    const user = await prisma.users.findUnique({ where: { id: user_id } });
    let store = null;
    if( user.type === 1 ){
        store = await prisma.stores.findUnique({ where: { user_id } });
    }

    return [true,user,store];
}

export default router;
