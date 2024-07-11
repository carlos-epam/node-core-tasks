import { Cart } from '../models/cart.model';

let carts: Cart[] = [];

export const findByUserId = async (userId: string): Promise<Cart | undefined> => {
  return carts.find(cart => cart.id === userId);
};

export const create = async (userId: string): Promise<Cart> => {
  const newCart: Cart = { id: userId, items: [] };
  carts.push(newCart);
  return newCart;
};

export const update = async (cart: Cart): Promise<Cart> => {
  const index = carts.findIndex(c => c.id === cart.id);
  if (index !== -1) {
    carts[index] = cart;
  } else {
    carts.push(cart);
  }
  return cart;
};