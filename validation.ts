import { z } from 'zod';
import { Category } from './types';
import { LIMITS } from './constants';

/**
 * Zod schema for runtime validation of Recipe objects
 */
export const RecipeSchema = z.object({
    id: z.string().uuid('Invalid recipe ID format'),
    title: z.string()
        .min(1, 'Recipe title is required')
        .max(LIMITS.MAX_RECIPE_TITLE_LENGTH, `Title must be ${LIMITS.MAX_RECIPE_TITLE_LENGTH} characters or less`),
    category: z.nativeEnum(Category),
    ingredients: z.array(z.string().min(1, 'Ingredient cannot be empty'))
        .min(1, 'At least one ingredient is required')
        .max(LIMITS.MAX_INGREDIENTS, `Cannot exceed ${LIMITS.MAX_INGREDIENTS} ingredients`),
    instructions: z.array(z.string().min(1, 'Instruction cannot be empty'))
        .min(1, 'At least one instruction is required')
        .max(LIMITS.MAX_INSTRUCTIONS, `Cannot exceed ${LIMITS.MAX_INSTRUCTIONS} instructions`),
    yields: z.string().optional(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    temp: z.string().optional(),
    description: z.string()
        .max(LIMITS.MAX_DESCRIPTION_LENGTH, `Description must be ${LIMITS.MAX_DESCRIPTION_LENGTH} characters or less`)
        .optional(),
    addedBy: z.string().min(1, 'Recipe author is required'),
    userColor: z.string().optional(),
    timestamp: z.number().int().positive('Invalid timestamp'),
    imageUrl: z.union([
        z.string().url('Invalid image URL').max(LIMITS.MAX_IMAGE_URL_LENGTH),
        z.literal('')
    ]).optional(),
    rating: z.number().min(0).max(5, 'Rating must be between 0 and 5').optional()
});

/**
 * Type inferred from the Zod schema
 */
export type ValidatedRecipe = z.infer<typeof RecipeSchema>;

/**
 * Validates a recipe object
 * @param data - Data to validate
 * @returns Validated recipe object
 * @throws ZodError if validation fails
 */
export const validateRecipe = (data: unknown): ValidatedRecipe => {
    return RecipeSchema.parse(data);
};

/**
 * Safely validates a recipe, returning null if invalid
 * @param data - Data to validate
 * @returns Validated recipe or null
 */
export const safeValidateRecipe = (data: unknown): ValidatedRecipe | null => {
    const result = RecipeSchema.safeParse(data);
    return result.success ? result.data : null;
};
