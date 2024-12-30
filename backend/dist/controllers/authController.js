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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const crypto_1 = __importDefault(require("crypto"));
// Générer un JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
// Inscription
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname, address, telephone } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "Utilisateur déjà existant" });
            return;
        }
        // Hachage du mot de passe
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Création de l'utilisateur
        const user = new userModel_1.default({
            idUser: crypto_1.default.randomUUID(),
            email,
            password: hashedPassword,
            firstname,
            lastname,
            address,
            telephone,
            isVerified: true, // Par défaut, validé
        });
        const createdUser = yield user.save();
        res.status(201).json({
            _id: createdUser.idUser,
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            email: createdUser.email,
            token: generateToken(createdUser.idUser),
        });
    }
    catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.registerUser = registerUser;
// Connexion
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email ou mot de passe incorrect" });
            return;
        }
        // Vérifier si le compte est validé
        if (!user.isVerified) {
            res.status(403).json({ message: "Votre compte n'est pas encore validé." });
            return;
        }
        // Vérifier le mot de passe
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Email ou mot de passe incorrect" });
            return;
        }
        // Générer le JWT
        const token = generateToken(user.idUser);
        res.status(200).json({
            _id: user.idUser,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.loginUser = loginUser;
