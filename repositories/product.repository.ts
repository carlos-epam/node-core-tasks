import { Product, IProduct } from '../models/product.model';

export const findAll = async (): Promise<IProduct[]> => {
  return Product.find().exec();
};

export const findById = async (id: string): Promise<IProduct | null> => {
  return Product.findById(id).exec();
};

export const create = async (productData: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(productData);
  return product.save();
};

export const update = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  return Product.findByIdAndUpdate(id, productData, { new: true }).exec();
};

export const remove = async (id: string): Promise<IProduct | null> => {
  return Product.findByIdAndDelete(id).exec();
};