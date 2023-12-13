import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
var router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __path = path.join(__dirname, '..','public');
console.log(__path);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',path:__path });
});

router.get('/category/:categoryId', function(req, res, next) {
  const categoryId = req.params.categoryId;
  res.render('storeList', { categoryId,path:__path });
});


export default router;
