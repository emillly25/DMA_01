import { Router } from 'express';
import { userController } from '../controllers/userController';
import { loginRequired } from '../middlewares/loginRequired';
const userRouter: Router = Router();

userRouter.get('/', loginRequired, userController.getUserData);

export { userRouter };
