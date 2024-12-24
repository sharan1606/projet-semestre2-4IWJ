import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  solde: number;
  is_admin: boolean;
  _id: mongoose.Types.ObjectId;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema = new mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  solde: { type: Number, default: 0 },
  is_admin: { type: Boolean, default: false },
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password as string);
};


userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
