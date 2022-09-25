import { Request, Response, NextFunction } from 'express';
import { userModel } from '../db';

class UserController {
  async add(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const result = userModel.postUser(user);
    res.status(200).json(result);
  }
}

const userController = new UserController();
export { userController };
