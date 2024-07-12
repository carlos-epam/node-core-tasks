import { Order, IOrder } from '../models/order.model';

export const create = async (orderData: Partial<IOrder>): Promise<IOrder> => {
  const order = new Order(orderData);
  return order.save();
};

export const findByUserId = async (userId: string): Promise<IOrder[]> => {
  return Order.find({ userId }).populate('items.product').exec();
};

export const findById = async (id: string): Promise<IOrder | null> => {
  return Order.findById(id).populate('items.product').exec();
};

export const updateStatus = async (id: string, status: string): Promise<IOrder | null> => {
  return Order.findByIdAndUpdate(id, { status }, { new: true }).exec();
};