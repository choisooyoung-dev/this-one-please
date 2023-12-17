import { prisma } from '../../utils/prisma/index.js';

export class MenusRepository {
    // 메뉴 등록
    createMenu = async (store_id, name, price, image_url) => {
        console.log('reposi---------');
        const createdMenu = await prisma.menus.create({
            data: { store_id, name, price, image_url },
        });
        console.log('createdMenu: ', createdMenu);

        return createdMenu;
    };

    // 메뉴 전체 조회
    getMenusAll = async (store_id) => {
        const gotMenusAll = await prisma.menus.findMany({
            where: { store_id },
        });

        return gotMenusAll;
    };

    // 메뉴 단일 조회
    getMenuOne = async (store_id, id) => {
        const gotMenuOne = await prisma.menus.findUnique({
            where: { store_id, id },
        });

        return gotMenuOne;
    };

    // 메뉴 수정
    updateMenu = async (store_id, id, name, price, image_url) => {
        const updatedMenu = await prisma.menus.update({
            where: { store_id, id },
            data: { name, price, image_url },
        });

        return updatedMenu;
    };

    // 메뉴 삭제
    deleteMenu = async (store_id, id) => {
        const deletedMenu = await prisma.menus.delete({
            where: { store_id, id },
        });

        return;
    };
}
