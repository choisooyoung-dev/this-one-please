import { StoresService } from './stores.service.js';

export class StoresController {
    storesService = new StoresService();

    // 매장 등록
    open = async (req, res, next) => {
        try {
            // const { id: user_id } = res.locals.user;
            const { user_id, name, image_url, category_id, address } = req.body;

            // // 에러 핸들러 미들웨어에서 statusCode와 에러 키워드를 받아 에러를 처리할 수 있도록 하면 좋을 것 같다.
            // if (!user_id) next(errorHandler, 401, 'isNotExistUser'); // 인증받은 사용자 아이디가 없음
            // if (!name) next(errorHandler, 400, 'isNotEnterName'); // body에서 이름이 입력되지 않음
            // if (!image) next(errorHandler, 400, 'isNotEnterImage'); // body에서 이미지URL이 입력되지 않음
            // if (!category_id) next(errorHandler, 400, 'isNotEnterCategoryId'); // body에서 카테고리 아이디가 입력되지 않음
            // if (!address) next(errorHandler, 400, 'isNotEnterAddress'); // body에서 주소가 입력되지 않음

            const openStore = await this.storesService.open(
                user_id,
                name,
                image_url,
                category_id,
                address,
            );

            return res.status(200).json({ status: 'success', data: openStore });
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
                status: 'success',
                data: enterStore,
            });
        } catch (error) {
            next(error);
        }
    };

    // 매장 수정
    remodelling = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const { name, image_url, category_id, address } = req.body;

            const remodellingStore = await this.storesService.remodelling(
                id,
                name,
                image_url,
                category_id,
                address,
            );

            return res.status(200).json({
                status: 'success',
                data: remodellingStore,
            });
        } catch (error) {
            next(error);
        }
    };

    // 매장 삭제
    close = async (req, res, next) => {
        try {
            const { id } = req.params;

            const closeStore = await this.storesService.close(id);

            return res.status.json({
                status: 'success',
            });
        } catch (error) {
            next(error);
        }
    };
}
