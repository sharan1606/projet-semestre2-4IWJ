import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  payment_date: Date;
  amount: number;
  average_payment: string;
  payment_status: string;
  id_order: mongoose.Schema.Types.ObjectId;
}

const PaymentSchema: Schema = new Schema({
  payment_date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  average_payment: { type: String, required: true },
  payment_status: { type: String, default: 'Payé' },
  id_order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);
