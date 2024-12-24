import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  address_l1: string;
  address_l2: string;
  city: string;
  zip_code: string;
  country: string;
  id_user: mongoose.Schema.Types.ObjectId;
}

const AddressSchema: Schema = new Schema({
  address_l1: { type: String, required: true },
  address_l2: { type: String },
  city: { type: String, required: true },
  zip_code: { type: String, required: true },
  country: { type: String, required: true },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IAddress>('Address', AddressSchema);
