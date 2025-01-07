"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const crypto_1 = __importDefault(require("crypto"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel_1.default.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Commande non trouvée." });
            return;
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getOrderById = getOrderById;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, total_amount, delivery_address, status } = req.body;
    try {
        const newOrder = new orderModel_1.default({
            idOrder: crypto_1.default.randomUUID(),
            idUser,
            total_amount,
            delivery_address,
            status: status || "En cours",
        });
        const createdOrder = yield newOrder.save();
        res.status(201).json(createdOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel_1.default.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Commande non trouvée." });
            return;
        }
        order.total_amount = req.body.total_amount || order.total_amount;
        order.delivery_address = req.body.delivery_address || order.delivery_address;
        order.status = req.body.status || order.status;
        const updatedOrder = yield order.save();
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel_1.default.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Commande non trouvée." });
            return;
        }
        yield order.deleteOne();
        res.status(200).json({ message: "Commande supprimée avec succès." });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.deleteOrder = deleteOrder;
