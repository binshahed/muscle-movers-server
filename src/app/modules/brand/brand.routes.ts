import { Router } from 'express';

import { brandValidation } from './brand.validation';

import validateRequest from '../../middlewares/validateRequest';
import { brandController } from './brand.controller';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth(),
    validateRequest(brandValidation.createBrandValidationSchema),
    brandController.createBrand,
  )
  .get(brandController.getAllBrands);

router
  .route('/:id')
  .get(brandController.getBrandById)
  .put(
    auth(),
    validateRequest(brandValidation.updateBrandValidationSchema),
    brandController.updateBrandById,
  )
  .delete(auth(), brandController.deleteBrandById);

export const brandRouter = router;
