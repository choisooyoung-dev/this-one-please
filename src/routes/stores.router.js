import { Router } from 'express';
import { StoresController } from '../modules/stores/stores.controller.js';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter.post('', storesController.open);
storesRouter.get('/:user_id', storesController.enter);
storesRouter.patch('/:user_id', storesController.remodelling);
storesRouter.post('/:user_id', storesController.close);

export default storesRouter;
