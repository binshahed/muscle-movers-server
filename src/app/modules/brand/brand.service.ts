import { BrandModel } from './brand.model';
import { TBrand } from './brand.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createBrand = async (payload: TBrand) => {
  const brand = await BrandModel.create(payload);
  return brand;
};

const getAllBrands = async () => {
  const brand = await BrandModel.find({});
  if (brand.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return brand;
};

const getBrandById = async (brandId: string) => {
  const brand = await BrandModel.findById(brandId);
  if (!brand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return brand;
};

const updateBrandById = async (brandId: string, payload: Partial<TBrand>) => {
  const result = await BrandModel.findByIdAndUpdate(brandId, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return result;
};

const deleteBrandById = async (brandId: string) => {
  const brand = await BrandModel.findById(brandId);
  if (!brand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  const deleteBrand = await BrandModel.findByIdAndDelete(brandId);
  return deleteBrand;
};

export const brandService = {
  createBrand,
  getAllBrands,
  getBrandById,
  deleteBrandById,
  updateBrandById,
};
