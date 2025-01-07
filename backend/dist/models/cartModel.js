"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartItemSchema = new mongoose_1.default.Schema({
    idProduct: { type: String, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
});
const cartSchema = new mongoose_1.default.Schema({
    idUser: { type: String, ref: "User", required: true },
    items: [cartItemSchema],
    total: { type: Number, default: 0 },
}, { timestamps: true });
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
