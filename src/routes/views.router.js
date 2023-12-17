import express from 'express';
import viewMiddleware from '../middlewares/view.middleware.js';

const router = express.Router();

/* GET home page. */
router.get('/', viewMiddleware, function (req, res, next) {
    res.render('index', {
        path: '',
        data: res.locals.view,
    });
});

router.get('/category/:categoryId', viewMiddleware, function (req, res, next) {
    const categoryId = req.params.categoryId;
    res.render('storeList', {
        path: '../../',
        categoryId,
        data: res.locals.view,
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

router.get('/mypage', viewMiddleware, function (req, res, next) {
    res.render('myPage', {
        path: '../',
        data: res.locals.view,
    });
});

router.get('/storeCreate', viewMiddleware, function (req, res, next) {
    res.render('storeCreate', {
        path: '../',
        data: res.locals.view,
    });
});

router.get('/storeAdmin', viewMiddleware, function (req, res, next) {
    res.render('storeAdmin', {
        path: '../',
        data: res.locals.view,
    });
});

router.get('/store/:storeId', viewMiddleware, function (req, res, next) {
    const storeId = req.params.storeId;
    res.render('store', {
        path: '../',
        storeId,
        data: res.locals.view,
    });
});

router.get('/cart', viewMiddleware, function (req, res, next) {
    res.render('cart', {
        path: '../',
        data: res.locals.view,
    });
});

router.get('/search', viewMiddleware, function (req, res, next) {
    res.render('search', {
        path: '../',
        data: res.locals.view,
    });
});

export default router;
