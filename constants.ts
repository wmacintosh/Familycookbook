// Application Constants

export const STORAGE_KEYS = {
    RECIPES: 'shirleys_kitchen_recipes',
    FAVORITES: 'shirleys_kitchen_favorites',
    USER_PREFERENCES: 'shirleys_kitchen_preferences'
} as const;

export const LIMITS = {
    MAX_RECIPE_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_INGREDIENTS: 50,
    MAX_INSTRUCTIONS: 50,
    MAX_IMAGE_URL_LENGTH: 2048
} as const;

export const DEBOUNCE_DELAYS = {
    SEARCH: 300,
    AUTO_SAVE: 1000
} as const;

export const UI_CONSTANTS = {
    TOAST_DURATION: 3000,
    ANIMATION_DURATION: 300,
    MODAL_TRANSITION_DURATION: 200
} as const;
