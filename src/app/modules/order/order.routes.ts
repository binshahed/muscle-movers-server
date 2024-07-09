import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { orderController } from './order.controller';

const router = Router();

router
  .route('/')
  .post(
    // auth('user'),
    validateRequest(orderValidation.createOrderValidationSchema),
    orderController.createOrder,
  )
  .get();

export const orderRouter = router;
