import { Schema, model } from 'mongoose';

export const ProductModel = model(
  'products',
  new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: Number, required: true },
    status: { type: Boolean, required: false },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
  })
);
