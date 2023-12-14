import { StoreRepository } from './stores.repository.js';

export class StoresService {
    storeRepository = new StoreRepository();

    // 매장 등록
    open = async (user_id, name, image_url, category_id, address) => {
        // 이미지url 형식 유효성검사
        // 주소 형식 유효성검사

        const openStore = await this.storeRepository.open(
            user_id,
            name,
            image_url,
            category_id,
            address,
        );

        return {
            id: openStore.id,
            name: openStore.name,
            image_url: openStore.image_url,
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
            image_url: enterStore.image_url,
            category_id: enterStore.category_id,
            address: enterStore.address,
            createdAt: enterStore.createdAt,
            updatedAt: enterStore.updatedAt,
        };
    };

    // 매장 수정
    remodelling = async (
        user_id,
        id,
        name,
        image_url,
        category_id,
        address,
    ) => {
        const remodellingStore = await this.storeRepository.remodelling(
            user_id,
            id,
            name,
            image_url,
            category_id,
            address,
        );

        return {
            id: remodellingStore.id,
            user_id: remodellingStore.user_id,
            name: remodellingStore.name,
            image_url: remodellingStore.image_url,
            category_id: remodellingStore.category_id,
            address: remodellingStore.address,
            createdAt: remodellingStore.createdAt,
            updatedAt: remodellingStore.updatedAt,
        };
    };

    // 매장 삭제
    close = async (user_id, id) => {
        const closeStore = await this.storeRepository.close(user_id, id);

        return;
    };

    // 카테고리 id 일치 매장 전체 조회
    filter = async (category_id) => {
        const filterStores = await this.storeRepository.filter(category_id);

        return filterStores.map((store) => {
            return {
                id: store.id,
                user_id: store.user_id,
                name: store.name,
                image_url: store.image_url,
                category_id: store.category_id,
                address: store.address,
                createdAt: store.createdAt,
                updatedAt: store.updatedAt,
            };
        });
    };
}
