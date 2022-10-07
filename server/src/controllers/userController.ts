import { Request, Response, NextFunction } from 'express';
import { userModel } from '../db';
import { userService } from '../services/userServices';

interface UserIdRequest extends Request {
  currentUserId?: string;
}

class UserController {
  async kakaoLogin(req: Request, res: Response, next: NextFunction) {
    try {
      //1. 프론트에서 인가코드를 query로 받아옴
      const code: string = req.query.code as string;

      //2. 카카오 로그인 서비스에 인가코드를 넘겨줌
      const userData = await userService.kakaoLoginService(code);

      //3. 서비스에서 카카오에 토큰 요청해서 유저정보랑 토큰 받아온걸 넘겨줌
      const { isRegister, email, name, profile_url, access_token } = userData;
      const password = 'kakao';
      //4. 로그인 정보가 없을땐 회원가입 시키자
      if (!isRegister) {
        await userService.addUserWithKakao({
          email,
          password,
          name,
          profile_url,
        });
      }
      //5. 회원정보가 있으면 로그인시키자 (jwt토큰)
      const userToken = await userService.loginWithKakao({ email, password });

      //6. 토큰만료시간 설정(3일)
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 3);

      //7. 클라에 데이터 내려주기
      res
        .cookie('accessToken', access_token, { httpOnly: true })
        .cookie('token', userToken, {
          expires: expiryDate,
          httpOnly: true,
          signed: true,
        })
        .json(userToken);
    } catch (error) {
      console.error(error);
    }
  }
  async getUserData(req: UserIdRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.currentUserId as string;
      const userData = await userService.getUserData(userId);
      if (userData) {
        const { _id, name, email, profile_url, role } = userData;
        const exceptPassword = { _id, name, email, profile_url, role };
        res.status(200).json(exceptPassword);
      }
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export { userController };
