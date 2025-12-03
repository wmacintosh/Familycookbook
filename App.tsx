import React, { useState } from 'react';
import { Recipe, Category } from './types';
import { INITIAL_RECIPES } from './data';
import { GoogleGenerativeAI } from "@google/genai";
import { 
  BookOpen, 
  ChefHat, 
  Loader2, 
  Sparkles, 
  UtensilsCrossed, 
  Clock, 
  Users, 
  Thermometer,
  Plus,
  Trash2,
  ChevronRight
} from 'lucide-react';

// --- Configuration & Styles ---

// 1. Robust Environment Check
const API_KEY = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.warn("Missing GEMINI_API_KEY. AI features will be disabled.");
}

// Tartan Pattern Style (CSS background)
const tartanStyles = {
  backgroundColor: '#f5f5f4',
  backgroundImage: `
    repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(185, 28, 28, 0.05) 20px, rgba(185, 28, 28, 0.05) 40px),
    repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(12, 74, 110, 0.05) 20px, rgba(12, 74, 110, 0.05) 40px)
  `
};

// --- Components ---

/**
 * Intro Component
 * Fixed: Replaced innerHTML with React state for image error handling.
 * Fixed: Corrected Tailwind classes (border-y, fixed positioning).
 */
const Intro: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div style={tartanStyles} className="flex flex-col items-center justify-start min-h-screen w-full relative overflow-y-auto pb-20">
      {/* Fixed: Use 'fixed' only, removed 'absolute' to prevent conflict */}
      <div className="fixed inset-0 bg-black/30"></div>
      
      <div className="relative z-10 bg-stone-50/95 p-8 md:p-16 rounded-sm shadow-2xl max-w-4xl mx-4 text-center border-double border-8 border-stone-800 mt-10 md:mt-20 animate-fade-in">
        {/* Family Crest */}
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 relative group perspective-1000">
             {!imageError ? (
               <img 
                 src="https://i.imgur.com/imWxO8a.jpeg" 
                 alt="MacIntosh Family Crest" 
                 className="w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:rotate-y-12"
                 onError={() => setImageError(true)} // Fixed: Safe state update
               />
             ) : (
               <div className="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white font-serif text-xs p-4 text-center border-4 border-amber-500">
                 Crest Image
               </div>
             )}
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-2 tracking-tight drop-shadow-sm">Shirley’s Kitchen</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-red-900 italic mb-6">Cooking with Nan</h2>
        
        {/* Fixed: Changed 'border-t-b' to 'border-y' */}
        <p className="font-serif text-lg md:text-xl text-stone-600 mb-10 uppercase tracking-widest border-y border-stone-300 py-2 inline-block">
          A Cherished Collection of Recipes Passed Down Through Generations
        </p>
        
        <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed text-justify mb-12 mx-auto max-w-2xl bg-stone-100/50 p-6 rounded-lg border border-stone-200 shadow-inner">
          <p className="mb-4 indent-8">
            My earliest memories of the kitchen are forged links to my Nan, Shirley MacIntosh. It was her domain, a
            sanctuary where she moved with quiet, purposeful grace, her hands perpetually busy, creating magic from
            simple ingredients. This book is a labor of love, a deeply personal compilation of her cherished recipes,
            each one carrying a piece of her spirit, a story waiting to be retold.
          </p>
          <p className="indent-8">
            These recipes are more than mere instructions; they are a tangible connection to her, a way to recreate
            the flavors and the moments that defined our family gatherings. May each dish you prepare from these pages bring back the warmth of her presence.
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
};

/**
 * Main Application Component
 */
export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.APPETIZERS);
  const [description, setDescription] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [temp, setTemp] = useState('');
  const [yields, setYields] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);

  // AI State
  const [isGeneratingTips, setIsGeneratingTips] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [variations, setVariations] = useState<string>('');
  const [isGeneratingVars, setIsGeneratingVars] = useState(false);

  // --- Helpers ---
  
  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleIngredientChange = (index: number, value: string) => {
    const newIng = [...ingredients];
    newIng[index] = value;
    setIngredients(newIng);
  };
  const handleRemoveIngredient = (index: number) => {
    const newIng = [...ingredients];
    newIng.splice(index, 1);
    setIngredients(newIng);
  };

  const handleAddInstruction = () => setInstructions([...instructions, '']);
  const handleInstructionChange = (index: number, value: string) => {
    const newInst = [...instructions];
    newInst[index] = value;
    setInstructions(newInst);
  };
  const handleRemoveInstruction = (index: number) => {
    const newInst = [...instructions];
    newInst.splice(index, 1);
    setInstructions(newInst);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      category,
      ingredients: ingredients.filter(i => i.trim()),
      instructions: instructions.filter(i => i.trim()),
      yields,
      prepTime,
      cookTime,
      temp,
      description,
      addedBy,
      timestamp: Date.now()
    };
    setRecipes([newRecipe, ...recipes]);
    
    // Reset
    setTitle('');
    setCategory(Category.APPETIZERS);
    setDescription('');
    setPrepTime('');
    setCookTime('');
    setTemp('');
    setYields('');
    setIngredients(['']);
    setInstructions(['']);
    setAddedBy('');
    alert("Recipe Added Successfully!");
  };

  // --- AI Handlers ---

  const generateChefTips = async () => {
    if (!genAI) return alert("AI Service not configured. Check your API Key.");
    const activeIngredients = ingredients.filter(i => i.trim());
    if (activeIngredients.length === 0) return alert("Please add ingredients first!");

    setIsGeneratingTips(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a helpful chef. Given these ingredients: ${activeIngredients.join(', ')}. 
      Write a warm, 2-sentence intro description for this dish, focusing on the flavor profile or nostalgia.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      // Fix: Use method .text()
      const text = response.text(); 
      if (text) setDescription(text);
    } catch (error) {
      console.error("AI Error:", error);
      alert("Failed to generate tips.");
    } finally {
      setIsGeneratingTips(false);
    }
  };

  const generateVariations = async (recipe: Recipe) => {
    if (!genAI) return alert("AI Service not configured.");
    
    setIsGeneratingVars(true);
    setVariations('');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Suggest 3 modern variations (e.g., Gluten Free, Spicy, Vegetarian) for this recipe: ${recipe.title}. 
      Ingredients: ${recipe.ingredients.join(', ')}. 
      Format as a concise bulleted list.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      // Fix: Use method .text()
      const text = response.text();
      setVariations(text || "No variations found.");
    } catch (error) {
      console.error("AI Error:", error);
      setVariations("Could not generate variations at this time.");
    } finally {
      setIsGeneratingVars(false);
    }
  };

  // --- Rendering ---

  if (showIntro) {
    return <Intro onStart={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 pb-12">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-rose-500/20 shadow-lg">
              S
            </div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">Shirley's Kitchen</h1>
          </div>
          <div className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">
            {recipes.length} recipes
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: List */}
            <div className="lg:col-span-4 space-y-4">
                <h2 className="text-lg font-bold text-stone-700">Recipe Collection</h2>
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {recipes.map(recipe => (
                    <div 
                        key={recipe.id} 
                        onClick={() => { setActiveRecipe(recipe); setVariations(''); }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                            activeRecipe?.id === recipe.id 
                            ? "bg-rose-50 border-rose-200 shadow-md" 
                            : "bg-white border-stone-200 shadow-sm hover:shadow-md"
                        }`}
                    >
                        <h3 className={`font-bold transition-colors ${activeRecipe?.id === recipe.id ? "text-rose-700" : "text-stone-800 group-hover:text-rose-600"}`}>
                            {recipe.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                            <span className="bg-stone-100 px-2 py-1 rounded-md">{recipe.category}</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-8">
                {activeRecipe ? (
                    // --- View Recipe Mode ---
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-stone-800">{activeRecipe.title}</h2>
                                <div className="flex items-center gap-4 mt-2 text-sm text-stone-500">
                                    <span className="flex items-center gap-1"><Clock size={14}/> {activeRecipe.cookTime || "N/A"}</span>
                                    <span className="flex items-center gap-1"><Users size={14}/> {activeRecipe.yields || "N/A"}</span>
                                    <span className="flex items-center gap-1"><Thermometer size={14}/> {activeRecipe.temp || "N/A"}</span>
                                </div>
                            </div>
                            <button onClick={() => setActiveRecipe(null)} className="text-stone-400 hover:text-stone-600">
                                <span className="sr-only">Close</span>
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {activeRecipe.description && (
                                <div className="bg-amber-50 p-4 rounded-xl text-stone-700 italic border border-amber-100">
                                    "{activeRecipe.description}"
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2"><UtensilsCrossed size={18} className="text-rose-500"/> Ingredients</h3>
                                    <ul className="space-y-2 text-stone-600 text-sm">
                                        {activeRecipe.ingredients.map((ing, i) => (
                                            <li key={i} className="flex gap-2">
                                                <span className="text-rose-300">•</span> {ing}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2"><ChefHat size={18} className="text-rose-500"/> Instructions</h3>
                                    <div className="space-y-3 text-stone-600 text-sm">
                                        {activeRecipe.instructions.map((inst, i) => (
                                            <div key={i} className="flex gap-3">
                                                <span className="font-bold text-stone-300">{i + 1}.</span>
                                                <p>{inst}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* AI Variations Section */}
                            <div className="pt-6 border-t border-stone-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-stone-800 flex items-center gap-2">
                                        <Sparkles size={18} className="text-amber-500"/> AI Variations
                                    </h3>
                                    <button 
                                        onClick={() => generateVariations(activeRecipe)}
                                        disabled={isGeneratingVars}
                                        className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-full font-bold transition-colors"
                                    >
                                        {isGeneratingVars ? <Loader2 className="animate-spin" size={14}/> : "Generate Ideas"}
                                    </button>
                                </div>
                                {variations && (
                                    <div className="bg-stone-50 p-4 rounded-xl text-sm text-stone-700 whitespace-pre-line border border-stone-200">
                                        {variations}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // --- Add Recipe Mode ---
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                        <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                            <h2 className="text-xl font-bold text-stone-800">Add New Recipe</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-stone-500 mb-2">Title</label>
                                    <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:bg-white outline-none focus:border-rose-500 transition-all" placeholder="Recipe Name" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-stone-500 mb-2">Category</label>
                                    <div className="relative">
                                        <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:bg-white outline-none appearance-none cursor-pointer">
                                            {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronRight size={16} className="absolute right-4 top-4 rotate-90 text-stone-400 pointer-events-none"/>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <label className="block text-xs font-bold uppercase text-stone-500">Description</label>
                                    <button 
                                        type="button"
                                        onClick={generateChefTips}
                                        disabled={isGeneratingTips || ingredients.length <= 1}
                                        className="text-[10px] bg-rose-50 text-rose-600 px-3 py-1 rounded-full font-bold hover:bg-rose-100 transition-colors flex items-center gap-1 disabled:opacity-50"
                                    >
                                        {isGeneratingTips ? <Loader2 className="animate-spin" size={10}/> : <Sparkles size={10}/>} AI Auto-Fill
                                    </button>
                                </div>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 focus:bg-white outline-none focus:border-rose-500 transition-all resize-none" rows={3} placeholder="Share a memory or description..." />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <input value={prepTime} onChange={e => setPrepTime(e.target.value)} className="border border-stone-200 rounded-xl p-3 bg-stone-50 text-sm" placeholder="Prep Time" />
                                <input value={cookTime} onChange={e => setCookTime(e.target.value)} className="border border-stone-200 rounded-xl p-3 bg-stone-50 text-sm" placeholder="Cook Time" />
                                <input value={temp} onChange={e => setTemp(e.target.value)} className="border border-stone-200 rounded-xl p-3 bg-stone-50 text-sm" placeholder="Temp (°F)" />
                                <input value={yields} onChange={e => setYields(e.target.value)} className="border border-stone-200 rounded-xl p-3 bg-stone-50 text-sm" placeholder="Yields" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-xs font-bold uppercase text-stone-500">Ingredients</label>
                                        <button type="button" onClick={handleAddIngredient} className="text-rose-600 text-xs font-bold hover:underline flex items-center gap-1"><Plus size={12}/> Add</button>
                                    </div>
                                    <div className="space-y-2">
                                        {ingredients.map((ing, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input value={ing} onChange={e => handleIngredientChange(i, e.target.value)} className="flex-1 border border-stone-200 rounded-lg p-2 text-sm bg-stone-50" placeholder="Ingredient" />
                                                {ingredients.length > 1 && <button type="button" onClick={() => handleRemoveIngredient(i)} className="text-stone-300 hover:text-rose-500"><Trash2 size={16}/></button>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-xs font-bold uppercase text-stone-500">Instructions</label>
                                        <button type="button" onClick={handleAddInstruction} className="text-rose-600 text-xs font-bold hover:underline flex items-center gap-1"><Plus size={12}/> Add</button>
                                    </div>
                                    <div className="space-y-2">
                                        {instructions.map((inst, i) => (
                                            <div key={i} className="flex gap-2">
                                                <textarea value={inst} onChange={e => handleInstructionChange(i, e.target.value)} className="flex-1 border border-stone-200 rounded-lg p-2 text-sm bg-stone-50 resize-none" rows={1} placeholder="Step..." />
                                                {instructions.length > 1 && <button type="button" onClick={() => handleRemoveInstruction(i)} className="text-stone-300 hover:text-rose-500"><Trash2 size={16}/></button>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <input value={addedBy} onChange={e => setAddedBy(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 bg-stone-50 text-sm" placeholder="Added By (Your Name)" required />

                            <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg">
                                Save Recipe
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
