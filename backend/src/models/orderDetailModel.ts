import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDetail extends Document {
  quantity: number;
  unit_price: number;
  id_accessory: mongoose.Schema.Types.ObjectId;
  id_order: mongoose.Schema.Types.ObjectId;
}

const OrderDetailSchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  id_accessory: { type: mongoose.Schema.Types.ObjectId, ref: 'Accessory' },
  id_order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
});

export default mongoose.model<IOrderDetail>('OrderDetail', OrderDetailSchema);
