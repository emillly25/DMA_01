import { Router } from 'express';
import { noticeController } from '../controllers/pagingController';

const adminRouter: Router = Router();

adminRouter.get('/notice', noticeController.pagingNotices);
adminRouter.get('/notice/:id', noticeController.findOneNotice);
adminRouter.get('/notices', noticeController.findAllNotice);

export { adminRouter };
