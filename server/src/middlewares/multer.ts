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

function contractURL(content: string) {
  const splitArr = content.split('.com/');
  const imgArr = splitArr.filter((el: string) => {
    return el.search('images/origin') !== -1;
  });
  const urlArr = imgArr.map((el: string) => {
    return el.split('"')[0];
  });
  return urlArr;
}

const updateImg = async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;
  //새로 업데이트할 이미지
  const reqContent = req.body.content;
  const reqArr = contractURL(reqContent);
  const isImgInReq = reqContent.search('img');
  console.log('new', reqArr);

  // 기존 이미지
  const notice = await noticeModel.findOneById(id);
  const dbContent = notice.content;
  const dbArr = contractURL(dbContent);
  const isImgInDb = dbContent.search('img');
  console.log('old', dbArr);

  //요청 이미지랑 비교해서 삭제될 이미지 필터링
  const combineArr = reqArr.concat(dbArr);
  const filtered = combineArr.filter((img) => !reqArr.includes(img));
  console.log('delete', filtered);

  if (
    (isImgInDb === -1 && isImgInReq === -1) ||
    (isImgInDb === -1 && isImgInReq !== -1)
  ) {
    //1. 기존 X -> 새로 X => 통과
    //2. 기존 X -> 새로 O => 통과
    next();
  } else if (isImgInDb !== -1 && isImgInReq === -1) {
    //3. 기존 O -> 새로 X => 기존꺼 삭제
    dbArr.forEach((el: string) => {
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
  } else if (isImgInDb !== -1 && isImgInReq !== -1) {
    //4. 기존 O -> 새로 O => 업데이트
    filtered.forEach((el: string) => {
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

export { upload, deleteImg, updateImg };
