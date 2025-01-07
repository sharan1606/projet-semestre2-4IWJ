"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.post("/add", cartController_1.addToCart);
router.get("/:idUser", cartController_1.getCart);
router.put("/update", cartController_1.updateCartItem);
router.delete("/remove", cartController_1.removeFromCart);
router.delete("/clear/:idUser", cartController_1.clearCart);
exports.default = router;
