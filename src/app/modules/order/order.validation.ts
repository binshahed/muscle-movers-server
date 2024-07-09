import { z } from 'zod';

// Define the validation schema for creating a user
const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string({ message: 'User ID is required' }),
    products: z
      .array(z.object({ product: z.string(), quantity: z.number().positive() }))
      .min(1, { message: 'At least one product is required' }),
    deliveryAddress: z.string({ message: 'Delivery address is required' }),
    paymentMethod: z.enum(['cash-on', 'card']).default('cash-on'),
    // totalPrice: z.number({ message: 'Total Price is required' }).positive(),
  }),
});

// Export the validation schema to use it in other parts of the application
export const orderValidation = {
  createOrderValidationSchema,
};
