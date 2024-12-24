import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  quantity: number;
  id_accessory: mongoose.Schema.Types.ObjectId;
  id_basket: mongoose.Schema.Types.ObjectId;
}

const ArticleSchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  id_accessory: { type: mongoose.Schema.Types.ObjectId, ref: 'Accessory' },
  id_basket: { type: mongoose.Schema.Types.ObjectId, ref: 'Basket' }
});

export default mongoose.model<IArticle>('Article', ArticleSchema);
