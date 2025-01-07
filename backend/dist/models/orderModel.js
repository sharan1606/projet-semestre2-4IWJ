"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    idOrder: { type: String, required: true, unique: true },
    idUser: { type: String, required: true },
    date_order: { type: Date, default: Date.now },
    total_amount: { type: Number, required: true },
    delivery_address: { type: String, required: true },
    status: { type: String, default: "En cours" },
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
