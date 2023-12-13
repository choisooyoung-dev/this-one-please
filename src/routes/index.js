import express from 'express';
import viewRouter from './views.router.js';
import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';

const router = express.Router();

router.use('/', viewRouter);
router.use('/api', [AuthRouter, UsersRouter]);

export default router;
