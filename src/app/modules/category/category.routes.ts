import { Router } from 'express';

import { categoryValidation } from './category.validation';

import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth(),
    validateRequest(categoryValidation.createCategoryValidationSchema),
    categoryController.createCategory,
  )
  .get(categoryController.getAllCategories);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .put(
    auth(),
    validateRequest(categoryValidation.updateCategoryValidationSchema),
    categoryController.updateCategoryById,
  )
  .delete(auth(), categoryController.deleteCategoryById);

export const categoryRouter = router;
