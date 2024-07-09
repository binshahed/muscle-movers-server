import { ProductModel } from './product.model';
import { TProduct } from './product.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { CategoryModel } from '../category/category.model';
import { BrandModel } from '../brand/brand.model';

const createProduct = async (payload: TProduct) => {
  const category = CategoryModel.findById(payload.category);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const brand = await BrandModel.findById(payload.brand);
  if (!brand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  const product = (await ProductModel.create(payload)).populate([
    { path: 'category', select: '_id name' },
    { path: 'brand', select: '_id name' },
  ]);
  return product;
};

const getAllProducts = async () => {
  const products = await ProductModel.find({}).populate([
    { path: 'category', select: '_id name' },
    { path: 'brand', select: '_id name' },
  ]);
  if (products.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return products;
};

const getProductById = async (productId: string) => {
  const product = await ProductModel.findById(productId).populate([
    { path: 'category', select: '_id name' },
    { path: 'brand', select: '_id name' },
  ]);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return product;
};

const updateProductById = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  if (payload?.category) {
    const category = await CategoryModel.findById(payload.category);
    if (!category) {
      throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
    }
  }

  if (payload?.brand) {
    const brand = await BrandModel.findById(payload.brand);
    if (!brand) {
      throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
    }
  }

  const result = await ProductModel.findByIdAndUpdate(productId, payload, {
    new: true,
  }).populate([
    { path: 'category', select: '_id name' },
    { path: 'brand', select: '_id name' },
  ]);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return result;
};

const deleteProductById = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const deleteProduct = await ProductModel.findByIdAndDelete(productId);
  return deleteProduct;
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
