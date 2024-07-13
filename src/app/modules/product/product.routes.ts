import { Router } from 'express';

import { productValidation } from './product.validation';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(productController.getAllProducts)
  .get(productController.getProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .put(
    auth(),
    validateRequest(productValidation.updateProductValidationSchema),
    productController.updateProductById,
  )
  .delete(auth(), productController.deleteProductById);

router
  .route('/create-product')
  .post(
    auth(),
    validateRequest(productValidation.createProductValidationSchema),
    productController.createProduct,
  );

export const productRouter = router;
