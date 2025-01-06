"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    idUser: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
    date_inscription: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: true }, // Par défaut, compte validé
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
