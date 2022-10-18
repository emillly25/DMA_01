import { Request, Response, NextFunction } from 'express';
import { noticeModel } from '../db';
import paging from '../utilsFn/paging';

class NoticeController {
  async findOneNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log('아이디', id);
      const result = await noticeModel.findOneById(id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  }
  async findAllNotice(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await noticeModel.findAllNotice();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  }
  async pagingNotices(req: Request, res: Response, next: NextFunction) {
    const { page } = req.query;

    try {
      const totalNotice = await noticeModel.countAllNotice();
      if (!totalNotice) {
        throw new Error();
      }
      const {
        startPage,
        endPage,
        hideNotice,
        maxNotice,
        totalPage,
        currentPage,
      } = paging(Number(page), totalNotice);

      //요청된 페이지에 해당되는 게시글들 db에서 찾기
      const notices = await noticeModel.findAllNoticeByPage(
        hideNotice,
        maxNotice,
      );
      const pagingData = {
        notices,
        currentPage,
        startPage,
        endPage,
        maxNotice,
        totalPage,
      };
      res.status(200).json(pagingData);
    } catch (error) {
      console.error(error);
    }
  }
}

const noticeController = new NoticeController();
export { noticeController };
