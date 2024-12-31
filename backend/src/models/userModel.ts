import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  idUser: string;
  email: string;
  password: string; 
  lastname: string; 
  firstname: string; 
  address: string; 
  telephone: string;
  isAdmin: boolean; 
  date_inscription: Date; 
  isVerified: boolean; 
}

const userSchema: Schema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
