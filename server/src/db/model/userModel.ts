import { model } from 'mongoose';
import { UserSchema } from '../schemas/userSchema';

interface UserData {
  name: string;
}
const User = model<UserData>('users', UserSchema);

class UserModel {
  async postUser(user: UserData): Promise<UserData | null> {
    return await User.create(user);
  }
}

const userModel = new UserModel();
export { userModel };
