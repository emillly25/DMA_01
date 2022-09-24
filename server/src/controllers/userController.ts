import { Request, Response, NextFunction } from 'express';
import { userModel } from '../db';

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    const user = { name: 'emily' };
    userModel.postUser(user);
  }
}

const userController = new UserController();
export { userController };
