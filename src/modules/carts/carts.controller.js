import { CartsService } from './carts.service.js';

export class CartsController {
    cartsService = new CartsService();

    createCart = async (req, res, next) => {
        try {
            const user_id = res.locals.user.id;
            const { menu_id, store_id, count } = req.body;
            const createdCart = await this.cartsService.createCart(
                user_id,
                menu_id,
                store_id,
                count,
            );
            console.log('controller: ', createdCart);

            res.status(201).json({ data: createdCart, message: '성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치못한에러입니다' });
        }
    };

    getCarts = async (req, res, next) => {
        try {
            const user_id = res.locals.user.id;
            // const cart = await this.cartsService.getCart(id);
            // if (cart.user_id !== res.locals.user.id) {
            //     res.status(400).json({ message: '권한이 없습니다' });
            // }
            const carts = await this.cartsService.getCarts(user_id);
            console.log(carts);
            res.status(201).json({ data: carts, message: '성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치못한에러입니다' });
        }
    };

    updateCart = async (req, res, next) => {
        try {
            // const user_id = res.locals.user.id;
            const id = Number(req.params.id);
            const { count } = req.body;
            const cart = await this.cartsService.getCart(id);
            if (cart.user_id !== res.locals.user.id) {
                res.status(400).json({ message: '권한이 없습니다' });
            }
            const updatedCart = await this.cartsService.updateCart(id, count);
            res.status(201).json({
                data: updatedCart,
                message: '업데이트가 되었습니다',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치못한에러입니다' });
        }
    };

    deleteCart = async (req, res, next) => {
        try {
            const user_id = res.locals.user.id;
            const cart = await this.cartsService.getCart(id);
            if (cart.user_id !== res.locals.user.id) {
                res.status(400).json({ message: '권한이 없습니다' });
            }
            const { id } = req.params;
            if (!cart) {
                res.status(404).json({ message: '삭제할 주문목록이 없습니다' });
            }
            await this.cartsService.deleteCart(id);
            res.status(201).json({ message: '삭제 성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치 못한 에러입니다' });
        }
    };
}
