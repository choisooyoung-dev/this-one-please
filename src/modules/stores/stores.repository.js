import { prisma } from '../../utils/prisma/index.js';

export class StoreRepository {
    // 매장 등록
    open = async (user_id, name, image_url, category_id, address) => {
        const openStore = await prisma.stores.create({
            data: { user_id, name, image_url, category_id, address },
        });

        return openStore;
    };

    // 매장 조회
    enter = async (id) => {
        const enterStore = await prisma.stores.findUnique({ where: { id } });

        return enterStore;
    };

    // 매장 수정
    remodelling = async (id, name, image_url, category_id, address) => {
        const remodellingStore = await prisma.stores.update({
            where: { id },
            data: { name, image_url, category_id, address },
        });

        return remodellingStore;
    };

    // 매장 삭제
    close = async (id) => {
        const closeStore = await prisma.stores.delete({
            where: { id },
        });

        return;
    };

    // 카테고리 id 일치 매장 전체 조회
    filter = async (category_id) => {
        const filterStores = await prisma.stores.findMany({
            where: { category_id },
        });

        return filterStores;
    };
}
