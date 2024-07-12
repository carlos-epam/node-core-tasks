import { IUser } from './models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      _startTime?: number;
    }
  }
}

export {};