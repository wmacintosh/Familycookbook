
import React from 'react';
import { Pizza, Soup, Croissant, UtensilsCrossed, Leaf, Cake, Droplet, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  count: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, onClick }) => {
  const getIcon = (cat: Category) => {
    switch(cat) {
      case Category.APPETIZERS: return <Pizza size={32} />;
      case Category.SOUPS_SALADS: return <Soup size={32} />;
      case Category.BREADS_MUFFINS: return <Croissant size={32} />;
      case Category.MAIN_DISHES: return <UtensilsCrossed size={32} />;
      case Category.SIDE_DISHES: return <Leaf size={32} />;
      case Category.DESSERTS: return <Cake size={32} />;
      case Category.SAUCES: return <Droplet size={32} />;
      default: return <UtensilsCrossed size={32} />;
    }
  };

  const getGradient = (cat: Category) => {
    switch(cat) {
      case Category.APPETIZERS: return "from-amber-50 to-amber-100/50 hover:to-amber-100 text-amber-700";
      case Category.SOUPS_SALADS: return "from-emerald-50 to-emerald-100/50 hover:to-emerald-100 text-emerald-700";
      case Category.BREADS_MUFFINS: return "from-orange-50 to-orange-100/50 hover:to-orange-100 text-orange-700";
      case Category.MAIN_DISHES: return "from-rose-50 to-rose-100/50 hover:to-rose-100 text-rose-700";
      case Category.SIDE_DISHES: return "from-lime-50 to-lime-100/50 hover:to-lime-100 text-lime-700";
      case Category.DESSERTS: return "from-pink-50 to-pink-100/50 hover:to-pink-100 text-pink-700";
      case Category.SAUCES: return "from-sky-50 to-sky-100/50 hover:to-sky-100 text-sky-700";
      default: return "from-stone-50 to-stone-100/50 hover:to-stone-100 text-stone-700";
    }
  };

  return (
    <button 
      onClick={onClick}
      className={`group relative p-8 h-64 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${getGradient(category)} flex flex-col items-center justify-center text-center gap-6 hover:-translate-y-2 overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
        <div className="scale-150">{getIcon(category)}</div>
      </div>
      
      <div className="bg-white p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-white/50 relative z-10 text-current">
        {getIcon(category)}
      </div>
      
      <div className="relative z-10 text-stone-800">
        <h3 className="font-serif text-2xl font-bold mb-2 leading-tight">{category}</h3>
        <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-stone-600 group-hover:bg-white group-hover:text-stone-800 transition-colors">
          {count} Recipes
        </span>
      </div>
      
      <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-stone-400">
        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">Browse Category <ChevronRight size={14}/></span>
      </div>
    </button>
  );
};

export default CategoryCard;
