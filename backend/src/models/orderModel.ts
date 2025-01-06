import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  idOrder: string; 
  idUser: string; 
  date_order: Date; 
  total_amount: number; 
  delivery_address: string; 
  status: string; 
}

const orderSchema: Schema = new mongoose.Schema(
  {
    idOrder: { type: String, required: true, unique: true },
    idUser: { type: String, required: true },
    date_order: { type: Date, default: Date.now },
    total_amount: { type: Number, required: true },
    delivery_address: { type: String, required: true },
    status: { type: String, default: "En cours" },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
