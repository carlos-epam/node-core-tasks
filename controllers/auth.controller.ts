import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, role } = req.body;
    const user = await authService.registerUser(email, password, role);
    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({
      data: null,
      error: {
        message: errorMessage,
      },
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({
      data: {
        token,
      },
      error: null,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(404).json({
      data: null,
      error: {
        message: errorMessage,
      },
    });
  }
}