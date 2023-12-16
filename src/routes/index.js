import express from 'express';
import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';
import cartRouter from './carts.router.js';
import categoriesRouter from './category.router.js';
import storesRouter from './stores.router.js';
import menusRouter from './menus.router.js';
import reviewsRouter from './reviews.router.js';
import ordersRouter from './orders.router.js';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/carts', cartRouter);
router.use('/users', UsersRouter);
router.use('/category', categoriesRouter);
router.use('/stores', storesRouter);
router.use('/menus', menusRouter);
router.use('/review', reviewsRouter);
router.use('/orders', ordersRouter);

export default router;
