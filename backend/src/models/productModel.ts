import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  idProduct: string; // ID unique du produit
  name: string; // Nom du produit
  description: string; // Description
  price: number; // Prix
  stock: number; // Quantité en stock
  brand: string; // Marque
  category: string; // Catégorie
  image: string; // URL de l'image
  date_add: Date; // Date d'ajout
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
  { timestamps: true } // Ajoute `createdAt` et `updatedAt`
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
