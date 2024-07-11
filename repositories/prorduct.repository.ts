import { Product } from '../models/product.model';
import { v4 as uuidv4 } from 'uuid';

let products: Product[] = [
  {
    id: uuidv4(),
    title: 'Sample Book',
    description: 'A very interesting book',
    price: 19.99
  },
  {
    id: uuidv4(),
    title: 'Sample Pen',
    description: 'A high-quality pen',
    price: 4.99
  }
];

export const findAll = async (): Promise<Product[]> => {
  return products;
};

export const findById = async (id: string): Promise<Product | undefined> => {
  return products.find(product => product.id === id);
};