import { Schema, model } from 'mongoose';

export const MessageModel = model(
  'messages',
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: { type: String, required: true },
  })
);
