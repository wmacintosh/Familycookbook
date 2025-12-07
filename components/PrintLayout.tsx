
import React from 'react';
import { Printer } from 'lucide-react';
import { Recipe } from '../types';

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

export default PrintLayout;
