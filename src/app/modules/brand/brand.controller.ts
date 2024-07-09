import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';

import sendResponse from '../../../utils/sendResponse';
import { brandService } from './brand.service';

const createBrand = catchAsync(async (req, res) => {
  const result = await brandService.createBrand(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

const getAllBrands = catchAsync(async (req, res) => {
  const result = await brandService.getAllBrands();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All brands retrieved successfully',
    data: result,
  });
});

const getBrandById = catchAsync(async (req, res) => {
  const result = await brandService.getBrandById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand retrieved successfully',
    data: result,
  });
});

const updateBrandById = catchAsync(async (req, res) => {
  const result = await brandService.updateBrandById(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand updated successfully',
    data: result,
  });
});

const deleteBrandById = catchAsync(async (req, res) => {
  await brandService.deleteBrandById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand deleted successfully',
    data: null,
  });
});

export const brandController = {
  createBrand,
  getAllBrands,
  getBrandById,
  deleteBrandById,
  updateBrandById,
};
