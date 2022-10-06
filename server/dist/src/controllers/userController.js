"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const db_1 = require("../db");
const userServices_1 = require("../services/userServices");
class UserController {
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const result = db_1.userModel.postUser(user);
            res.status(200).json(result);
        });
    }
    kakaoLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //1. 프론트에서 인가코드를 query로 받아옴
                const code = req.query.code;
                //2. 카카오 로그인 서비스에 인가코드를 넘겨줌
                const userData = yield userServices_1.userService.kakaoLoginService(code);
                //3. 서비스에서 카카오에 토큰 요청해서 유저정보랑 토큰 받아온걸 넘겨줌
                const { isRegister, email, name, profile_url, access_token } = userData;
                const password = 'kakao';
                //4. 로그인 정보가 없을땐 회원가입 시키자
                if (!isRegister) {
                    yield userServices_1.userService.addUserWithKakao({
                        email,
                        password,
                        name,
                        profile_url,
                    });
                }
                //5. 회원정보가 있으면 로그인시키자
                const userToken = yield userServices_1.userService.loginWithKakao({ email, password });
                //6. 토큰만료시간 설정(3일)
                const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 3);
                //7. 클라에 데이터 내려주기
                res
                    .cookie('accessToken', access_token, { httpOnly: true })
                    .cookie('token', userToken, {
                    expires: expiryDate,
                    httpOnly: true,
                    signed: true,
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
const userController = new UserController();
exports.userController = userController;
