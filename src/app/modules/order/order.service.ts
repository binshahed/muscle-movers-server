/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { UserModel } from '../auth/auth.model';
import { TOrder } from './order.interface';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';

import mongoose from 'mongoose';
import { OrderModel } from './order.model';
import { discountCalculator } from '../../../utils/discountCalculator';

const createOrder = async (payload: TOrder) => {
  const { user: userId, products, deliveryAddress, paymentMethod } = payload;

  // find service
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  if (products.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Product Found!');
  }

  // start session
  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    let total = 0;

    for (const pd of products) {
      // check product availability
      const product = await ProductModel.findById(pd.product);
      if (!product) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Invalid product or quantity!',
        );
      }

      // check product availability
      if (product.stockQuantity < pd.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Not enough quantity of product!',
        );
      }
      // calculate discount
      const productPrice =
        discountCalculator(product.price, product.discountPercentage) *
        pd.quantity;

      total = total + productPrice;

      await ProductModel.findByIdAndUpdate(
        pd.product,
        {
          stockQuantity: product.stockQuantity - pd.quantity,
        },
        { session, new: true },
      );
    }

    const orderData = {
      user: userId,
      products,
      deliveryAddress,
      paymentMethod,
      totalPrice: total,
    };

    const order = OrderModel.create(orderData);

    // end session
    await session.commitTransaction();
    await session.endSession();

    return order;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllOrder = async () => {
  const orders = await OrderModel.find({});

  if (orders.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  return orders;
};

const getMyOrder = async (userId: string) => {
  const user = UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const orders = await OrderModel.find({ user: userId });

  if (orders.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return orders;
};

export const orderService = {
  createOrder,
  getAllOrder,
  getMyOrder,
};
