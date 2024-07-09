import { Schema, model } from 'mongoose';
import { TBrand } from './brand.interface';

const brandSchema = new Schema<TBrand>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Brand Name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BrandModel = model<TBrand>('Brand', brandSchema);
