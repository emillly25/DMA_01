import { model } from 'mongoose';
import { UserSchema } from '../schemas/userSchema';

interface UserData {
  _id?: string;
  name: string;
  email: string;
  profile_url: string;
  password: string;
  role?: string;
}
const User = model<UserData>('users', UserSchema);

export class UserModel {
  async postUser(user: UserData): Promise<UserData | null> {
    return await User.create(user);
  }
  async findByEmail(email: string): Promise<UserData | null> {
    return await User.findOne({ email });
  }
  async create(user: UserData): Promise<UserData> {
    return await User.create(user);
  }
  async findById(userId: string): Promise<UserData | null> {
    return await User.findOne({ _id: userId });
  }
}

const userModel = new UserModel();
export { userModel };
