import express from 'express';
import cartRouter from './carts.router.js';

const router = express.Router();

router.use('/carts', cartRouter);

export default router;
