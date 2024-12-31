import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  idProduct: string; 
  name: string; 
  description: string; 
  price: number; 
  stock: number; 
  brand: string;
  category: string;
  image: string;
  date_add: Date; 
}

const productSchema: Schema = new mongoose.Schema(
  {
    idProduct: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    date_add: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
