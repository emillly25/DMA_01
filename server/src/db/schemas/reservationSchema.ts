import { Schema } from 'mongoose';

const ReservationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    question: {
      type: String,
    },
  },
  {
    collection: 'reservation',
    timestamps: true,
  },
);

export { ReservationSchema };
