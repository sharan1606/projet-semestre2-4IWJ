import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:idUser", getCart);
router.put("/update", updateCartItem);
router.delete("/remove", removeFromCart);
router.delete("/clear/:idUser", clearCart);

export default router;
