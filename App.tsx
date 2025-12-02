
import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BookOpen, Search, Plus, ChefHat, User, Home, UtensilsCrossed, X, Menu, Printer, Check, Heart, Trash2, PlusCircle, Palette, ChevronRight, Edit2, Share2, Clock, Thermometer, ArrowLeft, LayoutGrid, List, Soup, Croissant, Cake, Pizza, Leaf, Droplet, Coffee, Image as ImageIcon, AlertTriangle, Download, Sparkles } from 'lucide-react';
import { Recipe, Category, UserColorMap } from './types';
import { INITIAL_RECIPES } from './data';

// --- Styles for MacIntosh Red Tartan (Heritage Intro) ---
const tartanStyles = {
  backgroundColor: '#cc0000', // MacIntosh Red Base
  backgroundImage: `
    repeating-linear-gradient(90deg, rgba(0, 50, 0, 0.5) 0px, rgba(0, 50, 0, 0.5) 50px, transparent 50px, transparent 110px),
    repeating-linear-gradient(0deg, rgba(0, 50, 0, 0.5) 0px, rgba(0, 50, 0, 0.5) 50px, transparent 50px, transparent 110px),
    
    repeating-linear-gradient(90deg, rgba(0, 0, 80, 0.5) 50px, rgba(0, 0, 80, 0.5) 70px, transparent 70px, transparent 110px),
    repeating-linear-gradient(0deg, rgba(0, 0, 80, 0.5) 50px, rgba(0, 0, 80, 0.5) 70px, transparent 70px, transparent 110px),
    
    repeating-linear-gradient(90deg, transparent 0px, transparent 25px, rgba(255, 215, 0, 0.8) 25px, rgba(255, 215, 0, 0.8) 27px, transparent 27px, transparent 110px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 25px, rgba(255, 215, 0, 0.8) 25px, rgba(255, 215, 0, 0.8) 27px, transparent 27px, transparent 110px)
  `
};

const AVATAR_COLORS = [
  '#b91c1c', // Red (Heritage)
  '#15803d', // Green (Heritage)
  '#b45309', // Amber (Heritage)
  '#0369a1', // Sky 700 (Theme)
  '#334155', // Slate (Neutral)
  '#4338ca', // Indigo
  '#be185d', // Pink
  '#854d0e', // Bronze
  '#0f766e', // Teal
  '#7e22ce', // Purple
];

// Deterministic color generator based on name
const getAvatarColor = (name: string, explicitColor?: string) => {
  if (explicitColor) return explicitColor;
  if (name === 'Nan') return '#b45309'; // Amber for Nan, keeps heritage status

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

// --- Components ---

const Intro: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div style={tartanStyles} className="flex flex-col items-center justify-start min-h-screen w-full relative overflow-y-auto pb-20">
    <div className="absolute inset-0 bg-black/30 fixed"></div>
    
    <div className="relative z-10 bg-stone-50/95 p-8 md:p-16 rounded-sm shadow-2xl max-w-4xl mx-4 text-center border-double border-8 border-stone-800 mt-10 md:mt-20 animate-fade-in">
      {/* Family Crest */}
      <div className="mb-8 flex justify-center">
        <div className="w-40 h-40 md:w-48 md:h-48 relative group perspective-1000">
           <img 
             src="https://i.imgur.com/imWxO8a.jpeg" 
             alt="MacIntosh Family Crest" 
             className="w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:rotate-y-12"
             onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
               (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white font-serif text-xs p-4 text-center border-4 border-amber-500">Crest Image</div>';
             }}
           />
        </div>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-2 tracking-tight drop-shadow-sm">Shirley’s Kitchen</h1>
      <h2 className="font-serif text-3xl md:text-4xl text-red-900 italic mb-6">Cooking with Nan</h2>
      <p className="font-serif text-lg md:text-xl text-stone-600 mb-10 uppercase tracking-widest border-t-b border-stone-300 py-2 inline-block border-t border-b">
        A Cherished Collection of Recipes Passed Down Through Generations
      </p>
      
      <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed text-justify mb-12 mx-auto max-w-2xl bg-stone-100/50 p-6 rounded-lg border border-stone-200 shadow-inner">
        <p className="mb-4 indent-8">
          My earliest memories of the kitchen are forged links to my Nan, Shirley MacIntosh. It was her domain, a
          sanctuary where she moved with quiet, purposeful grace, her hands perpetually busy, creating magic from
          simple ingredients. This book is a labor of love, a deeply personal compilation of her cherished recipes,
          each one carrying a piece of her spirit, a story waiting to be retold. It’s dedicated with particular affection
          to her daughters, who, like myself, were privileged to learn the art of cooking beside her, absorbing not just
          her techniques but also her quiet wisdom.
        </p>
        <p className="indent-8">
          These recipes are more than mere instructions; they are a tangible connection to her, a way to recreate
          the flavors and the moments that defined our family gatherings, moments that now feel precious and fleeting
          in the passage of time. May each dish you prepare from these pages bring back the warmth of her presence,
          the comfort of her touch, and the joy of the memories we shared, preserving her legacy for generations to
          come. This book is a way to hold on to her, to keep her alive in our kitchens and in our hearts.
        </p>
      </div>

      <div className="mb-8">
        <button
          onClick={onStart}
          className="group relative px-12 py-4 bg-teal-800 text-white font-serif text-xl rounded-sm shadow-xl hover:bg-teal-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-1 ring-teal-700/50"
        >
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative z-10 flex items-center gap-3">
            <BookOpen size={24} />
            Enter Kitchen
          </span>
        </button>
      </div>

      <p className="italic text-stone-900 font-bold font-serif text-xl mt-16">
        "The secret ingredient is always love."
      </p>
    </div>
  </div>
);

const PrintLayout: React.FC<{ recipes: Recipe[]; onExit: () => void }> = ({ recipes, onExit }) => (
  <div className="bg-white min-h-screen">
    <div className="fixed top-0 left-0 right-0 bg-stone-900 text-white p-4 flex justify-between items-center print:hidden z-50 shadow-lg">
      <span className="font-bold flex items-center gap-2"><Printer /> Print Mode</span>
      <div className="flex gap-4">
        <button onClick={() => window.print()} className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded font-bold">Print Now</button>
        <button onClick={onExit} className="bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded">Exit</button>
      </div>
    </div>
    
    <div className="max-w-4xl mx-auto p-8 pt-24 print:pt-0">
      <div className="text-center mb-12 border-b-4 border-double border-stone-800 pb-8">
        <h1 className="font-serif text-5xl text-stone-900 mb-2">Shirley’s Kitchen</h1>
        <p className="italic text-stone-600">The MacIntosh Family Cookbook</p>
      </div>

      {recipes.map((recipe, idx) => (
        <div key={recipe.id} className="mb-12 break-inside-avoid page-break-after-always border-b border-stone-200 pb-8 last:border-0">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="font-serif text-3xl font-bold text-stone-900">{recipe.title}</h2>
            <span className="text-sm font-bold uppercase tracking-wide text-stone-500">{recipe.category}</span>
          </div>
          
          {recipe.description && <p className="italic text-stone-600 mb-6">{recipe.description}</p>}
          
          <div className="grid grid-cols-3 gap-4 text-sm text-stone-500 mb-6 font-mono border-y border-stone-100 py-2">
             {recipe.prepTime && <div>Prep: {recipe.prepTime}</div>}
             {recipe.cookTime && <div>Cook: {recipe.cookTime}</div>}
             {recipe.temp && <div>Temp: {recipe.temp}</div>}
             {recipe.yields && <div>Yields: {recipe.yields}</div>}
             <div className="col-span-3 mt-1 text-xs">Source: {recipe.addedBy}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <h3 className="font-bold uppercase text-xs text-stone-900 mb-3">Ingredients</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-stone-700">
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
            <div className="col-span-2">
              <h3 className="font-bold uppercase text-xs text-stone-900 mb-3">Method</h3>
              <ol className="list-decimal list-inside text-sm space-y-2 text-stone-700">
                {recipe.instructions.map((inst, i) => <li key={i} className="pl-2">{inst}</li>)}
              </ol>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecipeCard: React.FC<{ recipe: Recipe; onClick: () => void; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void }> = ({ recipe, onClick, isFavorite, onToggleFavorite }) => {
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

// --- Recipe List Item Component ---
const RecipeListItem: React.FC<{ recipe: Recipe; onClick: () => void; isFavorite: boolean; onToggleFavorite: (e: React.MouseEvent) => void }> = ({ recipe, onClick, isFavorite, onToggleFavorite }) => {
  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 flex items-center gap-4 sm:gap-6 cursor-pointer hover:bg-sky-50/50 transition-all border border-stone-100 hover:border-sky-200 shadow-sm hover:shadow-md group animate-fade-in relative overflow-hidden"
    >
       {/* Avatar / User Indicator */}
       <div className="flex-shrink-0 z-10 flex flex-col items-center gap-1" title={`Added by ${recipe.addedBy}`}>
          <div 
             className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-sm md:text-base font-bold shadow-sm ring-2 ring-offset-1 ring-stone-100 group-hover:ring-sky-100 transition-all"
             style={{ backgroundColor: badgeColor }}
           >
             {recipe.addedBy.charAt(0).toUpperCase()}
           </div>
           {/* Visible name on tablet/desktop */}
           <span className="hidden md:block text-[10px] font-bold text-stone-400 uppercase tracking-wider max-w-[60px] truncate text-center">{recipe.addedBy}</span>
       </div>

       {/* Content */}
       <div className="flex-1 min-w-0 flex flex-col justify-center z-10 space-y-1">
          <div className="flex items-baseline gap-3 flex-wrap">
             <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 truncate group-hover:text-sky-700 transition-colors">{recipe.title}</h3>
             <span className="text-[10px] font-bold tracking-widest text-sky-600 uppercase bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 flex-shrink-0">{recipe.category}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-stone-500">
             {/* Mobile-only user indicator */}
             <span className="md:hidden font-medium text-stone-400">by {recipe.addedBy}</span>
             <span className="hidden md:inline truncate max-w-md">{recipe.description}</span>
          </div>
       </div>

       {/* Meta (Time/Ingredients) - Responsive visibility */}
       <div className="flex items-center gap-3 md:gap-6 text-stone-400 text-xs font-medium flex-shrink-0 z-10">
          {(recipe.prepTime || recipe.cookTime) && (
            <span className="hidden sm:flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
              <Clock size={14} className="text-stone-400"/> 
              {recipe.cookTime || recipe.prepTime}
            </span>
          )}
          <span className="hidden sm:flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
            <UtensilsCrossed size={14} className="text-stone-400"/> 
            {recipe.ingredients.length}
          </span>
       </div>

       {/* Favorite Button - Enhanced */}
       <button 
        onClick={onToggleFavorite}
        className={`p-3 rounded-full transition-all duration-300 flex-shrink-0 z-20 border ml-2 ${
          isFavorite 
            ? 'text-rose-600 bg-rose-50 border-rose-200 scale-110 shadow-sm' 
            : 'text-stone-300 border-transparent hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:scale-110 hover:shadow-sm'
        }`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} strokeWidth={isFavorite ? 0 : 2} />
      </button>
    </div>
  );
};

// --- Category Card Component ---
const CategoryCard: React.FC<{ category: Category; count: number; onClick: () => void }> = ({ category, count, onClick }) => {
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

const DeleteConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void; recipeTitle: string }> = ({ isOpen, onClose, onConfirm, recipeTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all animate-scale-in border border-red-100">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-4 rounded-full mb-4 text-red-500 shadow-inner">
            <AlertTriangle size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">Delete Recipe?</h3>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Are you sure you want to permanently delete <span className="font-bold text-stone-800">"{recipeTitle}"</span>? <br/>This action cannot be undone.
          </p>
          <div className="flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3.5 rounded-xl text-stone-600 font-bold hover:bg-stone-100 transition-colors border border-stone-200"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipeDetail: React.FC<{ 
  recipe: Recipe; 
  onBack: () => void; 
  isFavorite: boolean; 
  onToggleFavorite: () => void; 
  onEdit: () => void;
  onDelete: () => void;
  onUpdateRecipe: (recipe: Recipe) => void;
}> = ({ recipe, onBack, isFavorite, onToggleFavorite, onEdit, onDelete, onUpdateRecipe }) => {
  const [tips, setTips] = useState<string | null>(null);
  const [variations, setVariations] = useState<string | null>(null);
  
  const [loadingTips, setLoadingTips] = useState(false);
  const [loadingVariations, setLoadingVariations] = useState(false);
  
  const [errorTips, setErrorTips] = useState<string | null>(null);
  const [errorVariations, setErrorVariations] = useState<string | null>(null);
  
  // Which AI content to show: 'tips' | 'variations' | null
  const [activeAiTab, setActiveAiTab] = useState<'tips' | 'variations' | null>(null);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [imageError, setImageError] = useState<string | null>(null);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  // Reset states when recipe changes
  useEffect(() => {
    setTips(null);
    setVariations(null);
    setErrorTips(null);
    setErrorVariations(null);
    setLoadingTips(false);
    setLoadingVariations(false);
    setActiveAiTab(null);
    setImageError(null);
    setIsGeneratingImage(false);
  }, [recipe.id]);

  const handleShare = async () => {
    const shareData = {
      title: recipe.title,
      text: `Check out this recipe for ${recipe.title} from Shirley's Kitchen!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      const text = `${recipe.title}\n\n${recipe.description || ''}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
      navigator.clipboard.writeText(text);
      alert('Recipe copied to clipboard!');
    }
  };

  const getGeminiTips = async () => {
    setActiveAiTab('tips');
    if (tips) return; // Already loaded

    if (!process.env.API_KEY) {
      setErrorTips("API Key is missing.");
      return;
    }

    setLoadingTips(true);
    setErrorTips(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are an expert chef assisting a home cook with a treasured family recipe. 
        Recipe: ${recipe.title}
        Description: ${recipe.description || 'None'}
        Ingredients: ${recipe.ingredients.join(', ')}
        Instructions: ${recipe.instructions.join(', ')}

        Please provide 3 specific, actionable, and helpful "Chef's Tips" for making this recipe perfect. 
        Focus on technique, ingredient selection, or common pitfalls. 
        Keep the tone encouraging and warm, like a grandmother teaching her grandchild.
        Format as a simple list.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setTips(response.text || "No tips generated.");
    } catch (e) {
      console.error(e);
      setErrorTips("Sorry, the chef is busy right now. Please try again later.");
    } finally {
      setLoadingTips(false);
    }
  };
  
  const getVariations = async () => {
    setActiveAiTab('variations');
    if (variations) return; // Already loaded

    if (!process.env.API_KEY) {
      setErrorVariations("API Key is missing.");
      return;
    }

    setLoadingVariations(true);
    setErrorVariations(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are a creative culinary expert. Based on the following recipe, suggest:
        1. Two creative flavor variations (twists on the original).
        2. Two common dietary substitutions (e.g., gluten-free, dairy-free options) if applicable.

        Recipe: ${recipe.title}
        Ingredients: ${recipe.ingredients.join(', ')}
        Instructions: ${recipe.instructions.join(', ')}

        Keep the suggestions concise and practical. Use bullet points.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setVariations(response.text || "No variations generated.");
    } catch (e) {
      console.error(e);
      setErrorVariations("Could not generate variations right now. Please try again later.");
    } finally {
      setLoadingVariations(false);
    }
  };

  const generateImage = async () => {
    if (!process.env.API_KEY) {
      setImageError("API Key is missing.");
      return;
    }

    setIsGeneratingImage(true);
    setImageError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Professional food photography of ${recipe.title}. ${recipe.description || ''}. The image should be appetizing, high resolution, with soft natural lighting and elegant plating suitable for a family cookbook.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: imageSize
          }
        },
      });

      // Find the image part in the response
      let base64Image: string | undefined;
      
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Image) {
        const imageUrl = `data:image/png;base64,${base64Image}`;
        // Update recipe with new image
        const updatedRecipe = { ...recipe, imageUrl };
        onUpdateRecipe(updatedRecipe);
      } else {
        setImageError("No image generated. Please try again.");
      }
      
    } catch (e) {
      console.error(e);
      setImageError("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[85vh] shadow-2xl rounded-none md:rounded-2xl overflow-hidden flex flex-col relative animate-fade-in print:shadow-none print:h-auto border border-white/50 ring-1 ring-stone-200/50">
      <DeleteConfirmationModal 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete();
        }}
        recipeTitle={recipe.title}
      />

      {/* Header Controls */}
      <div className="absolute top-4 left-4 z-20 print:hidden">
        <button onClick={onBack} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all group">
          <ArrowLeft size={24} className="text-stone-600 group-hover:text-stone-900" />
        </button>
      </div>
      <div className="absolute top-4 right-4 z-20 flex gap-2 print:hidden">
        <button onClick={onEdit} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Edit Recipe">
          <Edit2 size={24} />
        </button>
        <button onClick={() => setShowDeleteConfirm(true)} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-red-50 hover:text-red-500 hover:scale-105 transition-all text-stone-600" title="Delete Recipe">
          <Trash2 size={24} />
        </button>
        <button onClick={handleShare} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Share Recipe">
          <Share2 size={24} />
        </button>
        <button onClick={() => window.print()} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Print Recipe">
          <Printer size={24} />
        </button>
        <button 
          onClick={onToggleFavorite}
          className={`p-2.5 rounded-full shadow-lg border border-white/50 backdrop-blur-md transition-all hover:scale-105 bg-white/80 hover:bg-white ${isFavorite ? 'text-rose-500' : 'text-stone-400 hover:text-rose-400'}`}
        >
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Hero Section */}
      <div className={`bg-sky-50 text-center relative overflow-hidden print:bg-white print:p-0 print:border-b-2 print:border-black print:mb-8 transition-all duration-500 ${recipe.imageUrl ? 'h-[400px] md:h-[500px]' : 'p-8 md:p-16'}`}>
        {recipe.imageUrl ? (
           <div className="absolute inset-0 z-0">
             <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
           </div>
        ) : (
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>
        )}
        
        <div className={`relative z-10 flex flex-col items-center justify-center h-full ${recipe.imageUrl ? 'text-white justify-end pb-12' : 'text-stone-800'}`}>
          <span className={`inline-block px-4 py-1.5 rounded-full border font-serif italic text-sm md:text-base mb-4 backdrop-blur-sm shadow-sm print:hidden ${recipe.imageUrl ? 'bg-black/30 border-white/20 text-white' : 'border-sky-200/60 text-sky-700 bg-white/60'}`}>
            {recipe.category}
          </span>
          <h2 className={`font-serif text-4xl md:text-6xl font-bold mb-4 print:text-black drop-shadow-sm max-w-4xl leading-tight ${recipe.imageUrl ? 'text-white text-shadow-lg' : 'text-stone-800'}`}>{recipe.title}</h2>
          {recipe.description && <p className={`text-lg md:text-xl italic font-serif max-w-2xl mx-auto leading-relaxed print:text-stone-600 ${recipe.imageUrl ? 'text-stone-200' : 'text-stone-500'}`}>"{recipe.description}"</p>}
          
          {/* Metadata Badges */}
          <div className={`flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm font-light print:text-stone-800 ${recipe.imageUrl ? 'text-white' : 'text-stone-600'}`}>
             {recipe.prepTime && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Prep</span>
                 <span className="font-medium">{recipe.prepTime}</span>
               </div>
             )}
             {recipe.cookTime && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Cook</span>
                 <span className="font-medium">{recipe.cookTime}</span>
               </div>
             )}
             {recipe.temp && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Temp</span>
                 <span className="font-medium">{recipe.temp}</span>
               </div>
             )}
             {recipe.yields && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Yields</span>
                 <span className="font-medium">{recipe.yields}</span>
               </div>
             )}
          </div>

          {/* Added By Badge */}
          <div className={`mt-8 pt-6 border-t flex justify-center items-center gap-3 print:border-stone-200 ${recipe.imageUrl ? 'border-white/20' : 'border-stone-200/60'}`}>
            <span className={`text-xs uppercase tracking-widest font-bold ${recipe.imageUrl ? 'text-stone-300' : 'text-stone-400'}`}>Recipe Source</span>
            <span className={`pl-2 pr-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm border print:bg-transparent print:text-black print:border print:border-black ${recipe.imageUrl ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-stone-100 text-stone-600'}`}>
               <div 
                 className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                 style={{ backgroundColor: badgeColor }}
               >
                 {recipe.addedBy.charAt(0).toUpperCase()}
               </div>
               {recipe.addedBy}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 print:block print:p-0 bg-white">
        {/* Ingredients Column */}
        <div className="md:col-span-4 border-r-0 md:border-r border-stone-100 pr-0 md:pr-8 print:border-0 print:mb-8">
          <h3 className="font-serif text-2xl text-stone-800 border-b-2 border-sky-100 pb-3 mb-6 flex items-center gap-3 print:border-black">
            <div className="w-2 h-2 rounded-full bg-sky-500"></div> Ingredients
          </h3>
          <ul className="space-y-4 text-stone-600 print:space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-4 items-start group p-2 rounded-lg hover:bg-sky-50 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-200 mt-2.5 group-hover:bg-sky-500 transition-colors flex-shrink-0 print:bg-black"></div>
                <span className="leading-relaxed font-medium text-stone-700">{ing}</span>
              </li>
            ))}
          </ul>

          {/* Image Generation Controls (Desktop) - Hidden in Print */}
          <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100 print:hidden">
            <h4 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-sky-600" />
              {recipe.imageUrl ? "Update Photo" : "Generate Photo"}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-stone-200">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${imageSize === size ? 'bg-sky-100 text-sky-700 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={generateImage}
                disabled={isGeneratingImage}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isGeneratingImage ? 'bg-stone-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 hover:shadow-sky-200'}`}
              >
                {isGeneratingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <ChefHat size={16} />
                    {recipe.imageUrl ? "Regenerate Photo" : "Create Photo"}
                  </>
                )}
              </button>
              {imageError && <p className="text-xs text-rose-500 mt-2 text-center">{imageError}</p>}
              <p className="text-[10px] text-stone-400 text-center mt-1">Powered by Gemini 3 Pro</p>
            </div>
          </div>

        </div>

        {/* Instructions Column */}
        <div className="md:col-span-8">
          <div className="flex justify-between items-center border-b-2 border-sky-100 pb-3 mb-8 print:border-black">
             <h3 className="font-serif text-2xl text-stone-800 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-sky-500"></div> Method
             </h3>
          </div>
          
          <ol className="space-y-8 text-stone-600 print:space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-6 group">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-50 border border-stone-100 text-sky-700 font-serif font-bold text-xl flex items-center justify-center shadow-sm group-hover:bg-sky-50 group-hover:text-sky-800 group-hover:scale-110 transition-all print:bg-transparent print:border print:border-black print:text-black print:w-8 print:h-8 print:text-sm">
                  {i + 1}
                </span>
                <p className="mt-1 leading-relaxed text-lg text-stone-700 print:text-base">{step}</p>
              </li>
            ))}
          </ol>

          {/* Gemini AI Tips Section - Hidden on Print */}
          <div className="mt-16 bg-gradient-to-br from-sky-50/80 to-white rounded-3xl p-8 border border-sky-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] print:hidden relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-sky-900 pointer-events-none">
                <ChefHat size={150} />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-sky-100/50 p-3 rounded-2xl text-sky-800 shadow-sm backdrop-blur-sm">
                    <ChefHat size={28} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-stone-800 font-bold">Nan's Digital Kitchen Assistant</h4>
                    <p className="text-xs text-sky-600 uppercase tracking-wide font-bold">Powered by Gemini AI</p>
                  </div>
                </div>
                
                {/* Button Controls */}
                <div className="flex flex-wrap gap-3 mb-6">
                   <button 
                     onClick={getGeminiTips}
                     disabled={loadingTips || loadingVariations}
                     className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm border ${activeAiTab === 'tips' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-sky-800 border-sky-200 hover:bg-sky-50'}`}
                   >
                      {loadingTips ? (
                         <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                         <ChefHat size={18} />
                      )}
                      <span>Chef's Tips</span>
                   </button>

                   <button 
                     onClick={getVariations}
                     disabled={loadingTips || loadingVariations}
                     className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm border ${activeAiTab === 'variations' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'}`}
                   >
                      {loadingVariations ? (
                         <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                         <Sparkles size={18} />
                      )}
                      <span>Substitutions & Variations</span>
                   </button>
                </div>
                
                {/* Content Area */}
                <div className="min-h-[100px]">
                   {/* Default State */}
                   {!activeAiTab && (
                      <p className="text-stone-600 text-base leading-relaxed max-w-2xl italic">
                        Select an option above to get personalized advice, substitutions, or creative twists for this recipe.
                      </p>
                   )}

                   {/* Error Messages */}
                   {(errorTips || errorVariations) && (
                     <p className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-100">
                       {activeAiTab === 'tips' ? errorTips : errorVariations}
                     </p>
                   )}

                   {/* Loading State */}
                   {(loadingTips || loadingVariations) && (
                     <div className="flex flex-col items-center justify-center py-8 text-stone-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-stone-200 border-t-sky-500 mb-3"></div>
                        <p className="font-serif italic text-sm">Consulting the cookbook...</p>
                     </div>
                   )}

                   {/* Display Content */}
                   {activeAiTab === 'tips' && tips && (
                      <div className="prose prose-stone text-stone-700 bg-white/80 p-6 rounded-2xl border border-sky-100/50 backdrop-blur-sm shadow-sm animate-fade-in">
                        <h5 className="font-bold text-sky-800 mb-2 text-sm uppercase tracking-wider">Chef's Tips</h5>
                        <div className="whitespace-pre-line leading-relaxed">{tips}</div>
                      </div>
                   )}

                   {activeAiTab === 'variations' && variations && (
                      <div className="prose prose-stone text-stone-700 bg-white/80 p-6 rounded-2xl border border-emerald-100/50 backdrop-blur-sm shadow-sm animate-fade-in">
                        <h5 className="font-bold text-emerald-800 mb-2 text-sm uppercase tracking-wider">Variations & Substitutions</h5>
                        <div className="whitespace-pre-line leading-relaxed">{variations}</div>
                      </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicListInput: React.FC<{ items: string[]; onChange: (items: string[]) => void; placeholder: string; label: string }> = ({ items, onChange, placeholder, label }) => {
  const [current, setCurrent] = useState('');

  const add = () => {
    if (!current.trim()) return;
    onChange([...items, current.trim()]);
    setCurrent('');
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider">{label}</label>
      <div className="flex gap-2">
        <input 
          value={current} 
          onChange={e => setCurrent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-white focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
          placeholder={placeholder}
        />
        <button type="button" onClick={add} className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-3 rounded-xl transition-colors shadow-sm">
          <PlusCircle size={20} />
        </button>
      </div>
      <ul className="space-y-2 mt-3 max-h-48 overflow-y-auto custom-scrollbar p-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-stone-100 shadow-sm group animate-fade-in">
            <span className="flex-1 text-sm text-stone-700 font-medium">{item}</span>
            <button type="button" onClick={() => remove(idx)} className="text-stone-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
        {items.length === 0 && <li className="text-xs text-stone-400 italic pl-2">No items added yet.</li>}
      </ul>
    </div>
  );
};

const RecipeModal: React.FC<{ onClose: () => void; onSave: (recipe: Recipe) => void; initialData?: Recipe }> = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState<Category>(initialData?.category || Category.MAIN_DISHES);
  const [description, setDescription] = useState(initialData?.description || '');
  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || []);
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions || []);
  const [addedBy, setAddedBy] = useState(initialData?.addedBy || '');
  const [temp, setTemp] = useState(initialData?.temp || '');
  const [cookTime, setCookTime] = useState(initialData?.cookTime || '');
  const [userColor, setUserColor] = useState(initialData?.userColor || '');
  const [yields, setYields] = useState(initialData?.yields || '');
  const [prepTime, setPrepTime] = useState(initialData?.prepTime || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  // Pre-select color based on name if editing or if user typed name
  useEffect(() => {
      if(initialData?.addedBy && !userColor) {
          setUserColor(getAvatarColor(initialData.addedBy, initialData.userColor));
      }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      setAddedBy(newName);
      // Automatically update color to match the new name, unless user manually picks one later
      setUserColor(getAvatarColor(newName));
  };

  const handleColorSelect = (color: string) => {
      setUserColor(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !addedBy || ingredients.length === 0 || instructions.length === 0) {
      alert("Please fill in all required fields and add at least one ingredient and instruction.");
      return;
    }

    const newRecipe: Recipe = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      title,
      category,
      description,
      ingredients,
      instructions,
      addedBy,
      temp: temp || undefined,
      cookTime: cookTime || undefined,
      prepTime: prepTime || undefined,
      yields: yields || undefined,
      userColor: userColor || getAvatarColor(addedBy),
      timestamp: initialData?.timestamp || Date.now(),
      imageUrl: imageUrl || undefined
    };
    onSave(newRecipe);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in ring-1 ring-white/50">
        <div className="p-8 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="font-serif text-3xl text-stone-800">{initialData ? 'Edit Recipe' : 'Contribute a Recipe'}</h2>
            <p className="text-sm text-stone-500 mt-1">{initialData ? 'Update details or correct information.' : 'Share your family favorite with everyone.'}</p>
          </div>
          <button onClick={onClose} className="bg-stone-50 p-3 rounded-full hover:bg-stone-100 transition-colors shadow-sm"><X className="text-stone-600" size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-stone-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Title <span className="text-rose-500">*</span></label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all shadow-sm bg-white text-stone-900 placeholder:text-stone-400" placeholder="e.g. Aunt Jean's Brownies" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Category</label>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer shadow-sm appearance-none bg-white text-stone-900">
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-4 top-4 pointer-events-none text-stone-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Description / Memories</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all shadow-sm bg-white text-stone-900 placeholder:text-stone-400" rows={3} placeholder="A short description or memory about this dish..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Prep Time</label>
              <input value={prepTime} onChange={e => setPrepTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-white text-stone-900 placeholder:text-stone-400" placeholder="e.g. 15 mins" />
            </div>
             <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Cook Time</label>
              <input value={cookTime} onChange={e => setCookTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-white text-stone-900 placeholder:text-stone-400" placeholder="e.g. 45 mins" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Oven Temp</label>
              <input value={temp} onChange={e => setTemp(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-white text-stone-900 placeholder:text-stone-400" placeholder="e.g. 350°F" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Yields</label>
              <input value={yields} onChange={e => setYields(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-white text-stone-900 placeholder:text-stone-400" placeholder="e.g. 12 servings" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Owner <span className="text-rose-500">*</span></label>
              <input required value={addedBy} onChange={handleNameChange} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-white text-stone-900 placeholder:text-stone-400" placeholder="Who is adding this?" />
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-4 flex items-center gap-2 tracking-wider"><Palette size={14}/> Owner Avatar Color</label>
              <div className="flex gap-4 flex-wrap">
                {AVATAR_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`w-10 h-10 rounded-full shadow-sm transition-all hover:scale-110 hover:shadow-md ${userColor === color ? 'ring-4 ring-offset-2 ring-stone-200 scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DynamicListInput 
              label="Ingredients" 
              placeholder="Add an ingredient (e.g. 1 cup flour) and press Enter" 
              items={ingredients} 
              onChange={setIngredients} 
            />
            <DynamicListInput 
              label="Instructions" 
              placeholder="Add a step and press Enter" 
              items={instructions} 
              onChange={setInstructions} 
            />
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-end gap-4 sticky bottom-0 bg-stone-50/95 backdrop-blur p-4 -mx-8 -mb-8 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-stone-600 font-medium hover:bg-stone-200 transition-colors">Cancel</button>
            <button type="submit" className="px-8 py-3 rounded-xl bg-sky-700 text-white font-medium hover:bg-sky-800 shadow-lg hover:shadow-sky-900/20 transition-all flex items-center gap-2">
              <Check size={18} /> {initialData ? 'Save Changes' : 'Save to Cookbook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'categories' | 'list' | 'detail'>('intro');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isPrinting, setIsPrinting] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | 'Favorites'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  
  const [mobileView, setMobileView] = useState<'categories' | 'recipes'>('categories');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize data on mount
  useEffect(() => {
    // Load recipes
    const storedRecipes = localStorage.getItem('shirleys_kitchen_recipes');
    if (storedRecipes) {
      const parsedStored: Recipe[] = JSON.parse(storedRecipes);
      const storedMap = new Map(parsedStored.map(r => [r.id, r]));
      
      const mergedRecipes = INITIAL_RECIPES.map(r => {
          if (storedMap.has(r.id)) {
              const stored = storedMap.get(r.id);
              storedMap.delete(r.id); 
              return stored!;
          }
          return r;
      });
      
      setRecipes([...mergedRecipes, ...Array.from(storedMap.values())]);
    } else {
      setRecipes(INITIAL_RECIPES);
    }

    // Load favorites
    const storedFavs = localStorage.getItem('shirleys_kitchen_favorites');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);
  
  // Check if mobile on initial load to set correct view
  useEffect(() => {
      if (window.innerWidth < 768) {
          setMobileView('categories');
      } else {
          setMobileView('recipes'); // Desktop default
      }
  }, [view]); // Reset when changing main view

  // Persist recipes whenever they change
  useEffect(() => {
     if (recipes.length > 0) {
         localStorage.setItem('shirleys_kitchen_recipes', JSON.stringify(recipes));
     }
  }, [recipes]);

  const toggleFavorite = (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    let newFavs;
    if (favorites.includes(recipeId)) {
      newFavs = favorites.filter(id => id !== recipeId);
    } else {
      newFavs = [...favorites, recipeId];
    }
    setFavorites(newFavs);
    localStorage.setItem('shirleys_kitchen_favorites', JSON.stringify(newFavs));
  };

  const handleStart = () => {
    setView('categories');
    window.scrollTo(0,0);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('detail');
    window.scrollTo(0,0);
    setIsSearchFocused(false);
    setSearchTerm('');
    setActiveSuggestion(-1);
  };
  
  const handleCategorySelect = (cat: Category | 'All' | 'Favorites') => {
      setSelectedCategory(cat);
      setMobileMenuOpen(false);
      setView('list'); // Ensure we switch to list view
  }

  const handleAddRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setShowAddModal(false);
    setSelectedCategory(newRecipe.category);
    setView('list');
    setSearchTerm('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    const updatedList = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    setRecipes(updatedList);
    setSelectedRecipe(updatedRecipe);
    setEditingRecipe(null);
    setShowAddModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  }
  
  const handleDeleteRecipe = () => {
    if (selectedRecipe) {
      const updatedList = recipes.filter(r => r.id !== selectedRecipe.id);
      setRecipes(updatedList);
      setSelectedRecipe(null);
      setView('list');
      setShowSuccessToast(true); // Reusing success toast for deletion confirmation visually
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  }

  const handleSearchChange = (value: string) => {
      setSearchTerm(value);
      setActiveSuggestion(-1);
      // Automatically switch to list view if searching from categories view
      if (view === 'categories' && value.trim().length > 0) {
          setView('list');
          setSelectedCategory('All');
      }
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            r.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
      
      let matchesCategory = true;
      if (selectedCategory === 'Favorites') {
        matchesCategory = favorites.includes(r.id);
      } else if (selectedCategory !== 'All') {
        matchesCategory = r.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory, favorites]);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return recipes
      .filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
  }, [recipes, searchTerm]);

  // Handle keyboard navigation for search
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
      if (!isSearchFocused || searchSuggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveSuggestion(prev => (prev + 1) % searchSuggestions.length);
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveSuggestion(prev => (prev - 1 + searchSuggestions.length) % searchSuggestions.length);
      } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeSuggestion >= 0 && activeSuggestion < searchSuggestions.length) {
              handleRecipeClick(searchSuggestions[activeSuggestion]);
              searchInputRef.current?.blur();
          }
      } else if (e.key === 'Escape') {
          setIsSearchFocused(false);
          setActiveSuggestion(-1);
          searchInputRef.current?.blur();
      }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-sky-100 selection:text-sky-900">
      {/* Print View */}
      {isPrinting && <PrintLayout recipes={filteredRecipes} onExit={() => setIsPrinting(false)} />}

      {/* Intro View */}
      {view === 'intro' && !isPrinting && <Intro onStart={handleStart} />}

      {/* Main App View */}
      {view !== 'intro' && !isPrinting && (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:flex w-64 flex-col bg-stone-900 text-stone-300 border-r border-stone-800 z-20 shadow-xl">
             {/* Logo/Header */}
             <div className="p-6 border-b border-stone-800">
                <h1 className="font-serif text-2xl text-stone-100 mb-1">Shirley’s Kitchen</h1>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Family Cookbook</p>
             </div>

             {/* Navigation */}
             <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                <button 
                  onClick={() => { setView('categories'); setSelectedCategory('All'); setSearchTerm(''); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'categories' ? 'bg-sky-900/50 text-white shadow-inner border border-sky-800/50' : 'hover:bg-stone-800 hover:text-white'}`}
                >
                  <LayoutGrid size={18} />
                  <span className="font-medium">Categories</span>
                </button>
                
                <button 
                  onClick={() => { setView('list'); setSelectedCategory('All'); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'list' && selectedCategory === 'All' ? 'bg-stone-800 text-white shadow-inner' : 'hover:bg-stone-800 hover:text-white'}`}
                >
                  <BookOpen size={18} />
                  <span className="font-medium">All Recipes</span>
                </button>
                
                <button 
                  onClick={() => { setView('list'); setSelectedCategory('Favorites'); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === 'Favorites' ? 'bg-rose-900/30 text-rose-100 shadow-inner border border-rose-900/50' : 'hover:bg-stone-800 hover:text-white'}`}
                >
                  <Heart size={18} className={selectedCategory === 'Favorites' ? 'fill-current' : ''} />
                  <span className="font-medium">Favorites</span>
                </button>

                <div className="pt-6 mt-6 border-t border-stone-800">
                  <h3 className="px-4 text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">Categories</h3>
                  {Object.values(Category).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${selectedCategory === cat && view === 'list' ? 'bg-stone-800 text-sky-400' : 'hover:bg-stone-800/50 hover:text-stone-200'}`}
                    >
                      <span className="truncate">{cat}</span>
                      {selectedCategory === cat && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
             </nav>
             
             {/* Footer */}
             <div className="p-4 border-t border-stone-800 bg-stone-950/50 text-xs text-stone-600 text-center">
                <p>&copy; 2024 MacIntosh Family</p>
             </div>
          </aside>

          {/* Mobile Header & Content Wrapper */}
          <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-stone-50">
             {/* Top Bar */}
             <header className="bg-white border-b border-stone-200 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 z-10 shadow-sm flex-shrink-0">
                <div className="flex items-center gap-4 flex-1">
                   <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg">
                      <Menu size={24} />
                   </button>
                   
                   {/* Search Bar */}
                   <div className="relative w-full max-w-xl group">
                      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${isSearchFocused ? 'text-sky-600' : 'text-stone-400'}`}>
                         <Search size={18} />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search recipes, ingredients..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-transparent rounded-xl focus:bg-white focus:border-sky-300 focus:ring-4 focus:ring-sky-100 outline-none transition-all placeholder:text-stone-400 text-sm md:text-base"
                      />
                      
                      {/* Search Suggestions Dropdown */}
                      {isSearchFocused && searchSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 overflow-hidden animate-scale-in">
                           <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-stone-400">Suggestions</div>
                           {searchSuggestions.map((suggestion, idx) => (
                             <button
                               key={suggestion.id}
                               onMouseDown={() => handleRecipeClick(suggestion)}
                               className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-sky-50 transition-colors ${activeSuggestion === idx ? 'bg-sky-50 text-sky-700' : 'text-stone-600'}`}
                             >
                               <Search size={14} className="opacity-50" />
                               <span className="truncate font-medium">{suggestion.title}</span>
                             </button>
                           ))}
                        </div>
                      )}
                   </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 pl-4">
                   <button 
                     onClick={() => setShowAddModal(true)}
                     className="bg-stone-900 hover:bg-stone-800 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                   >
                     <Plus size={20} />
                     <span className="hidden md:inline font-medium">Add Recipe</span>
                   </button>
                </div>
             </header>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 scroll-smooth relative">
                
                {/* Categories Dashboard View */}
                {view === 'categories' && (
                  <div className="max-w-7xl mx-auto animate-fade-in">
                    <div className="mb-10 text-center md:text-left">
                       <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-3">Welcome to the Kitchen</h2>
                       <p className="text-stone-500 text-lg">Select a category to explore Nan's collection.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                       {Object.values(Category).map((cat) => {
                         const count = recipes.filter(r => r.category === cat).length;
                         return (
                           <CategoryCard 
                             key={cat} 
                             category={cat} 
                             count={count} 
                             onClick={() => { setSelectedCategory(cat); setView('list'); }} 
                           />
                         );
                       })}
                       {/* All Recipes Card */}
                       <button 
                          onClick={() => { setSelectedCategory('All'); setView('list'); }}
                          className="group relative p-8 h-64 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white flex flex-col items-center justify-center text-center gap-6 hover:-translate-y-2 overflow-hidden"
                        >
                           <div className="bg-stone-50 p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-stone-100 relative z-10 text-stone-700">
                             <BookOpen size={32} />
                           </div>
                           <div className="relative z-10 text-stone-800">
                             <h3 className="font-serif text-2xl font-bold mb-2">All Recipes</h3>
                             <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-bold uppercase tracking-widest text-stone-600">
                               {recipes.length} Total
                             </span>
                           </div>
                        </button>
                    </div>
                  </div>
                )}

                {/* Recipe List View */}
                {view === 'list' && (
                  <div className="max-w-7xl mx-auto animate-fade-in h-full flex flex-col">
                     <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 flex-shrink-0">
                        <div>
                           <div className="flex items-center gap-2 text-stone-400 text-sm font-medium mb-1">
                             <button onClick={() => setView('categories')} className="hover:text-stone-600 hover:underline">Categories</button>
                             <ChevronRight size={14} />
                             <span className="text-sky-700">{selectedCategory}</span>
                           </div>
                           <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
                              {selectedCategory === 'All' ? 'All Recipes' : selectedCategory}
                           </h2>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-stone-200 shadow-sm">
                           <button 
                             onClick={() => setLayoutMode('grid')}
                             className={`p-2 rounded-md transition-all ${layoutMode === 'grid' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                             title="Grid View"
                           >
                             <LayoutGrid size={20} />
                           </button>
                           <div className="w-px h-6 bg-stone-200"></div>
                           <button 
                             onClick={() => setLayoutMode('list')}
                             className={`p-2 rounded-md transition-all ${layoutMode === 'list' ? 'bg-stone-100 text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                             title="List View"
                           >
                             <List size={20} />
                           </button>
                        </div>
                     </div>

                     {filteredRecipes.length === 0 ? (
                       <div className="flex-1 flex flex-col items-center justify-center text-center text-stone-400 min-h-[400px]">
                          <div className="bg-stone-100 p-6 rounded-full mb-4">
                            <Search size={48} className="opacity-50" />
                          </div>
                          <p className="text-lg font-serif italic mb-2">No recipes found</p>
                          <p className="text-sm">Try adjusting your search or category.</p>
                          {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-sky-600 hover:underline font-bold text-sm">
                              Clear Search
                            </button>
                          )}
                       </div>
                     ) : (
                       <div className={`${layoutMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-3'} pb-20`}>
                          {filteredRecipes.map(recipe => (
                             layoutMode === 'grid' ? (
                               <RecipeCard 
                                 key={recipe.id}
                                 recipe={recipe}
                                 onClick={() => handleRecipeClick(recipe)}
                                 isFavorite={favorites.includes(recipe.id)}
                                 onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
                               />
                             ) : (
                               <RecipeListItem 
                                  key={recipe.id}
                                  recipe={recipe}
                                  onClick={() => handleRecipeClick(recipe)}
                                  isFavorite={favorites.includes(recipe.id)}
                                  onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
                               />
                             )
                          ))}
                       </div>
                     )}
                  </div>
                )}

                {/* Recipe Detail View */}
                {view === 'detail' && selectedRecipe && (
                  <div className="animate-slide-up pb-20">
                     <RecipeDetail 
                       recipe={selectedRecipe} 
                       onBack={() => setView('list')}
                       isFavorite={favorites.includes(selectedRecipe.id)}
                       onToggleFavorite={() => {
                          // Manually toggle because RecipeDetail expects void fn
                          const e = { stopPropagation: () => {} } as React.MouseEvent;
                          toggleFavorite(e, selectedRecipe.id);
                       }}
                       onEdit={() => {
                         setEditingRecipe(selectedRecipe);
                         setShowAddModal(true);
                       }}
                       onDelete={handleDeleteRecipe}
                       onUpdateRecipe={handleUpdateRecipe}
                     />
                  </div>
                )}
             </div>
             
             {/* Toast Notification */}
             {showSuccessToast && (
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-stone-900/90 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-slide-up backdrop-blur-md z-50">
                 <div className="bg-green-500 rounded-full p-1"><Check size={12} strokeWidth={4} /></div>
                 <span className="font-medium">Action completed successfully</span>
               </div>
             )}
          </main>
          
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
               <div className="relative w-64 bg-stone-900 text-stone-300 h-full shadow-2xl animate-slide-right flex flex-col">
                  <div className="p-6 border-b border-stone-800 flex justify-between items-center">
                    <span className="font-serif text-xl text-stone-100">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                      <button 
                        onClick={() => { setView('categories'); setSelectedCategory('All'); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-stone-100"
                      >
                        <LayoutGrid size={18} /> Categories
                      </button>
                      <button 
                        onClick={() => { setView('list'); setSelectedCategory('All'); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-stone-100"
                      >
                        <BookOpen size={18} /> All Recipes
                      </button>
                      <div className="border-t border-stone-800 my-2 pt-2">
                        {Object.values(Category).map(cat => (
                          <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-stone-800 rounded-lg"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <RecipeModal 
          onClose={() => { setShowAddModal(false); setEditingRecipe(null); }} 
          onSave={editingRecipe ? handleUpdateRecipe : handleAddRecipe}
          initialData={editingRecipe || undefined}
        />
      )}
    </div>
  );
};

export default App;
