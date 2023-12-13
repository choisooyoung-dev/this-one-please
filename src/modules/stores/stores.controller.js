import { StoresService } from './stores.service';

export class StoresController {
    storesService = new StoresService();

    // 매장 등록
    open = async (req, res, next) => {
        try {
            const { user_id } = res.local.user;
            const { name, image, category_id } = req.body;
        } catch (error) {
            next(error);
        }
    };

    // 매장 조회
    enter = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };

    // 매장 수정
    interior = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };

    // 매장 삭제
    close = async (req, res, next) => {
        try {
        } catch (error) {
            next(error);
        }
    };
}
