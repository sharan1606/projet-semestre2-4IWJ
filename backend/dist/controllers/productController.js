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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const crypto_1 = __importDefault(require("crypto"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findOne({ idProduct: req.params.id });
        if (!product) {
            res.status(404).json({ message: "Produit non trouvé." });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, brand, category, image } = req.body;
    try {
        const newProduct = new productModel_1.default({
            idProduct: crypto_1.default.randomUUID(),
            name,
            description,
            price,
            stock,
            brand,
            category,
            image,
        });
        const createdProduct = yield newProduct.save();
        res.status(201).json(createdProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findOne({ idProduct: req.params.id });
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
        const updatedProduct = yield product.save();
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findOne({ idProduct: req.params.id });
        if (!product) {
            res.status(404).json({ message: "Produit non trouvé." });
            return;
        }
        yield productModel_1.default.deleteOne({ idProduct: req.params.id });
        res.status(200).json({ message: "Produit supprimé avec succès." });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.deleteProduct = deleteProduct;
