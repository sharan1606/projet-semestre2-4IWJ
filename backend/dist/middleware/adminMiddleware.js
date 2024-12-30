"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: "Accès refusé : Vous devez être administrateur." });
    }
};
exports.isAdmin = isAdmin;
