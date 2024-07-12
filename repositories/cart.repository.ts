import { Cart, ICart, ICartItem } from '../models/cart.model';

export const findByUserId = async (userId: string): Promise<ICart | null> => {
  return Cart.findOne({ userId }).populate('items.product').exec();
};

export const create = async (userId: string): Promise<ICart> => {
  const cart = new Cart({ userId, items: [] });
  return cart.save();
};

export const update = async (userId: string, items: ICartItem[]): Promise<ICart | null> => {
  return Cart.findOneAndUpdate({ userId }, { items }, { new: true }).populate('items.product').exec();
};

export const addItem = async (userId: string, item: ICartItem): Promise<ICart | null> => {
  return Cart.findOneAndUpdate(
    { userId },
    { $push: { items: item } },
    { new: true, upsert: true }
  ).populate('items.product').exec();
};

export const removeItem = async (userId: string, productId: string): Promise<ICart | null> => {
  return Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate('items.product').exec();
};

export const emptyCart = async (userId: string): Promise<ICart | null> => {
  return Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true }).populate('items.product').exec();
};