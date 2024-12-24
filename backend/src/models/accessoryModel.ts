import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessory extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  color: string;
  material: string;
  compatibility: string;
  id_category: mongoose.Schema.Types.ObjectId;
}

const AccessorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  color: { type: String },
  material: { type: String },
  compatibility: { type: String },
  id_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

export default mongoose.model<IAccessory>('Accessory', AccessorySchema);
