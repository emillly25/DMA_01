import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from '@aws-sdk/client-s3';
import { Request, Response, NextFunction } from 'express';
import { noticeModel } from '../db';
import { url } from 'inspector';

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  region: process.env.REGION,
});

const bucket: string = process.env.BUCKET || 'none';

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    key: function (req, file: Express.MulterS3.File, cb) {
      cb(
        null,
        'images/origin/' +
          Date.now() +
          '.' +
          file.originalname.split('.').pop(),
      );
    },
    acl: 'public-read-write',
  }),
});

const deleteImg = async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;
  // 현재 URL에 전달된 id값을 받아서 db찾음
  const notice = await noticeModel.findOneById(id);
  const isImg = notice.content.search('img');
  console.log('isImg', isImg);
  //이미지 파일이 없으면 통과 없으면 삭제
  if (isImg === -1) {
    next();
  } else {
    const content = notice.content;
    const splitArr = content.split('.com/');
    const imgArr = splitArr.filter((el: string) => {
      return el.search('images/origin') !== -1;
    });
    const urlArr = imgArr.map((el: string) => {
      return el.split('"')[0];
    });
    console.log(urlArr);
    urlArr.forEach((el: string) => {
      const params = {
        Bucket: bucket,
        Key: el,
      };
      s3.deleteObject(params, function (error: any, data: any) {
        console.log('data', data);
        if (error) {
          console.log(error, error.stack);
        } else {
          console.log('aws 에서 이미지가 삭제되었습니다.');
        }
      });
    });
    next();
  }
};

const updateImg = async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;
  const notice = await noticeModel.findOneById(id); // 현재 URL에 전달된 id값을 받아서 db찾음
  const isImg = notice.content.search('img');
  console.log('isImg', isImg);
  //이미지 파일이 없으면 통과
  //이미지 파일이 있으면 기존 url과 비교해서
  //같으면 통과, 다르면 삭제하고 업데이트
  if (isImg !== -1) {
    const deleteUrl = notice.content
      .split('https://')[1]
      .split('com/')[1]
      .split('"')[0];
    if (deleteUrl) {
      const params = {
        Bucket: bucket,
        Key: deleteUrl,
      };

      s3.deleteObject(params, function (error: any, data: any) {
        console.log('data', data);
        if (error) {
          console.log(error, error.stack);
          // res.redirect(routes.home)
        } else {
          console.log('aws 에서 이미지가 삭제되었습니다.');
        }
      });
    }
  }

  // next();
};

export { upload, deleteImg, updateImg };
