import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  idProduct: string; 
  quantity: number;
}

export interface ICart extends Document {
  idUser: string; 
  items: ICartItem[];
  total: number;
}

const cartItemSchema: Schema = new mongoose.Schema({
  idProduct: { type: String, ref: "Product", required: true }, 
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema: Schema = new mongoose.Schema(
  {
    idUser: { type: String, ref: "User", required: true }, 
    items: [cartItemSchema],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
