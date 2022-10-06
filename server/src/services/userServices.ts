import { UserModel, userModel } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

interface UserData {
  _id?: string;
  name: string;
  email: string;
  profile_url: string;
  password: string;
  role?: string;
}
interface LoginInfo {
  email: string;
  password: string;
}

class UserService {
  constructor(private userModel: UserModel) {
    this.userModel = userModel;
  }

  async kakaoLoginService(code: string) {
    //1. 컨트롤러에서 넘겨준 인가코드로 토큰 요청할 데이터를 준비
    const data = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_REST_API_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
    };
    //2. 인가코드 정보를 카카오측으로 보내 토큰발급을 요청
    const tokenResponse = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data,
    });

    //3. 받아온 토큰정보로 사용자의 정보를 요청해야함
    const ACCESS_TOKEN = tokenResponse.data.access_token;
    const userResponse = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    //4. 받아온 사용자정보에서 필요한 정보(토큰,유저)를 빼자!
    const authData = {
      ...tokenResponse.data,
      ...userResponse.data,
    };

    //5. 내가 필요한 데이터만 정리 (access_token, 이메일,프사,이름)
    const access_token = authData.access_token;
    const {
      profile: { nickname, profile_image_url },
      email,
    } = authData.kakao_account;

    //6. 이 유저가 회원가입 되어있는지 우리 DB에 확인하자!
    const isRegister = await userModel.findByEmail(email);
    const userData = {
      isRegister,
      email,
      name: nickname,
      profile_url: profile_image_url,
      access_token,
    };
    return userData;
  }

  // 카카오 회원가입
  async addUserWithKakao({
    email,
    password,
    name,
    profile_url,
  }: UserData): Promise<UserData> {
    //1. 이메일 존재여부 체크
    if (!email) {
      throw new Error('존재하지 않는 이메일 입니다.');
    }

    //2. 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    //3. 회원가입할 유저정보 만들기
    const newUserInfo = {
      email,
      password: hashedPassword,
      name,
      profile_url,
      role: 'student',
    };

    //4. db에 저장
    return await this.userModel.create(newUserInfo);
  }
  async loginWithKakao({ email, password }: LoginInfo) {
    //1. 해당 이메일이 DB에 있는지 체크
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error('존재하지 않는 이메일 입니다.');
    }

    //2. 비밀번호 확인하기
    const correctPasswordHash = user.password; //DB에 있는 패스워드
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );
    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 틀렸습니다.');
    }

    //3. 로그인성공시 jwt토큰 발급(loginRequired용)
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    return jwt.sign({ userId: user._id, role: user.role }, secretKey);
  }
}

const userService = new UserService(userModel);

export { userService };
