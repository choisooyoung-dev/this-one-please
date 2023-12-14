import { CartsRepository } from './carts.repository.js';

export class CartsService {
    cartsRepository = new CartsRepository();
    createCart = async (menu_id, user_id, store_id, count) => {
        const createdCart = await this.cartsRepository.createCart(
            menu_id,
            user_id,
            store_id,
            count,
        );

        return {
            id: createdCart.id,
            menu_id: createdCart.menu_id,
            user_id: createdCart.user_id,
            store_id: createdCart.store_id,
            count: createdCart.count,
            price: createdCart.price,
        };
    };

    getCarts = async (userId) => {
        const carts = await this.cartsRepository.getCarts(userId);
        return carts;
    };

    updateCart = async (id, updatedData) => {
        const updatedCart = await this.cartsRepository.updateCart(
            id,
            updatedData,
        );
        return updatedCart;
    };

    deleteCart = async (id) => {
        const deletedCart = await this.cartsRepository.deleteCart(id);
        // await prisma.$transaction(async (tx) => {
        //     await tx.cart.delete({
        //         where: { id: +id },
        //     });
        // });
        return deletedCart;
    };
}
