import { Router } from 'express';
import { StoresController } from '../modules/stores/stores.controller.js';

const storesRouter = Router();
const storesController = new StoresController();

storesRouter.post('', storesController.open);
storesRouter.get('/:id', storesController.enter);
storesRouter.patch('/:id', storesController.remodelling);
storesRouter.delete('/:id', storesController.close);

export default storesRouter;
