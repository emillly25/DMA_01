import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from '@aws-sdk/client-s3';

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

export { upload };
