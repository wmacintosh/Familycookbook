
import React, { useState, useRef } from 'react';
import { X, Database, Download, Upload, FileJson, Check, Copy } from 'lucide-react';
import { Recipe } from '../types';

interface DataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  onImport: (recipes: Recipe[]) => void;
}

const DataExportModal: React.FC<DataExportModalProps> = ({ isOpen, onClose, recipes, onImport }) => {
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  if (!isOpen) return null;

  const dataStr = `export const INITIAL_RECIPES: Recipe[] = ${JSON.stringify(recipes, null, 2)};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(recipes, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shirleys_kitchen_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          // Validate at least one item looks like a recipe
          if (parsed.length > 0 && (!parsed[0].id || !parsed[0].title)) {
             alert("Invalid file format: Data does not appear to be a list of recipes.");
             return;
          }
          if (window.confirm(`Found ${parsed.length} recipes. Import and merge them into your cookbook?`)) {
             onImport(parsed);
             onClose();
          }
        } else {
          alert("Invalid file format: Expected an array of recipes.");
        }
      } catch (err) {
        console.error(err);
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full h-[85vh] flex flex-col transform transition-all animate-scale-in border border-stone-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <div className="bg-sky-100 p-3 rounded-full text-sky-600"><Database size={24} /></div>
             <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Data Management</h3>
                <p className="text-xs text-stone-500 uppercase tracking-widest">Backup, Restore & Export</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500"><X size={24} /></button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
               <div className="bg-white p-2 rounded-full shadow-sm text-sky-600"><Download size={24}/></div>
               <div>
                 <h4 className="font-bold text-stone-800">Backup Recipes</h4>
                 <p className="text-xs text-stone-500 mt-1">Download your cookbook as a JSON file.</p>
               </div>
               <button onClick={handleDownloadJson} className="mt-auto w-full py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-bold transition-colors">Download JSON</button>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
               <div className="bg-white p-2 rounded-full shadow-sm text-amber-600"><Upload size={24}/></div>
               <div>
                 <h4 className="font-bold text-stone-800">Restore Recipes</h4>
                 <p className="text-xs text-stone-500 mt-1">Import recipes from a JSON file.</p>
               </div>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".json" 
                  className="hidden" 
               />
               <button onClick={() => fileInputRef.current?.click()} className="mt-auto w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-bold transition-colors">Import JSON</button>
            </div>
        </div>

        <div className="border-t border-stone-200 pt-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-3">
             <FileJson size={16} className="text-stone-400"/>
             <h4 className="font-bold text-stone-700 text-sm uppercase tracking-wide">Developer Code Export</h4>
          </div>
          <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 mb-4 text-xs text-stone-600">
            <p>To permanently save changes to the source code (for Vercel deployment), copy the code below and replace <code>INITIAL_RECIPES</code> in <code>App.tsx</code>.</p>
          </div>

          <div className="flex-1 bg-stone-900 rounded-xl p-4 overflow-hidden flex flex-col relative group">
             <textarea 
               readOnly
               className="w-full h-full bg-transparent text-stone-300 font-mono text-xs resize-none outline-none custom-scrollbar"
               value={dataStr}
             />
             <button 
               onClick={handleCopy}
               className="absolute top-4 right-4 bg-white/10 hover:bg-white text-white hover:text-stone-900 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border border-white/20"
             >
               {copied ? <Check size={14} /> : <Copy size={14} />}
               {copied ? 'Copied!' : 'Copy Code'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportModal;
