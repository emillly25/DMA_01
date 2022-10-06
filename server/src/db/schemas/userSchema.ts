import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    profile_url: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
