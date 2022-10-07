import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserIdRequest extends Request {
  currentUserId?: string;
}

function loginRequired(req: UserIdRequest, res: Response, next: NextFunction) {
  //1. 프론트에서 api요청할때 withCredential을 true로 설정하면 알아서 쿠키가 넘어옴
  const userToken = req.headers.authorization;

  if (!userToken || userToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    res.status(401).json({
      status: 401,
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });
    return;
  }

  //2. 토큰이 있으면, 그 토큰이 정상적인 토큰인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;
    const userId = jwtDecoded.userId;
    //3. loginRequired에서 유저정보 확인할때 사용할 userId를 설정
    req.currentUserId = userId;

    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });

    return;
  }
}

export { loginRequired };
