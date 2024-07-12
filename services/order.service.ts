import * as orderRepository from '../repositories/order.repository';
import { IOrder } from '../models/order.model';

export const createOrder = async (orderData: Partial<IOrder>): Promise<IOrder> => {
  return orderRepository.create(orderData);
};

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  return orderRepository.findByUserId(userId);
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return orderRepository.findById(id);
};

export const updateOrderStatus = async (id: string, status: string): Promise<IOrder | null> => {
  return orderRepository.updateStatus(id, status);
};