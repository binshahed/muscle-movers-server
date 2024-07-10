import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Category Name is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model<TCategory>('Category', categorySchema);
