import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrder(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successful',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrder();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All orders retrieved successfully',
    data: result,
  });
});

const getMyOrder = catchAsync(async (req, res) => {
  const result = await orderService.getMyOrder(req.user._id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My orders retrieved successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getMyOrder,
};
