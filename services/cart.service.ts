import * as cartRepository from '../repositories/cart.repository';
import * as productRepository from '../repositories/product.repository';
import { ICart, ICartItem } from '../models/cart.model';
import { IOrder } from '../models/order.model';
import { createOrder } from './order.service';

export const getOrCreateCart = async (userId: string): Promise<ICart> => {
  let cart = await cartRepository.findByUserId(userId);
  if (!cart) {
    cart = await cartRepository.create(userId);
  }
  return cart;
};

export const updateCart = async (userId: string, items: ICartItem[]): Promise<ICart | null> => {
  const cart = await getOrCreateCart(userId);
  return cartRepository.update(userId, items);
};

export const addItemToCart = async (userId: string, productId: string, count: number): Promise<ICart | null> => {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return cartRepository.addItem(userId, { product: productId, count });
};

export const removeItemFromCart = async (userId: string, productId: string): Promise<ICart | null> => {
  return cartRepository.removeItem(userId, productId);
};

export const calculateTotal = (cart: ICart): number => {
  return cart.items.reduce((total, item) => {
    const price = typeof item.product === 'string'
      ? 0 
      : item.product.price;
    return total + (price * item.count);
  }, 0);
};

export const emptyCart = async (userId: string): Promise<ICart | null> => {
  return cartRepository.emptyCart(userId);
};

export const checkout = async (userId: string): Promise<IOrder> => {
  const cart = await getOrCreateCart(userId);

  if (cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const order: Partial<IOrder> = {
    userId,
    items: cart.items,
    payment: {
      type: 'paypal',
      address: 'Default Address',
      creditCard: '****-****-****-1234'
    },
    delivery: {
      type: 'post',
      address: 'Default Address'
    },
    comments: '',
    status: 'created',
    total: calculateTotal(cart)
  };

  const createdOrder = await createOrder(order);
  await emptyCart(userId);

  return createdOrder;
};