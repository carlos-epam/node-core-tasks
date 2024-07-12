import mongoose, { Document, Schema } from 'mongoose';
import { ICartItem } from './cart.model';

export interface IOrder extends Document {
  userId: string;
  items: ICartItem[];
  payment: {
    type: string;
    address: string;
    creditCard: string;
  };
  delivery: {
    type: string;
    address: string;
  };
  comments: string;
  status: string;
  total: number;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    count: { type: Number, required: true, min: 1 }
  }],
  payment: {
    type: { type: String, required: true },
    address: { type: String, required: true },
    creditCard: { type: String, required: true }
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true }
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true, min: 0 }
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);