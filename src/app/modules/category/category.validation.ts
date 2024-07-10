import { z } from 'zod';

// Define the validation schema for creating a category
const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }),
    image: z.string({ message: 'Product Image is required' }),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }).optional(),
    image: z.string({ message: 'Product Image is required' }).optional(),
  }),
});

// Export the validation schema to use it in other parts of the application
export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
