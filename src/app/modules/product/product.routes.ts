import { Router } from 'express';

import { productValidation } from './product.validation';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(productValidation.createProductValidationSchema),
    productController.createProduct,
  )
  .get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .put(
    validateRequest(productValidation.updateProductValidationSchema),
    productController.updateProductById,
  )
  .delete(productController.deleteProductById);

export const productRouter = router;
