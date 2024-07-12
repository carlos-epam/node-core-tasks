import * as productRepository from '../repositories/product.repository';
import { IProduct } from '../models/product.model';

export const getAllProducts = async (): Promise<IProduct[]> => {
  return productRepository.findAll();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return productRepository.findById(id);
};

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
  return productRepository.create(productData);
};

export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  return productRepository.update(id, productData);
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return productRepository.remove(id);
};