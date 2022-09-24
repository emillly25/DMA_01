import { Router } from 'express';
import { userController } from '../controllers/userController';
const userRouter: Router = Router();
userRouter.post('/login', userController.login);

export { userRouter };
