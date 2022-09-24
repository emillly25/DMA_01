import { model } from 'mongoose';
import { UserSchema } from '../schemas/userSchema';

interface UserData {
  name: string;
}
const User = model<UserData>('users', UserSchema);

class UserModel {
  async postUser(name: UserData): Promise<UserData | null> {
    return await User.create({ name });
  }
}

const userModel = new UserModel();
export { userModel };
