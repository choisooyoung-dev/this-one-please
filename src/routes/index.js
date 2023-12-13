import express from 'express';
import viewRouter from './views.router.js'


const router = express.Router();

router.get('/', viewRouter);
router.get('/api', []);


export default router;