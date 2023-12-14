import { MenusRepository } from './menus.repository.js';

export class MenusService {
    menusRepository = new MenusRepository();
    // 메뉴 등록
    createMenu = async () => {};

    // 메뉴 전체 조회
    getMenusAll = async () => {};

    // 메뉴 단일 조회
    getMenuOne = async () => {};

    // 메뉴 수정
    updateMenu = async () => {};

    // 메뉴 삭제
    deleteMenu = async () => {};
}
