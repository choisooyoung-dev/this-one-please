import { Router } from 'express';
import { StoresController } from '../modules/stores/stores.controller.js';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter.post('/open', storesController.open);
storesRouter.get('/enter', storesController.enter);
storesRouter.patch('/interior', storesController.interior);
storesRouter.post('/close', storesController.close);

export default storesRouter;
