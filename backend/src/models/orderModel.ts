import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  order_date: Date;
  total_amount: number;
  status: string;
  id_user: mongoose.Schema.Types.ObjectId;
}

const OrderSchema: Schema = new Schema({
  order_date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  status: { type: String, default: 'En attente' },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
