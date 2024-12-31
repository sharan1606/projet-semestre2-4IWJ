import { Request, Response } from "express";
import Product, { IProduct } from "../models/productModel";
import crypto from "crypto";


export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findOne({ idProduct: req.params.id });
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé." });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, stock, brand, category, image } = req.body;

  try {
    const newProduct: IProduct = new Product({
      idProduct: crypto.randomUUID(),
      name,
      description,
      price,
      stock,
      brand,
      category,
      image,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findOne({ idProduct: req.params.id });
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé." });
      return;
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findOne({ idProduct: req.params.id });
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé." });
      return;
    }

    await Product.deleteOne({ idProduct: req.params.id });
    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
