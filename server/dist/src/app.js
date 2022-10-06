"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const userRouter_1 = require("./routers/userRouter");
const loginRouter_1 = require("./routers/loginRouter");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 5000;
// CORS 에러 방지
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['POST', 'PATCH', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
}));
//body-parser사용
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//cookie-parser 사용
app.use((0, cookie_parser_1.default)('my-secret'));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.json());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
    res.send('welcome!');
});
app.use('/api', userRouter_1.userRouter);
app.use('/auth', loginRouter_1.loginRouter);
app.listen(PORT, () => {
    console.log(`정상적으로 서버가 연결되었습니다. http://localhost:${PORT}`);
});
