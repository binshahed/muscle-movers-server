import { Router } from 'express';

import { brandValidation } from './brand.validation';

import validateRequest from '../../middlewares/validateRequest';
import { brandController } from './brand.controller';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(brandValidation.createBrandValidationSchema),
    brandController.createBrand,
  )
  .get(brandController.getAllBrands);

router
  .route('/:id')
  .get(brandController.getBrandById)
  .put(
    validateRequest(brandValidation.updateBrandValidationSchema),
    brandController.updateBrandById,
  )
  .delete(brandController.deleteBrandById);

export const brandRouter = router;
