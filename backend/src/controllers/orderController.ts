import { Request, Response } from "express";
import crypto from "crypto";
import Order, { IOrder } from "../models/orderModel";


export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Commande non trouvée." });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { idUser, total_amount, delivery_address, status } = req.body;

  try {
    const newOrder: IOrder = new Order({
      idOrder: crypto.randomUUID(),
      idUser,
      total_amount,
      delivery_address,
      status: status || "En cours",
    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Commande non trouvée." });
      return;
    }

   
    order.total_amount = req.body.total_amount || order.total_amount;
    order.delivery_address = req.body.delivery_address || order.delivery_address;
    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Commande non trouvée." });
      return;
    }

    await order.deleteOne();
    res.status(200).json({ message: "Commande supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
