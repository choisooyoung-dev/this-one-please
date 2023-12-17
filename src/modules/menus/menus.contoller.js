import { menusSchemaValidation } from '../../middlewares/validation.middleware.js';
import { MenusService } from './menus.service.js';

export class MenusController {
    menusService = new MenusService();

    // 메뉴 등록
    createMenu = async (req, res, next) => {
        try {
            const store = res.locals.store;
            const user = res.locals.user;

            // 스토어 자체가 없음.
            if (!store) {
                return res.status(404).json({ success: false, error: '해당 스토어를 찾을 수 없습니다.' });
            }
            const store_id = store.id;

            // 로그인 유저가 사장이지만 다른 스토어 메뉴 등록 불가
            if (store.user_id !== user.id) {
                return res.status(401).json({ success: false, error: '해당 스토어에 권한이 없습니다.' });
            }

            console.log(req.body);
            const { name, price } = await menusSchemaValidation.validateAsync(req.body);
            // const { image_url } = req.body;
            let image_url = 'https://node3-chapter4.s3.ap-northeast-2.amazonaws.com/2023-12-17wqn8ttq8';
            if( req.file ) {
                image_url = req.file.location;
            }
            console.log(image_url);

            if (price === undefined || price === null) {
                return res.status(401).json({ success: false, error: '가격을 입력해주세요.' });
            }

            const createdMenu = await this.menusService.createMenu(store_id, name, price, image_url);

            return res.status(200).json({ success: true, data: createdMenu });
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 전체 조회
    getMenusAll = async (req, res, next) => {
        try {
            const store_id = Number(req.params.store_id);
            const gotMenusAll = await this.menusService.getMenusAll(store_id);

            return res.status(200).json({ success: true, data: gotMenusAll });
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 단일 조회
    getMenuOne = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const gotMenuOne = await this.menusService.getMenuOne(store_id, id);

            return res.status(200).json({ success: true, data: gotMenuOne });
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 수정
    updateMenu = async (req, res, next) => {
        try {
            const store = res.locals.store;
            if (!store) {
                return res.status(404).json({ success: false, message: '해당 스토어를 찾을 수 없습니다.' });
            }
            const store_id = store.id;

            const id = Number(req.params.id);
            const { name, price, image_url } = await menusSchemaValidation.validateAsync(req.body);

            const updatedMenu = await this.menusService.updateMenu(store_id, id, name, price, image_url);

            return res.status(200).json({ success: true, data: updatedMenu });
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 삭제
    deleteMenu = async (req, res, next) => {
        try {
            const store = res.locals.store;
            if (!store) {
                return res.status(404).json({ success: false, message: '해당 스토어를 찾을 수 없습니다.' });
            }
            const store_id = store.id;

            const id = Number(req.params.id);

            const deletedMenu = await this.menusService.deleteMenu(store_id, id);

            return res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    };
}
