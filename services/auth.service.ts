import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import * as authRepository from '../repositories/auth.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function registerUser(email: string, password: string, role: 'admin' | 'user'): Promise<IUser> {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  return await authRepository.createUser(email, password, role);
}

export async function loginUser(email: string, password: string): Promise<string> {
  const user = await authRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }
  return generateToken(user);
}

function generateToken(user: IUser): string {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
}

export async function validateToken(token: string): Promise<IUser> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    const user = await authRepository.findUserById(decoded.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}