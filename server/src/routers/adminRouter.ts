import { Router } from 'express';
import { noticeController } from '../controllers/noticeController';
import { upload, deleteImg, updateImg } from '../middlewares/multer';
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
adminRouter.delete('/notice/:id', deleteImg, noticeController.deleteNotice);
adminRouter.patch(
  '/notice/:id',
  updateImg,
  upload.single('src'),
  noticeController.updateNotice,
);

export { adminRouter };
