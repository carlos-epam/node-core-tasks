import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ data: products, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    if (product) {
      res.json({ data: product, error: null });
    } else {
      res.status(404).json({ data: null, error: { message: 'No product with such id' } });
    }
  } catch (error) {
    res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};