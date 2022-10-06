import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { userRouter } from './routers/userRouter';
import { loginRouter } from './routers/loginRouter';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// CORS 에러 방지
app.use(
  cors({
    origin: true,
    credentials: true, // 크로스 도메인 허용
    methods: ['POST', 'PATCH', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
  }),
);

//body-parser사용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookie-parser 사용
app.use(cookieParser('my-secret'));

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.json());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});
app.use('/api', userRouter);
app.use('/auth', loginRouter);

export { app };
