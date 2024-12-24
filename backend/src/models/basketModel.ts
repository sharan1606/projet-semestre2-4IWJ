import mongoose, { Schema, Document } from 'mongoose';

export interface IBasket extends Document {
  id_user: mongoose.Schema.Types.ObjectId;
}

const BasketSchema: Schema = new Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IBasket>('Basket', BasketSchema);
