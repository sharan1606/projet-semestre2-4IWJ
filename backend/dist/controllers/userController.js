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
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, is_admin } = req.body;
    // Vérifie si l'utilisateur existe déjà
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'Utilisateur déjà existant' });
        return;
    }
    // Crée un nouvel utilisateur
    try {
        const user = new userModel_1.default({
            firstname,
            lastname,
            email,
            password,
            is_admin: is_admin || false, // Défaut à `false` si non spécifié
        });
        const createdUser = yield user.save();
        res.status(201).json({
            _id: createdUser._id,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            email: createdUser.email,
            is_admin: createdUser.is_admin,
            token: generateToken(createdUser._id.toHexString()),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                is_admin: user.is_admin,
                token: generateToken(user._id.toString()),
            });
        }
        else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
});
exports.loginUser = loginUser;
