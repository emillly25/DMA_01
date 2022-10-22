import { model } from 'mongoose';
import { NoticeSchema } from '../schemas/noticeSchema';

interface NoticeData {
  title: string;
  content: string;
  createdAt?: string;
}

const Notice = model<NoticeData>('notice', NoticeSchema);

export class NoticeModel {
  async findAllNoticeByPage(
    hideNotice: number,
    maxNotice: number,
  ): Promise<any> {
    // 나중에 sort 정렬 추가해야함(생성순)
    return await Notice.find().skip(hideNotice).limit(maxNotice);
  }
  async countAllNotice(): Promise<number> {
    const notices = await Notice.find();
    return notices.length;
  }
  async findOneById(id: any): Promise<any> {
    return await Notice.findOne({ _id: id });
  }
  async findAllNotice(): Promise<any> {
    return await Notice.find();
  }
  async createNotice(notice: NoticeData): Promise<any> {
    return await Notice.create(notice);
  }
  async deleteNotice(id: string): Promise<any> {
    return await Notice.deleteOne({ _id: id });
  }
  async updateNotice(id: string, notice: NoticeData): Promise<any> {
    return await Notice.updateOne({ _id: id }, { ...notice });
  }
}

const noticeModel = new NoticeModel();
export { noticeModel };
