import { ObjectId } from 'mongoose';

export type TProduct = {
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  stockQuantity: number;
  category: ObjectId;
  brand: ObjectId;
  photoUrl: string;
};
