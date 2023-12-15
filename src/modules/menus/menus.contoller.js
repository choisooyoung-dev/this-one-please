import { MenusService } from './menus.service.js';

export class MenusController {
    menusService = new MenusService();

    // 메뉴 등록
    createMenu = async (req, res, next) => {
        try {
            const store_id = Number(req.params.store_id);
            const { name, price, image_url } = req.body;

            const createdMenu = await this.menusService.createMenu(
                store_id,
                name,
                price,
                image_url,
            );

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
            const store_id = Number(req.params.store_id);
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
            const store_id = Number(req.params.store_id);
            const id = Number(req.params.id);
            const { name, price, image_url } = req.body;

            const updatedMenu = await this.menusService.updateMenu(
                store_id,
                id,
                name,
                price,
                image_url,
            );

            return res.status(200).json({ success: true, data: updatedMenu });
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 삭제
    deleteMenu = async (req, res, next) => {
        try {
            const store_id = Number(req.params.store_id);
            const id = Number(req.params.id);

            const deletedMenu = await this.menusService.deleteMenu(
                store_id,
                id,
            );

            return res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    };
}
