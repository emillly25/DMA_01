import { Router } from 'express';
import { userController } from '../controllers/userController';
const userRouter: Router = Router();
userRouter.post('/users', userController.add);

export { userRouter };
