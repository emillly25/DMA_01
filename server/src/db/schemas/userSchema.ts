import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
