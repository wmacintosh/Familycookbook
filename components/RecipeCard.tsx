
import React from 'react';
import { Heart, UtensilsCrossed, Clock } from 'lucide-react';
import { Recipe } from '../types';
import { getAvatarColor } from '../data';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, isFavorite, onToggleFavorite }) => {
  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 border border-stone-100 hover:border-sky-200 recipe-card-shadow hover:shadow-xl group h-full flex flex-col relative"
    >
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-600 to-sky-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      {recipe.imageUrl && (
        <div className="h-48 overflow-hidden relative">
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        </div>
      )}

      <div className="p-7 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold tracking-widest text-sky-700 uppercase bg-sky-50/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-sky-100/50">{recipe.category}</span>
          <button 
            onClick={onToggleFavorite}
            className={`p-2 rounded-full transition-all duration-300 z-10 ${isFavorite ? 'text-rose-600 bg-rose-50 shadow-inner scale-110' : 'text-stone-300 hover:text-rose-500 hover:bg-rose-50 hover:scale-110'}`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        
        <h3 className="font-serif text-2xl font-bold text-stone-800 mb-3 group-hover:text-sky-700 transition-colors leading-tight">{recipe.title}</h3>
        {recipe.description && <p className="text-stone-500 text-sm italic mb-6 line-clamp-2 font-serif leading-relaxed">{recipe.description}</p>}
        
        <div className="mt-auto pt-5 border-t border-stone-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
             <span className="flex items-center gap-1.5">
               <UtensilsCrossed size={14} className="text-sky-600/60" /> {recipe.ingredients.length} ingredients
             </span>
             {recipe.cookTime && <span className="bg-stone-50 px-2 py-1 rounded text-stone-500 flex items-center gap-1"><Clock size={12}/> {recipe.cookTime}</span>}
          </div>
          
          <div className="flex items-center gap-2.5 mt-1">
             <div 
               className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm ring-2 ring-offset-2 ring-stone-50 transition-transform group-hover:scale-105"
               style={{ backgroundColor: badgeColor }}
             >
               {recipe.addedBy.charAt(0).toUpperCase()}
             </div>
             <span className="text-xs text-stone-500 font-medium">
               {recipe.addedBy === 'Nan' ? 'Original Recipe' : `Added by ${recipe.addedBy}`}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
