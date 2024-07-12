import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { IUser } from '../models/user.model';

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      data: null,
      error: {
        message: 'Authorization token is missing',
      },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = await authService.validateToken(token);
    (req as Request & { user: IUser }).user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      data: null,
      error: {
        message: 'Invalid or expired token',
      },
    });
  }
}

function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as Request & { user?: IUser }).user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      data: null,
      error: {
        message: 'Access denied. Admin privileges required.',
      },
    });
  }
}

export default {
  authenticate,
  authorizeAdmin
};