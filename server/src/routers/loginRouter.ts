import { Router } from 'express';
import { userController } from '../controllers/userController';

const loginRouter: Router = Router();
loginRouter.get('/kakao', userController.kakaoLogin);

export { loginRouter };
