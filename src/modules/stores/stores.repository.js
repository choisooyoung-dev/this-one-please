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
    enter = async () => {};

    // 매장 수정
    interior = async () => {};

    // 매장 삭제
    close = async () => {};
}
