import { CartsRepository } from './carts.repository.js';

export class CartsService {
    cartsRepository = new CartsRepository();
    createCart = async (user_id, menu_id, store_id, count) => {
        const createdCart = await this.cartsRepository.createCart(user_id, menu_id, store_id, count);

        return {
            id: createdCart.id,
            user_id: createdCart.user_id,
            menu_id: createdCart.menu_id,
            store_id: createdCart.store_id,
            count: createdCart.count,
        };
    };

    getCarts = async (user_id) => {
        const carts = await this.cartsRepository.getCarts(user_id);
        console.log('service: ', carts);

        return carts;
    };

    updateCart = async (id, count) => {
        const updatedCart = await this.cartsRepository.updateCart(id, count);
        return updatedCart;
    };

    getCart = async (id) => {
        const carts = await this.cartsRepository.getCart(id);
        return carts;
    };

    deleteCart = async (id) => {
        const deletedCart = await this.cartsRepository.deleteCart(id);

        return deletedCart;
    };
}
