import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from '@aws-sdk/client-s3';
import { Request, Response, NextFunction } from 'express';
import { noticeModel } from '../db';

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
  const notice = await noticeModel.findOneById(id); // 현재 URL에 전달된 id값을 받아서 db찾음
  const deleteUrl = notice.content
    .split('https://')[1]
    .split('com/')[1]
    .split('"')[0];
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
  next();
};

export { upload, deleteImg };
