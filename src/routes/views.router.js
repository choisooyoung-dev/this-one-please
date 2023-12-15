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


export default router;
