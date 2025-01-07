import { Request, Response } from "express";
import Payment from "../models/PaymentModel";

// CREATE - Créer un paiement
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  const { idUser, amount, method, status } = req.body;

  try {
    // Crée un nouveau paiement
    const newPayment = new Payment({
      idUser,
      amount,
      method,
      status,
    });

    // Sauvegarde dans la base de données
    await newPayment.save();

    res.status(201).json({ message: "Paiement créé avec succès", payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la création du paiement", error });
  }
};

// READ - Récupérer l'historique des paiements d'un utilisateur
export const getPaymentHistory = async (req: Request, res: Response): Promise<void> => {
  const { idUser } = req.params;

  try {
    // Recherche des paiements associés à l'utilisateur
    const paymentHistory = await Payment.find({ idUser });

    if (paymentHistory.length === 0) {
      res.status(404).json({ message: "Aucun historique de paiement trouvé pour cet utilisateur." });
      return;
    }

    res.status(200).json({ paymentHistory });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération de l'historique", error });
  }
};

// READ - Récupérer un paiement spécifique par son ID
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  const { paymentId } = req.params;

  try {
    // Recherche du paiement par son ID
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      res.status(404).json({ message: "Paiement non trouvé." });
      return;
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération du paiement", error });
  }
};

// UPDATE - Mettre à jour un paiement
export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  const { paymentId } = req.params;
  const { amount, method, status } = req.body;

  try {
    // Met à jour le paiement en fonction de son ID
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { amount, method, status },
      { new: true }  // Récupère le paiement mis à jour
    );

    if (!updatedPayment) {
      res.status(404).json({ message: "Paiement non trouvé pour mise à jour." });
      return;
    }

    res.status(200).json({ message: "Paiement mis à jour avec succès", payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du paiement", error });
  }
};

// DELETE - Supprimer un paiement
export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  const { paymentId } = req.params;

  try {
    // Supprime le paiement à partir de son ID
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);

    if (!deletedPayment) {
      res.status(404).json({ message: "Paiement non trouvé pour suppression." });
      return;
    }

    res.status(200).json({ message: "Paiement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la suppression du paiement", error });
  }
};
