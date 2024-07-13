import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import { productService } from './product.service';
import sendResponse from '../../../utils/sendResponse';

const createProduct = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productService.getAllProducts(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products retrieved successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await productService.getProductById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProductById = catchAsync(async (req, res) => {
  const result = await productService.updateProductById(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProductById = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: null,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await productService.getProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products retrieved successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProducts,
};
