import { model, Schema } from 'mongoose';

const daySchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

export const Day = model('day', daySchema);
