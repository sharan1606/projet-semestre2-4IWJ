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
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.getCart = exports.addToCart = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idProduct, quantity } = req.body;
    try {
        const product = yield productModel_1.default.findOne({ idProduct });
        if (!product) {
            res.status(404).json({ message: "Produit non trouvé." });
            return;
        }
        let cart = yield cartModel_1.default.findOne({ idUser });
        if (!cart) {
            cart = new cartModel_1.default({ idUser, items: [], total: 0 });
        }
        const existingItem = cart.items.find((item) => item.idProduct.toString() === idProduct);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ idProduct, quantity });
        }
        cart.total = cart.items.reduce((sum, item) => sum + item.quantity * product.price, 0);
        yield cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    try {
        const cart = yield cartModel_1.default.findOne({ idUser });
        if (!cart) {
            res.status(404).json({ message: "Panier non trouvé." });
            return;
        }
        const populatedItems = yield Promise.all(cart.items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield productModel_1.default.findOne({ idProduct: item.idProduct });
            return {
                idProduct: item.idProduct,
                quantity: item.quantity,
                name: (product === null || product === void 0 ? void 0 : product.name) || "Produit inconnu",
                price: (product === null || product === void 0 ? void 0 : product.price) || 0,
                image: (product === null || product === void 0 ? void 0 : product.image) || "",
            };
        })));
        res.status(200).json({
            idUser: cart.idUser,
            items: populatedItems,
            total: cart.total,
        });
    }
    catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getCart = getCart;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idProduct, quantity } = req.body;
    try {
        const cart = yield cartModel_1.default.findOne({ idUser });
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
        }
        else {
            item.quantity = quantity;
        }
        let total = 0;
        for (const item of cart.items) {
            const product = yield productModel_1.default.findOne({ idProduct });
            total += item.quantity * ((product === null || product === void 0 ? void 0 : product.price) || 0);
        }
        cart.total = total;
        yield cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.updateCartItem = updateCartItem;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idProduct } = req.body;
    try {
        const cart = yield cartModel_1.default.findOne({ idUser });
        if (!cart) {
            res.status(404).json({ message: "Panier non trouvé." });
            return;
        }
        cart.items = cart.items.filter((item) => item.idProduct.toString() !== idProduct);
        let total = 0;
        for (const item of cart.items) {
            const product = yield productModel_1.default.findOne({ idProduct });
            total += item.quantity * ((product === null || product === void 0 ? void 0 : product.price) || 0);
        }
        cart.total = total;
        yield cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.removeFromCart = removeFromCart;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    try {
        const cart = yield cartModel_1.default.findOne({ idUser });
        if (!cart) {
            res.status(404).json({ message: "Panier non trouvé." });
            return;
        }
        cart.items = [];
        cart.total = 0;
        yield cart.save();
        res.status(200).json({ message: "Panier vidé avec succès." });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.clearCart = clearCart;
