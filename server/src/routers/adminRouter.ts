import { Router } from 'express';
import { pagingController } from '../controllers/pagingController';

const adminRouter: Router = Router();

adminRouter.get('/notice', pagingController);

export { adminRouter };
