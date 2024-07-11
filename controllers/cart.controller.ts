import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';
import { validateUpdateCart } from '../validators/cart.validator';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id') as string;
    const cart = await cartService.getOrCreateCart(userId);
    res.json({ data: { cart, total: cartService.calculateTotal(cart) }, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const { error } = validateUpdateCart(req.body);
    if (error) {
      return res.status(400).json({ data: null, error: { message: error.details[0].message } });
    }

    const userId = req.header('x-user-id') as string;
    const updatedCart = await cartService.updateCart(userId, req.body);
    res.json({ data: { cart: updatedCart, total: cartService.calculateTotal(updatedCart) }, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const emptyCart = async (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id') as string;
    await cartService.emptyCart(userId);
    res.json({ data: { success: true }, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = req.header('x-user-id') as string;
    const order = await cartService.checkout(userId);
    res.json({ data: { order }, error: null });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ data: null, error: { message: error.message } });
    } else {
      res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
    }
  }
};