import { Router } from 'express';

import { productValidation } from './product.validation';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(productValidation.createProductValidationSchema),
    productController.createProduct,
  )
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .put(
    auth('admin'),
    validateRequest(productValidation.updateProductValidationSchema),
    productController.updateProductById,
  )
  .delete(auth('admin'), productController.deleteProductById);

export const productRouter = router;
