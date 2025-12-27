// Run this in the browser console to clear duplicate recipes from localStorage

console.log("Clearing recipe storage...");
localStorage.removeItem('shirleys_kitchen_recipes');
localStorage.removeItem('shirleys_kitchen_favorites');
console.log("Storage cleared! Please refresh the page.");
alert("Recipe storage cleared! The page will now reload with fresh recipes.");
window.location.reload();
