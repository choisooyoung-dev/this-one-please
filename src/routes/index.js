import express from 'express';
import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';
import cartRouter from './carts.router.js';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/carts', cartRouter);
router.use('/users', UsersRouter);

export default router;
