import { Router } from 'express';
import { StoresController } from '../modules/stores/stores.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import storeMiddleware from '../middlewares/store.middleware.js';
import uploadMiddleware from '../middlewares/s3.middleware.js';

const storesRouter = Router();
const storesController = new StoresController();

// 매장 등록
storesRouter.post('', authMiddleware, storeMiddleware, uploadMiddleware.single("image_url"), storesController.open);

// 매장 조회
storesRouter.get('/:id', storesController.enter);

// 매장 수정
storesRouter.patch('', authMiddleware, storeMiddleware, storesController.remodelling);

// 매장 삭제
storesRouter.delete('', authMiddleware, storeMiddleware, storesController.close);

// 카테고리 id 일치 매장 전체 조회
storesRouter.get('/filter/:category_id', storesController.filter);

export default storesRouter;
