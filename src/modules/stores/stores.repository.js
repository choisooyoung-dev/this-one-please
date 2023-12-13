import { prisma } from '../../utils/prisma/index.js';

export class StoreRepository {
    // 매장 등록
    open = async (user_id, name, image, category_id, address) => {
        const openStore = await prisma.stores.create({
            data: { user_id, name, image, category_id, address },
        });

        return openStore;
    };

    // 매장 조회
    enter = async (id) => {
        const enterStore = await prisma.stores.findUnique({ where: { id } });

        return enterStore;
    };

    // 매장 수정
    remodelling = async (id, name, image, category_id, address) => {
        const remodellingStore = await prisma.stores.update({
            where: { id },
            data: { name, image, category_id, address },
        });

        return remodellingStore;
    };

    // 매장 삭제
    close = async (id) => {
        const closeStore = await prisma.stores.delete({ where: { id } });

        return;
    };
}
