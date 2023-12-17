import { StoresService } from './stores.service.js';

export class StoresController {
    storesService = new StoresService();

    // 매장 등록
    open = async (req, res, next) => {
        try {
            const store = res.locals.store;
            if (store) {
                return res.status(400).json({
                    success: false,
                    message: '이미 매장을 가지고 있습니다.',
                });
            }

            const user_id = res.locals.user.id;
            const { name, category_id, address } = req.body;
            let image_url = 'https://node3-chapter4.s3.ap-northeast-2.amazonaws.com/2023-12-17wqn8ttq8';
            if (req.file) {
                image_url = req.file.location;
            }

            // // 에러 핸들러 미들웨어에서 statusCode와 에러 키워드를 받아 에러를 처리할 수 있도록 하면 좋을 것 같다.
            // if (!user_id) next(errorHandler, 401, 'isNotExistUser'); // 인증받은 사용자 아이디가 없음
            // if (!name) next(errorHandler, 400, 'isNotEnterName'); // body에서 이름이 입력되지 않음
            // if (!image) next(errorHandler, 400, 'isNotEnterImage'); // body에서 이미지URL이 입력되지 않음
            // if (!category_id) next(errorHandler, 400, 'isNotEnterCategoryId'); // body에서 카테고리 아이디가 입력되지 않음
            // if (!address) next(errorHandler, 400, 'isNotEnterAddress'); // body에서 주소가 입력되지 않음

            const openStore = await this.storesService.open(user_id, name, image_url, category_id, address);

            return res.status(200).json({ success: true, data: openStore });
        } catch (error) {
            next(error);
        }
    };

    // 매장 전체 조회
    getAllStore = async (req, res, next) => {
        try {
            const stores = await this.storesService.getAllStore();
            if (!stores) {
                return res.status(400).json({ success: false, error: '등록된 매장이 없습니다. ' });
            }
            return res.status(200).json({
                success: true,
                data: stores,
            });
        } catch (error) {
            next(error);
        }
    };

    // 매장 조회
    enter = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const enterStore = await this.storesService.enter(id);

            return res.status(200).json({
                success: true,
                data: enterStore,
            });
        } catch (error) {
            next(error);
        }
    };

    // 매장 수정
    remodelling = async (req, res, next) => {
        try {
            const store = res.locals.store;
            if (!store) {
                return res.status(404).json({
                    success: false,
                    message: '매장 정보가 없습니다.',
                });
            }

            const id = Number(store.id);
            let image_url = store.image_url;
            if( req.file ) {
                image_url = req.file.location;
            }
            const { name, category_id, address } = req.body;

            const remodellingStore = await this.storesService.remodelling(id, name, image_url, category_id, address);

            return res.status(200).json({
                success: true,
                data: remodellingStore,
            });
        } catch (error) {
            next(error);
        }
    };

    // 매장 삭제
    close = async (req, res, next) => {
        try {
            const store = res.locals.store;
            if (!store) {
                return res.status(404).json({
                    success: false,
                    message: '매장 정보가 없습니다.',
                });
            }

            // const user_id = res.locals.user.id;
            const id = Number(store.id);

            const closeStore = await this.storesService.close(id);

            return res.status(200).json({
                success: true,
                message: '삭제 되었습니다.',
            });
        } catch (error) {
            next(error);
        }
    };

    // 카테고리 id 일치 매장 전체 조회
    filter = async (req, res, next) => {
        try {
            const category_id = Number(req.params.category_id);

            const filterStores = await this.storesService.filter(category_id);

            return res.status(200).json({ success: true, data: filterStores });
        } catch (error) {
            next(error);
        }
    };
}
