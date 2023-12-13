import { StoreRepository } from './stores.repository.js';

export class StoresService {
    storeRepository = new StoreRepository();

    // 매장 등록
    open = async (user_id, name, image, category_id, address) => {
        // 이미지url 형식 유효성검사
        // 주소 형식 유효성검사

        const openStore = await this.storeRepository.open(
            user_id,
            name,
            image,
            category_id,
            address,
        );

        return {
            id: openStore.id,
            name: openStore.name,
            image: openStore.image,
            category_id: openStore.category_id,
            address: openStore.address,
        };
    };

    // 매장 조회
    enter = async (id) => {
        const enterStore = await this.storeRepository.enter(id);

        return {
            id: enterStore.id,
            user_id: enterStore.user_id,
            name: enterStore.name,
            image: enterStore.image,
            category_id: enterStore.category_id,
            address: enterStore.address,
            createdAt: enterStore.createdAt,
            updatedAt: enterStore.updatedAt,
        };
    };

    // 매장 수정
    interior = async () => {};

    // 매장 삭제
    close = async () => {};
}
