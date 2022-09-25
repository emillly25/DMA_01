import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
