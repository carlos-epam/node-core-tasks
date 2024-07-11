import * as productRepository from '../repositories/prorduct.repository';
import { Product } from '../models/product.model';

export const getAllProducts = async (): Promise<Product[]> => {
  return productRepository.findAll();
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return productRepository.findById(id);
};