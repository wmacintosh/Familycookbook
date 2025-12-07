
import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface DynamicListInputProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  label: string;
}

const DynamicListInput: React.FC<DynamicListInputProps> = ({ items, onChange, placeholder, label }) => {
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

export default DynamicListInput;
