
import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BookOpen, Search, Plus, ChefHat, User, Home, UtensilsCrossed, X, Menu, Printer, Check, Heart, Trash2, PlusCircle, Palette, ChevronRight, Edit2, Share2, Clock, Thermometer } from 'lucide-react';
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
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Macintosh_Crest.svg/1200px-Macintosh_Crest.svg.png" 
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
      
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold tracking-widest text-sky-700 uppercase bg-sky-50/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-sky-100/50">{recipe.category}</span>
          <button 
            onClick={onToggleFavorite}
            className={`p-2 rounded-full transition-all duration-300 z-10 ${isFavorite ? 'text-rose-600 bg-rose-50 shadow-inner' : 'text-stone-300 hover:text-rose-500 hover:bg-rose-50 hover:scale-110'}`}
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

const RecipeDetail: React.FC<{ recipe: Recipe; onBack: () => void; isFavorite: boolean; onToggleFavorite: () => void; onEdit: () => void }> = ({ recipe, onBack, isFavorite, onToggleFavorite, onEdit }) => {
  const [tips, setTips] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);
  const [errorTips, setErrorTips] = useState<string | null>(null);

  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  // Reset tips when recipe changes
  useEffect(() => {
    setTips(null);
    setErrorTips(null);
    setLoadingTips(false);
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
      // Fallback for browsers that don't support Web Share API
      const text = `${recipe.title}\n\n${recipe.description || ''}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
      navigator.clipboard.writeText(text);
      alert('Recipe copied to clipboard!');
    }
  };

  const getGeminiTips = async () => {
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

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[85vh] shadow-2xl rounded-none md:rounded-2xl overflow-hidden flex flex-col relative animate-fade-in print:shadow-none print:h-auto border border-white/50 ring-1 ring-stone-200/50">
      {/* Header Controls */}
      <div className="absolute top-4 left-4 z-20 print:hidden">
        <button onClick={onBack} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all group">
          <X size={24} className="text-stone-600 group-hover:text-stone-900" />
        </button>
      </div>
      <div className="absolute top-4 right-4 z-20 flex gap-2 print:hidden">
        <button onClick={onEdit} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Edit Recipe">
          <Edit2 size={24} />
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
      <div className="bg-sky-50 p-8 md:p-16 text-center relative overflow-hidden print:bg-white print:p-0 print:border-b-2 print:border-black print:mb-8">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-sky-200/60 text-sky-700 font-serif italic text-sm md:text-base mb-6 bg-white/60 backdrop-blur-sm shadow-sm print:hidden">
            {recipe.category}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-2 mb-6 text-stone-800 print:text-black drop-shadow-sm">{recipe.title}</h2>
          {recipe.description && <p className="text-stone-500 text-lg md:text-xl italic font-serif max-w-2xl mx-auto leading-relaxed print:text-stone-600">"{recipe.description}"</p>}
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10 text-sm md:text-base text-stone-600 font-light print:text-stone-800">
             {recipe.prepTime && (
               <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/50 border border-stone-100 shadow-sm print:shadow-none print:border-0">
                 <span className="text-sky-700 font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black">Prep</span>
                 <span className="font-medium">{recipe.prepTime}</span>
               </div>
             )}
             {recipe.cookTime && (
               <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/50 border border-stone-100 shadow-sm print:shadow-none print:border-0">
                 <span className="text-sky-700 font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black">Cook</span>
                 <span className="font-medium">{recipe.cookTime}</span>
               </div>
             )}
             {recipe.temp && (
               <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/50 border border-stone-100 shadow-sm print:shadow-none print:border-0">
                 <span className="text-sky-700 font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black">Temp</span>
                 <span className="font-medium">{recipe.temp}</span>
               </div>
             )}
             {recipe.yields && (
               <div className="flex flex-col items-center px-4 py-2 rounded-xl bg-white/50 border border-stone-100 shadow-sm print:shadow-none print:border-0">
                 <span className="text-sky-700 font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black">Yields</span>
                 <span className="font-medium">{recipe.yields}</span>
               </div>
             )}
          </div>

          <div className="mt-10 pt-8 border-t border-stone-200/60 flex justify-center items-center gap-3 print:border-stone-200">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Recipe Source</span>
            <span className="pl-2 pr-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 bg-white shadow-sm text-stone-600 border border-stone-100 print:bg-transparent print:text-black print:border print:border-black">
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
                
                {!tips && !loadingTips && (
                  <div className="text-left">
                      <p className="text-stone-600 mb-8 text-base leading-relaxed max-w-2xl">
                        Want to make this recipe even better? I can suggest substitutions, serving ideas, or technique tips specifically for this dish.
                      </p>
                      <button 
                        onClick={getGeminiTips}
                        className="bg-white border border-sky-200 text-sky-800 px-8 py-4 rounded-xl hover:bg-sky-600 hover:text-white transition-all shadow-sm hover:shadow-lg font-medium flex items-center gap-3 group"
                      >
                        <span className="font-bold tracking-wide">Reveal Chef's Tips</span>
                        <ChefHat size={18} className="group-hover:rotate-12 transition-transform" />
                      </button>
                      {errorTips && <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded border border-red-100">{errorTips}</p>}
                  </div>
                )}

                {loadingTips && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-100 border-t-sky-600 mb-6"></div>
                    <p className="text-stone-500 font-serif italic text-lg animate-pulse">Consulting the cookbook...</p>
                  </div>
                )}

                {tips && (
                  <div className="prose prose-stone text-stone-700 bg-white/80 p-8 rounded-2xl border border-sky-100/50 backdrop-blur-sm shadow-sm">
                      <div className="whitespace-pre-line leading-relaxed italic font-serif text-lg">{tips}</div>
                  </div>
                )}
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
          className="flex-1 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm bg-stone-50 focus:bg-white transition-all"
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

  // Pre-select color based on name if editing or if user typed name
  useEffect(() => {
      if(addedBy && !userColor) {
          setUserColor(getAvatarColor(addedBy));
      }
  }, [addedBy, userColor]);

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
      timestamp: initialData?.timestamp || Date.now()
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
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all shadow-sm" placeholder="e.g. Aunt Jean's Brownies" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Category</label>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full border border-stone-200 rounded-xl p-3.5 bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer shadow-sm appearance-none">
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
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all shadow-sm" rows={3} placeholder="A short description or memory about this dish..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Prep Time</label>
              <input value={prepTime} onChange={e => setPrepTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 15 mins" />
            </div>
             <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Cook Time</label>
              <input value={cookTime} onChange={e => setCookTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 45 mins" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Oven Temp</label>
              <input value={temp} onChange={e => setTemp(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 350°F" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Yields</label>
              <input value={yields} onChange={e => setYields(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="e.g. 12 servings" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Owner <span className="text-rose-500">*</span></label>
              <input required value={addedBy} onChange={e => setAddedBy(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm" placeholder="Who is adding this?" />
            </div>
            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-4 flex items-center gap-2 tracking-wider"><Palette size={14}/> Owner Avatar Color</label>
              <div className="flex gap-4 flex-wrap">
                {AVATAR_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setUserColor(color)}
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
  const [view, setView] = useState<'intro' | 'list' | 'detail'>('intro');
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
    setView('list');
    window.scrollTo(0,0);
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('detail');
    window.scrollTo(0,0);
    setIsSearchFocused(false);
    setSearchTerm('');
  };

  const handleAddRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setShowAddModal(false);
    setSelectedCategory(newRecipe.category);
    setSearchTerm('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    const updatedList = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    setRecipes(updatedList);
    setSelectedRecipe(updatedRecipe);
    setEditingRecipe(null);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  }

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

  if (isPrinting) {
    return <PrintLayout recipes={recipes} onExit={() => setIsPrinting(false)} />;
  }

  if (view === 'intro') {
    return <Intro onStart={handleStart} />;
  }

  if (view === 'detail' && selectedRecipe) {
    return (
      <div className="bg-sky-50 min-h-screen p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-100 via-sky-50 to-sky-100">
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={() => setView('list')} 
          isFavorite={favorites.includes(selectedRecipe.id)}
          onToggleFavorite={() => toggleFavorite({ stopPropagation: () => {} } as any, selectedRecipe.id)}
          onEdit={() => setEditingRecipe(selectedRecipe)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-sky-50 font-sans text-stone-800">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/90 backdrop-blur-md text-stone-800 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm border-b border-stone-200">
        <h1 className="font-serif text-xl">Shirley's Kitchen</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-0 z-20 w-80 transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-sky-200/50
        md:relative md:translate-x-0 md:block md:shadow-none
        bg-gradient-to-b from-sky-50 via-white to-sky-50
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
          <div className="hidden md:block mb-8 text-center cursor-pointer group" onClick={() => setView('intro')}>
             <div className="w-20 h-20 mx-auto bg-white rounded-full border-4 border-white shadow-lg mb-4 flex items-center justify-center text-sky-700 group-hover:scale-105 transition-transform overflow-hidden">
               {/* Small Crest in Sidebar */}
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Macintosh_Crest.svg/1200px-Macintosh_Crest.svg.png" className="w-full h-full object-cover" alt="Crest" />
             </div>
             <h1 className="font-serif text-2xl text-stone-800 tracking-wide drop-shadow-sm">Shirley's Kitchen</h1>
             <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest font-bold">Est. 2023</p>
          </div>

          <nav className="space-y-2 flex-1 px-2">
            <button 
               onClick={() => { setSelectedCategory('All'); setMobileMenuOpen(false); }}
               className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden
                 ${selectedCategory === 'All' 
                   ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_16px_rgb(0,0,0,0.04)] text-sky-800 border border-white/60 font-bold' 
                   : 'text-stone-600 hover:bg-white/40 hover:text-sky-700 hover:shadow-sm'}`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${selectedCategory === 'All' ? 'bg-sky-100 text-sky-700' : 'bg-sky-50 group-hover:bg-white'}`}>
                <Home size={18} />
              </div>
              <span className="relative z-10">All Recipes</span>
            </button>

            <button 
               onClick={() => { setSelectedCategory('Favorites'); setMobileMenuOpen(false); }}
               className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden
                 ${selectedCategory === 'Favorites' 
                   ? 'bg-white/80 backdrop-blur-md shadow-[0_8px_16px_rgb(0,0,0,0.04)] text-rose-800 border border-white/60 font-bold' 
                   : 'text-stone-600 hover:bg-white/40 hover:text-rose-700 hover:shadow-sm'}`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${selectedCategory === 'Favorites' ? 'bg-rose-100 text-rose-600' : 'bg-sky-50 group-hover:bg-white'}`}>
                <Heart size={18} className={selectedCategory === 'Favorites' ? 'fill-current' : ''} />
              </div>
              <span className="relative z-10">Favorites</span>
            </button>

            <div className="pt-8 pb-3 pl-4">
              <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                <div className="h-px w-4 bg-stone-300"></div>
                Categories
              </h3>
            </div>
            
            <div className="space-y-1">
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-between group
                    ${selectedCategory === cat 
                      ? 'bg-white shadow-sm text-sky-700 font-bold border border-stone-100 translate-x-1' 
                      : 'text-stone-500 hover:text-sky-600 hover:bg-white/50'}`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>}
                </button>
              ))}
            </div>
          </nav>

          <div className="mt-auto space-y-4 pt-8 px-2">
             <button
               onClick={() => { setIsPrinting(true); setMobileMenuOpen(false); }}
               className="w-full text-left px-4 py-3 rounded-xl text-sm text-stone-500 hover:text-stone-800 hover:bg-white/50 flex items-center gap-3 transition-colors border border-transparent hover:border-stone-100"
             >
               <Printer size={16} /> Print Cookbook
             </button>

             <button 
                onClick={() => { setShowAddModal(true); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-br from-sky-700 to-sky-800 hover:from-sky-600 hover:to-sky-700 text-white px-4 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-sky-900/30 hover:-translate-y-0.5 group relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl"></div>
               <div className="bg-white/20 p-1 rounded-full relative z-10"><Plus size={18} /></div>
               <span className="font-bold tracking-wide relative z-10">Contribute Recipe</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto h-screen scroll-smooth relative">
        {/* Background Ambient Light */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8),_rgba(255,255,255,0)_70%)] mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto pb-20 relative z-10">
          {/* Search Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-sky-200/60 pb-8">
             <div>
                <h2 className="font-serif text-5xl text-stone-800 mb-3 tracking-tight drop-shadow-sm">
                  {selectedCategory === 'All' ? 'Recipe Collection' : selectedCategory}
                </h2>
                <p className="text-stone-500 text-lg font-light">
                  {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
                </p>
             </div>
             
             <div className="relative w-full md:w-96 group z-30">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search className="text-stone-400 group-hover:text-sky-500 transition-colors" size={20} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search recipes, ingredients..." 
                 value={searchTerm}
                 onFocus={() => setIsSearchFocused(true)}
                 onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="block w-full pl-12 pr-10 py-4 bg-white border border-stone-200 rounded-2xl leading-5 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm group-hover:shadow-md"
               />
               {searchTerm && (
                 <button 
                   onClick={() => setSearchTerm('')}
                   className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
                 >
                   <X size={16} />
                 </button>
               )}

               {/* Search Suggestions */}
               {isSearchFocused && searchTerm.trim() && searchSuggestions.length > 0 && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden animate-slide-up-fade">
                   {searchSuggestions.map(suggestion => (
                     <button
                       key={suggestion.id}
                       onMouseDown={() => handleRecipeClick(suggestion)}
                       className="w-full text-left px-4 py-3 hover:bg-sky-50 transition-colors text-sm text-stone-700 flex items-center gap-2"
                     >
                       <Search size={14} className="text-stone-400" />
                       {suggestion.title}
                     </button>
                   ))}
                 </div>
               )}
             </div>
          </div>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={() => handleRecipeClick(recipe)} 
                  isFavorite={favorites.includes(recipe.id)}
                  onToggleFavorite={(e) => toggleFavorite(e, recipe.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 text-stone-400 bg-white/50 rounded-[2rem] border-2 border-dashed border-stone-200 backdrop-blur-sm">
              <div className="bg-sky-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={48} className="opacity-30 text-stone-500" />
              </div>
              <p className="text-3xl font-serif text-stone-600 mb-2">No recipes found.</p>
              <p className="text-stone-500 max-w-md mx-auto">Try adjusting your search terms, selecting a different category, or add your own recipe to the collection!</p>
              {selectedCategory === 'Favorites' && (
                <button onClick={() => setSelectedCategory('All')} className="mt-8 px-6 py-3 bg-sky-50 text-sky-700 rounded-xl font-bold hover:bg-sky-100 transition-colors">
                  Browse all recipes
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <RecipeModal 
          onClose={() => setShowAddModal(false)} 
          onSave={handleAddRecipe} 
        />
      )}
      
      {editingRecipe && (
        <RecipeModal
          initialData={editingRecipe}
          onClose={() => setEditingRecipe(null)}
          onSave={handleUpdateRecipe}
        />
      )}

      {showSuccessToast && (
        <div className="fixed bottom-10 right-10 bg-white border border-stone-100 text-stone-800 p-1 rounded-2xl shadow-2xl flex items-center gap-4 z-50 animate-slide-up-fade">
          <div className="bg-sky-500 text-white p-3 rounded-xl shadow-lg shadow-sky-500/30">
            <Check size={24} />
          </div>
          <div className="pr-6 py-2">
            <p className="font-serif font-bold text-lg text-stone-800">Recipe Saved</p>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">Collection Updated</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
