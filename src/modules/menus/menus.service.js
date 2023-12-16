import { MenusRepository } from './menus.repository.js';

export class MenusService {
    menusRepository = new MenusRepository();
    // 메뉴 등록
    createMenu = async (store_id, name, price, image_url) => {
        const createdMenu = await this.menusRepository.createMenu(store_id, name, price, image_url);

        return {
            store_id: createdMenu.store_id,
            id: createdMenu.id,
            name: createdMenu.name,
            price: createdMenu.price,
            image_url: createdMenu.image_url,
        };
    };

    // 메뉴 전체 조회
    getMenusAll = async (store_id) => {
        const gotMenusAll = await this.menusRepository.getMenusAll(store_id);

        return gotMenusAll.map((menu) => {
            return {
                store_id: menu.store_id,
                id: menu.id,
                name: menu.name,
                price: menu.price,
                image_url: menu.image_url,
            };
        });
    };

    // 메뉴 단일 조회
    getMenuOne = async (store_id, id) => {
        const gotMenuOne = await this.menusRepository.getMenuOne(store_id, id);

        return {
            store_id: gotMenuOne.store_id,
            id: gotMenuOne.id,
            name: gotMenuOne.name,
            price: gotMenuOne.price,
            image_url: gotMenuOne.image_url,
        };
    };

    // 메뉴 수정
    updateMenu = async (store_id, id, name, price, image_url) => {
        const updatedMenu = await this.menusRepository.updateMenu(store_id, id, name, price, image_url);

        return {
            store_id: updatedMenu.store_id,
            id: updatedMenu.id,
            name: updatedMenu.name,
            price: updatedMenu.price,
            image_url: updatedMenu.image_url,
        };
    };

    // 메뉴 삭제
    deleteMenu = async (store_id, id) => {
        const deletedMenu = await this.menusRepository.deleteMenu(store_id, id);

        return;
    };
}
