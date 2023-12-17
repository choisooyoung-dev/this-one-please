import { CartsService } from './carts.service.js';

export class CartsController {
    cartsService = new CartsService();

    createCart = async (req, res, next) => {
        try {
            const user_id = res.locals.user.id;
            const { menu_id, store_id, count } = req.body;
            const originCart = await this.cartsService.getCartMenu(user_id, menu_id);

            if (!originCart) {
                const createdCart = await this.cartsService.createCart(user_id, menu_id, store_id, count);
                return res.status(201).json({
                    success: true,
                    data: createdCart,
                    message: '장바구니 만들기 성공',
                });
            } else {
                const updatedCart = await this.cartsService.updateCart(originCart.id, count + originCart.count);
                return res.status(201).json({
                    success: true,
                    data: updatedCart,
                    message: '업데이트가 되었습니다',
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다',
            });
        }
    };

    getCarts = async (req, res, next) => {
        try {
            const user_id = res.locals.user.id;
            const carts = await this.cartsService.getCarts(user_id);
            return res.status(201).json({
                success: true,
                data: carts,
                message: '장바구니 조회 성공',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다',
            });
        }
    };

    updateCart = async (req, res, next) => {
        try {
            // const user_id = res.locals.user.id;
            const id = Number(req.params.id);
            const { count } = req.body;

            const cart = await this.cartsService.getCart(id);
            if (cart.user_id !== res.locals.user.id) {
                return res.status(400).json({ success: false, message: '권한이 없습니다' });
            }
            const updatedCart = await this.cartsService.updateCart(id, count);
            return res.status(201).json({
                success: true,
                data: updatedCart,
                message: '업데이트가 되었습니다',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다',
            });
        }
    };

    deleteCart = async (req, res, next) => {
        try {
            const user_id = res.locals.user.id;
            const { id } = req.params;
            const cart = await this.cartsService.getCart(id);
            if (cart.user_id !== user_id) {
                return res.status(400).json({ success: false, message: '권한이 없습니다' });
            }
            if (!cart) {
                return res.status(404).json({
                    success: false,
                    message: '삭제 할 주문 목록이 없습니다',
                });
            }
            console.log('controller -> service');
            await this.cartsService.deleteCart(id);
            return res.status(201).json({ success: true, message: '삭제 성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다',
            });
        }
    };
}
