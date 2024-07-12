import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './product.model';

export interface ICartItem {
  product: IProduct | string;
  count: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  count: { type: Number, required: true, min: 1 }
});

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema]
});

export const Cart = mongoose.model<ICart>('Cart', CartSchema);