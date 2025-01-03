import { Request, Response } from "express";
import Cart from "../models/cartModel";
import Product from "../models/productModel";

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    const { idUser, idProduct, quantity } = req.body;
  
    try {
      
      const product = await Product.findOne({ idProduct });
      if (!product) {
        res.status(404).json({ message: "Produit non trouvé." });
        return;
      }
  
      let cart = await Cart.findOne({ idUser });
      if (!cart) {
        cart = new Cart({ idUser, items: [], total: 0 });
      }
  
     
      const existingItem = cart.items.find((item) => item.idProduct.toString() === idProduct);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ idProduct, quantity });
      }
  
      
      cart.total = cart.items.reduce((sum, item) => sum + item.quantity * product.price, 0);
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
  

  

  export const getCart = async (req: Request, res: Response): Promise<void> => {
    const { idUser } = req.params;
  
    try {
      const cart = await Cart.findOne({ idUser });
      if (!cart) {
        res.status(404).json({ message: "Panier non trouvé." });
        return;
      }
  
      
      const populatedItems = await Promise.all(
        cart.items.map(async (item) => {
          const product = await Product.findOne({ idProduct: item.idProduct });
          return {
            idProduct: item.idProduct,
            quantity: item.quantity,
            name: product?.name || "Produit inconnu",
            price: product?.price || 0,
            image: product?.image || "",
          };
        })
      );
  
      res.status(200).json({
        idUser: cart.idUser,
        items: populatedItems,
        total: cart.total,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  const { idUser, idProduct, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ idUser });
    if (!cart) {
      res.status(404).json({ message: "Panier non trouvé." });
      return;
    }

    const item = cart.items.find((item) => item.idProduct.toString() === idProduct);
    if (!item) {
      res.status(404).json({ message: "Produit non trouvé dans le panier." });
      return;
    }

    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.idProduct.toString() !== idProduct);
    } else {
      item.quantity = quantity;
    }

    let total = 0;
    for (const item of cart.items) {
      const product = await Product.findOne({ idProduct });
      total += item.quantity * (product?.price || 0);
    }
    cart.total = total;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  const { idUser, idProduct } = req.body;

  try {
    const cart = await Cart.findOne({ idUser });
    if (!cart) {
      res.status(404).json({ message: "Panier non trouvé." });
      return;
    }

    cart.items = cart.items.filter((item) => item.idProduct.toString() !== idProduct);

    let total = 0;
    for (const item of cart.items) {
      const product = await Product.findOne({ idProduct });
      total += item.quantity * (product?.price || 0);
    }
    cart.total = total;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const clearCart = async (req: Request, res: Response): Promise<void> => {
  const { idUser } = req.params;

  try {
    const cart = await Cart.findOne({ idUser });
    if (!cart) {
      res.status(404).json({ message: "Panier non trouvé." });
      return;
    }

    cart.items = [];
    cart.total = 0;

    await cart.save();
    res.status(200).json({ message: "Panier vidé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
