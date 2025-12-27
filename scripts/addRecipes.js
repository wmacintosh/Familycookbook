// Run this script once to add all recipes: node scripts/addRecipes.js
const fs = require('fs');
const path = require('path');

// Helper to create IDs
const id = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15);
};

// All your recipes will be added here
const newRecipes = `
// Paste your recipe code here from the original request
// Then run: node scripts/addRecipes.js
`;

console.log('Recipe import script ready. Edit this file with your recipes and run it.');
console.log('Instructions:');
console.log('1. Paste the INITIAL_RECIPES array content into the newRecipes variable above');
console.log('2. Run: node scripts/addRecipes.js');
