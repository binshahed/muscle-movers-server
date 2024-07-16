/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductModel } from './product.model';
import { TProduct } from './product.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { CategoryModel } from '../category/category.model';
import { BrandModel } from '../brand/brand.model';
import { Request } from 'express';
import { SortOrder } from 'mongoose';

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

const getAllProducts = async (req: Request) => {
  const order = req?.query?.order === 'desc' ? -1 : 1;
  const sortBy = req?.query?.sortBy
    ? (req?.query?.sortBy as string | number)
    : '_id';
  // const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  // const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;

  // filter
  const filters = req?.body;
  const args: any = {};

  for (const key in filters) {
    if (filters[key].length > 0) {
      if (key === 'price') {
        args['price'] = {
          $gte: filters['price'][0],
          $lte: filters['price'][1],
        };
      }
      if (key === 'category') {
        args['category'] = { $in: filters['category'] };
      }
      if (key === 'brand') {
        args['brand'] = { $in: filters['brand'] };
      }
      if (key === 'search') {
        args['name'] = { $regex: filters['search'], $options: 'i' };
      }
    }
  }

  const totalProducts = await ProductModel.find().countDocuments();

  const products = await ProductModel.find(args)
    .sort({ [sortBy]: order as SortOrder })
    .populate([
      { path: 'category', select: '_id name' },
      { path: 'brand', select: '_id name' },
    ]);

  // if (products.length === 0) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  // }

  return { products, totalProducts };
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
const getProducts = () => {
  return ProductModel.find()
    .sort({ createdAt: -1 })
    .populate([
      { path: 'category', select: '_id name' },
      { path: 'brand', select: '_id name' },
    ]);
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getProducts,
};
