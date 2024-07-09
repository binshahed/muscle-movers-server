import { z } from 'zod';

// Define the validation schema for creating a user
const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }),
    description: z.string({ message: 'Product Description is required' }),
    price: z.number({ message: 'Product Price is required' }).nonnegative(),
    discountPercentage: z.number().min(0).max(99).default(0).optional(),
    stockQuantity: z
      .number({ message: 'Product Stock Quantity is required' })
      .nonnegative(),
    category: z.string({ message: 'Category Name is required' }),
    brand: z.string({ message: 'Brand Name is required' }),
    photoUrl: z.string({ message: 'Product Photo URL is required' }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product Name is required' }).optional(),
    description: z
      .string({ message: 'Product Description is required' })
      .optional(),
    price: z
      .number({ message: 'Product Price is required' })
      .nonnegative()
      .optional(),
    discountPercentage: z.number().min(0).max(99).default(0).optional(),
    stockQuantity: z
      .number({ message: 'Product Stock Quantity is required' })
      .nonnegative()
      .optional(),
    category: z.string({ message: 'Category Name is required' }).optional(),
    brand: z.string({ message: 'Brand Name is required' }).optional(),
    photoUrl: z.string({ message: 'Product Photo URL is required' }).optional(),
  }),
});

// Export the validation schema to use it in other parts of the application
export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
