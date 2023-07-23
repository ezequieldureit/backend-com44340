import { Schema, model } from 'mongoose';

export const CartModel = model(
  'carts',
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  })
);
