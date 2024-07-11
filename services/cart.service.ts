import * as cartRepository from '../repositories/cart.repository';
import * as productRepository from '../repositories/prorduct.repository';
import { Cart, CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';
import { v4 as uuidv4 } from 'uuid';

export const getOrCreateCart = async (userId: string): Promise<Cart> => {
  let cart = await cartRepository.findByUserId(userId);
  if (!cart) {
    cart = await cartRepository.create(userId);
  }
  return cart;
};

export const updateCart = async (userId: string, updateData: { productId: string; count: number }): Promise<Cart> => {
  const cart = await getOrCreateCart(userId);
  const product = await productRepository.findById(updateData.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const existingItemIndex = cart.items.findIndex(item => item.product.id === updateData.productId);

  if (existingItemIndex !== -1) {
    if (updateData.count === 0) {
      cart.items.splice(existingItemIndex, 1);
    } else {
      cart.items[existingItemIndex].count = updateData.count;
    }
  } else if (updateData.count > 0) {
    cart.items.push({ product, count: updateData.count });
  }

  return cartRepository.update(cart);
};

export const calculateTotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => total + item.product.price * item.count, 0);
};

export const emptyCart = async (userId: string): Promise<void> => {
  await cartRepository.update({ id: userId, items: [] });
};

export const checkout = async (userId: string): Promise<Order> => {
  const cart = await getOrCreateCart(userId);

  if (cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const order: Order = {
    id: uuidv4(),
    userId,
    cartId: cart.id,
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

  
  await emptyCart(userId);

  return order;
};