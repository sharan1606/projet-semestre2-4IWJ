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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Middleware pour protéger les routes
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extraire le token
            token = req.headers.authorization.split(" ")[1];
            // Décoder le token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Rechercher l'utilisateur correspondant au token
            const user = yield userModel_1.default.findById(decoded.id).select("-password");
            if (!user) {
                res.status(401).json({ message: "Utilisateur non trouvé." });
                return;
            }
            req.user = user; // Attribuer l'utilisateur à `req.user`
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Token invalide ou expiré." });
        }
    }
    else {
        res.status(401).json({ message: "Aucun token fourni." });
    }
});
exports.protect = protect;
