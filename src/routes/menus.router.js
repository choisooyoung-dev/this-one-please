import { Router } from 'express';
import { MenusController } from '../modules/menus/menus.contoller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import storeMiddleware from '../middlewares/store.middleware.js';

const menusRouter = Router();
const menusController = new MenusController();

// 메뉴 등록
menusRouter.post('', authMiddleware, storeMiddleware, menusController.createMenu);

// 메뉴 전체 조회
menusRouter.get('/store/:store_id', menusController.getMenusAll);

// 메뉴 단일 조회
menusRouter.get('/:id', menusController.getMenuOne);

// 메뉴 수정
menusRouter.patch('/:id', authMiddleware, storeMiddleware, menusController.updateMenu);

// 메뉴 삭제
menusRouter.delete('/:id', authMiddleware, storeMiddleware, menusController.deleteMenu);

export default menusRouter;
