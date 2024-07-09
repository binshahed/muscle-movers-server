import { Date, ObjectId } from 'mongoose';

type TPayment = 'cash-on' | 'card';

export type TOrder = {
  user: ObjectId;
  products: {
    product: ObjectId;
    quantity: number;
  }[];
  deliveryAddress: string;
  paymentMethod: TPayment;
  orderTime: Date;
};
