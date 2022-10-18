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
    imgURL: {
      type: [],
    },
  },
  {
    collection: 'notice',
    timestamps: true,
  },
);

export { NoticeSchema };
