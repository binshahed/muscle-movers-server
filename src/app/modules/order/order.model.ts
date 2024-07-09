import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash-on', 'card'],
    default: 'cash-on',
    required: true,
  },
  orderTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  //   totalPrice: {
  //     type: Number,
  //     required: true,
  //   },
});

export const OrderModel = model<TOrder>('Order', orderSchema);
