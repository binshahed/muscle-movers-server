import { Router } from 'express';

import { categoryValidation } from './category.validation';

import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(categoryValidation.createCategoryValidationSchema),
    categoryController.createCategory,
  )
  .get(categoryController.getAllCategories);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .put(
    validateRequest(categoryValidation.updateCategoryValidationSchema),
    categoryController.updateCategoryById,
  )
  .delete(categoryController.deleteCategoryById);

export const categoryRouter = router;
