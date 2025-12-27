# Adding Your Recipe Collection

Due to the large number of recipes (200+), here's how to add them:

## Quick Method

1. **Open** `additionalRecipes.ts`
2. **Replace the placeholder** with your recipe array
3. **Update** `data.ts` to import them:

```typescript
import { additionalRecipes } from './additionalRecipes';

export const INITIAL_RECIPES: Recipe[] = [
  // existing recipes...
  ...additionalRecipes  // Add this line before the closing bracket
];
```

## Alternative: Direct Edit

Simply paste your recipes directly into `data.ts` at the end of the `INITIAL_RECIPES` array (before the closing `]`).

**Your recipes are ready to paste from the original message you sent me.**
