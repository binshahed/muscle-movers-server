import { CategoryModel } from './category.model';
import { TCategory } from './category.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCategory = async (payload: TCategory) => {
  const category = await CategoryModel.create(payload);
  return category;
};

const getAllCategories = async () => {
  const category = await CategoryModel.find({});
  if (category.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return category;
};

const getCategoryById = async (categoryId: string) => {
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return category;
};

const updateCategoryById = async (
  categoryId: string,
  payload: Partial<TCategory>,
) => {
  const result = await CategoryModel.findByIdAndUpdate(categoryId, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return result;
};

const deleteCategoryById = async (categoryId: string) => {
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const deleteCategory = await CategoryModel.findByIdAndDelete(categoryId);
  return deleteCategory;
};

export const categoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
