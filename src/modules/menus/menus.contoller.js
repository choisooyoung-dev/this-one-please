import { MenusService } from './menus.service.js';

export class MenusController {
    menusService = new MenusService();

    // 메뉴 등록
    createMenu = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 전체 조회
    getMenusAll = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 단일 조회
    getMenuOne = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 수정
    updateMenu = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };

    // 메뉴 삭제
    deleteMenu = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };
}
