import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        path: '',
    });
});

router.get('/category/:categoryId', function (req, res, next) {
    const categoryId = req.params.categoryId;
    res.render('storeList', {
        categoryId,
        path: '../../',
    });
});

router.get('/signup', function (req, res, next) {
    res.render('signup', {
        path: '../',
    });
});

export default router;
