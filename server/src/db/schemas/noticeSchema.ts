import mongoose, { Schema } from 'mongoose';

const NoticeSchema = new Schema(
  {
    noticeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: String,
    },
  },
  {
    collection: 'notice',
    timestamps: true,
  },
);

export { NoticeSchema };
