import { z } from 'zod';

// Define the validation schema for creating a user
const createBrandValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }),
  }),
});

const updateBrandValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }),
  }),
});

// Export the validation schema to use it in other parts of the application
export const brandValidation = {
  createBrandValidationSchema,
  updateBrandValidationSchema,
};
