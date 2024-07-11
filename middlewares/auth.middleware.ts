import { Request, Response, NextFunction } from 'express';

// Hardcoded for now 
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  console.log("this ran: ", userId)
  if (!userId) {
    return res.status(403).json({
      data: null,
      error: { message: 'You must be authorized user' }
    });
  }



  if (userId !== 'admin') {
    return res.status(401).json({
      data: null,
      error: { message: 'User is not authorized' }
    });
  }

  next();
};