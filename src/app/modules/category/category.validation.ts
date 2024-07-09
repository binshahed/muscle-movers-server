import { z } from 'zod';

// Define the validation schema for creating a category
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }),
  }),
});

// Export the validation schema to use it in other parts of the application
export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
