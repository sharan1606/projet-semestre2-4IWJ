import { Schema, model, Document } from "mongoose";

interface IPayment extends Document {
  idUser: string;
  amount: number;
  method: string;
  date: Date;
  status: string;
}

const PaymentSchema = new Schema<IPayment>({
  idUser: { type: String, required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ["pending", "completed", "failed"] }
});

const Payment = model<IPayment>("Payment", PaymentSchema);

export default Payment;
