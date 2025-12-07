
import React from 'react';
import { Heart, Clock, UtensilsCrossed } from 'lucide-react';
import { Recipe } from '../types';
import { getAvatarColor } from '../data';

interface RecipeListItemProps {
  recipe: Recipe;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe, onClick, isFavorite, onToggleFavorite }) => {
  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 flex items-center gap-4 sm:gap-6 cursor-pointer hover:bg-sky-50 transition-all border border-stone-100 hover:border-sky-200 shadow-sm hover:shadow-md group animate-fade-in relative overflow-hidden"
    >
       {/* Avatar / User Indicator */}
       <div className="flex-shrink-0 z-10" title={`Added by ${recipe.addedBy}`}>
          <div 
             className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-offset-1 ring-stone-100"
             style={{ backgroundColor: badgeColor }}
           >
             {recipe.addedBy.charAt(0).toUpperCase()}
           </div>
       </div>

       {/* Content */}
       <div className="flex-1 min-w-0 flex flex-col justify-center z-10">
          <div className="flex items-baseline gap-3 mb-1">
             <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 truncate group-hover:text-sky-700 transition-colors">{recipe.title}</h3>
             <span className="text-[10px] font-bold tracking-widest text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-100 flex-shrink-0 hidden sm:inline-block">{recipe.category}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="truncate max-w-[200px]">{recipe.description || `${recipe.ingredients.length} ingredients`}</span>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="hidden sm:inline text-stone-400 italic">by {recipe.addedBy}</span>
          </div>
       </div>

       {/* Meta (Time/Ingredients) - Hidden on small screens */}
       <div className="flex items-center gap-4 xl:gap-6 text-stone-400 text-xs font-medium flex-shrink-0 hidden md:flex z-10">
          {recipe.prepTime && <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Clock size={14}/> {recipe.prepTime}</span>}
          {recipe.cookTime && <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><Clock size={14}/> {recipe.cookTime}</span>}
          <span className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded"><UtensilsCrossed size={14}/> {recipe.ingredients.length}</span>
       </div>

       {/* Favorite Button */}
       <button 
        onClick={onToggleFavorite}
        className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 z-20 border ${
          isFavorite 
            ? 'text-rose-600 bg-rose-50 border-rose-200 scale-110 shadow-sm' 
            : 'text-stone-300 border-transparent hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:scale-110 hover:shadow-sm'
        }`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
};

export default RecipeListItem;
