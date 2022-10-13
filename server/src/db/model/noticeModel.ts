import { model } from 'mongoose';
import { NoticeSchema } from '../schemas/noticeSchema';

interface NoticeData {
  noticeId: string;
  title?: string;
  content?: string;
  createdAt?: string;
}

const Notice = model<NoticeData>('notice', NoticeSchema);

export class NoticeModel {
  async findAllNotice(hideNotice: number, maxNotice: number): Promise<any> {
    // 나중에 sort 정렬 추가해야함(생성순)
    return await Notice.find().skip(hideNotice).limit(maxNotice);
  }
  async countAllNotice(): Promise<number> {
    const notices = await Notice.find();
    return notices.length;
  }
}

const noticeModel = new NoticeModel();
export { noticeModel };
