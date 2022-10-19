import { Router } from 'express';
import { noticeController } from '../controllers/noticeController';
import { upload } from '../middlewares/multer';
const adminRouter: Router = Router();

adminRouter.get('/notice', noticeController.pagingNotices);
adminRouter.get('/notice/:id', noticeController.findOneNotice);
adminRouter.get('/notices', noticeController.findAllNotice);
adminRouter.post('/notice', noticeController.create);
adminRouter.post(
  '/notice/img',
  upload.single('src'),
  noticeController.uploadImg,
);

export { adminRouter };
