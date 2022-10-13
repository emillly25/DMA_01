import { Request, Response, NextFunction } from 'express';
import { noticeModel } from '../db';
import paging from '../utilsFn/paging';

export const pagingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    const notices = await noticeModel.findAllNotice(hideNotice, maxNotice);
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
};
