import express from 'express';
import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';
import cartRouter from './carts.router.js';
import storesRouter from './stores.router.js';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/carts', cartRouter);
router.use('/users', UsersRouter);
router.use('/stores', storesRouter);

export default router;
