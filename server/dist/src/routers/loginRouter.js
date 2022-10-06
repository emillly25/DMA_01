"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const loginRouter = (0, express_1.Router)();
exports.loginRouter = loginRouter;
loginRouter.get('/kakao', userController_1.userController.kakaoLogin);
