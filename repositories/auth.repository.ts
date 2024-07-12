import User, { IUser } from '../models/user.model';

export async function createUser(email: string, password: string, role: 'admin' | 'user'): Promise<IUser> {
  const user = new User({ email, password, role });
  return await user.save();
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return await User.findOne({ email });
}

export async function findUserById(id: string): Promise<IUser | null> {
  return await User.findById(id);
}