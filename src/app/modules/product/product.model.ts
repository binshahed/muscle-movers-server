import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

// Define the schema for the User model with validation messages
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Product Name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required'],
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 99,
      default: 0,
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Product Stock Quantity is required'],
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product Category is required'],
      ref: 'Category',
    },
    brand: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product Brand is required'],
      ref: 'Brand',
    },
    photoUrl: {
      type: String,
      required: [true, 'Product Photo URL is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = model<TProduct>('Product', productSchema);
