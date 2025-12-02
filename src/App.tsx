import React, { useState } from 'react';
import { Recipe, Category } from './types';
import { INITIAL_RECIPES } from './data';

// Icons
const ChevronRight = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Plus = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Trash2 = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function App() {
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
  
  // Ingredients & Instructions State
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedBy(e.target.value);
  };

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
    
    // Reset form
    setTitle('');
    setCategory(Category.APPETIZERS);
    setDescription('');
    setPrepTime('');
    setCookTime('');
    setTemp('');
    setYields('');
    setIngredients(['']);
    setInstructions(['']);
    
    alert("Recipe Added Successfully!");
  };

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-800 pb-12">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-rose-500/20 shadow-lg">
              N
            </div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">Nan's Recipes</h1>
          </div>
          <div className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full">
            {recipes.length} recipes collected
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recipe List */}
        <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-700">Recipe Collection</h2>
            </div>
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {recipes.map(recipe => (
                <div key={recipe.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <h3 className="font-bold text-stone-800 group-hover:text-rose-600 transition-colors">{recipe.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                        <span className="bg-stone-50 text-stone-600 px-2 py-1 rounded-md border border-stone-100">{recipe.category}</span>
                        <span>by {recipe.addedBy}</span>
                    </div>
                </div>
            ))}
            </div>
        </div>

        {/* Right Column: Add Recipe Form */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-stone-800">Add New Recipe</h2>
                  <p className="text-stone-500 text-sm mt-1">Share your culinary treasures with the family.</p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Title <span className="text-rose-500">*</span></label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all shadow-sm bg-stone-50 focus:bg-white" placeholder="e.g. Aunt Jean's Brownies" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Category</label>
                  <div className="relative">
                    <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full border border-stone-200 rounded-xl p-3.5 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all cursor-pointer shadow-sm appearance-none">
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
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all shadow-sm bg-stone-50 focus:bg-white resize-none" rows={3} placeholder="A short description or memory about this dish..." />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                 <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Prep Time</label>
                  <input value={prepTime} onChange={e => setPrepTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none shadow-sm bg-stone-50 focus:bg-white" placeholder="15 mins" />
                </div>
                 <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Cook Time</label>
                  <input value={cookTime} onChange={e => setCookTime(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none shadow-sm bg-stone-50 focus:bg-white" placeholder="45 mins" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Oven Temp</label>
                  <input value={temp} onChange={e => setTemp(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none shadow-sm bg-stone-50 focus:bg-white" placeholder="350°F" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Yields</label>
                  <input value={yields} onChange={e => setYields(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none shadow-sm bg-stone-50 focus:bg-white" placeholder="12 serv" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Owner <span className="text-rose-500">*</span></label>
                  <input required value={addedBy} onChange={handleNameChange} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none shadow-sm bg-stone-50 focus:bg-white" placeholder="Your Name" />
                </div>

                <div className="md:col-span-2 space-y-6">
                    {/* Ingredients */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-500 mb-3 tracking-wider flex justify-between items-center">
                            <span>Ingredients</span>
                            <button type="button" onClick={handleAddIngredient} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-1 text-[10px] bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-sm font-bold"><Plus size={12} /> Add Item</button>
                        </label>
                        <div className="space-y-3">
                            {ingredients.map((ing, idx) => (
                                <div key={idx} className="flex gap-2 group">
                                    <div className="flex-1 relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                                        <input value={ing} onChange={e => handleIngredientChange(idx, e.target.value)} className="w-full border border-stone-200 rounded-xl pl-8 p-2.5 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-stone-50 focus:bg-white transition-all" placeholder={`Ingredient ${idx + 1}`} />
                                    </div>
                                    {ingredients.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveIngredient(idx)} className="text-stone-300 hover:text-rose-500 p-2 transition-colors"><Trash2 size={18} /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-500 mb-3 tracking-wider flex justify-between items-center">
                            <span>Instructions</span>
                            <button type="button" onClick={handleAddInstruction} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-1 text-[10px] bg-white border border-stone-200 px-3 py-1.5 rounded-full shadow-sm font-bold"><Plus size={12} /> Add Step</button>
                        </label>
                        <div className="space-y-3">
                            {instructions.map((inst, idx) => (
                                <div key={idx} className="flex gap-3 group">
                                    <span className="text-stone-400 text-xs font-bold pt-3.5 w-6 text-center">{idx + 1}.</span>
                                    <textarea value={inst} onChange={e => handleInstructionChange(idx, e.target.value)} className="flex-1 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-stone-50 focus:bg-white transition-all resize-none" rows={2} placeholder={`Step ${idx + 1}`} />
                                    {instructions.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveInstruction(idx)} className="text-stone-300 hover:text-rose-500 p-2 self-start mt-1 transition-colors"><Trash2 size={18} /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-200">
                <button type="submit" className="w-full bg-stone-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-stone-900/10 active:scale-[0.99]">
                  Save Recipe to Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
