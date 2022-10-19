import mongoose, { Schema } from 'mongoose';

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  {
    collection: 'notice',
    timestamps: true,
  },
);

export { NoticeSchema };
