
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronDown, Palette, Check, Link } from 'lucide-react';
import { Recipe, Category } from '../types';
import { FAMILY_MEMBERS, OWNER_COLORS, AVATAR_COLORS, getAvatarColor, generateId } from '../data';
import DynamicListInput from './DynamicListInput';

interface RecipeModalProps {
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
  initialData?: Recipe;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ onClose, onSave, initialData }) => {
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

  const handleOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newName = e.target.value;
      setAddedBy(newName);
      // Automatically update color for preset owners
      if (OWNER_COLORS[newName]) {
        setUserColor(OWNER_COLORS[newName]);
      } else {
        // Fallback or keep existing
        setUserColor(getAvatarColor(newName));
      }
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
      id: initialData?.id || generateId(),
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

          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider flex items-center gap-2"><Link size={14}/> Image URL (Optional)</label>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3.5 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none shadow-sm text-stone-600 font-mono text-xs" placeholder="https://..." />
            {imageUrl && (
              <div className="mt-2 h-32 w-full rounded-lg overflow-hidden border border-stone-100 bg-stone-100 relative">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full cursor-pointer hover:bg-white" onClick={() => setImageUrl('')}><X size={12}/></div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Recipe Owner <span className="text-rose-500">*</span></label>
              <div className="relative">
                <select 
                  required 
                  value={addedBy} 
                  onChange={handleOwnerChange} 
                  className="w-full border border-stone-200 rounded-xl p-3.5 bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer shadow-sm appearance-none"
                >
                  <option value="" disabled>Select Family Member</option>
                  {FAMILY_MEMBERS.map(member => <option key={member} value={member}>{member}</option>)}
                </select>
                <div className="absolute right-4 top-4 pointer-events-none text-stone-400">
                  <ChevronDown size={16} />
                </div>
              </div>
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
              <p className="text-[10px] text-stone-400 mt-2 italic">Preset colors are applied automatically for family members.</p>
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

export default RecipeModal;
