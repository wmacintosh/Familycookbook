
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, BookOpen, Heart, Database, Menu, Search, X, Plus, Printer } from 'lucide-react';
import { Category } from '../types';
import DataExportModal from './DataExportModal';
import RecipeModal from './RecipeModal';
import PrintLayout from './PrintLayout';
import { useRecipes } from '../context/RecipeContext';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDataExport, setShowDataExport] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const { recipes, importRecipes, addRecipe } = useRecipes();
  const navigate = useNavigate();

  if (isPrintMode) {
    return <PrintLayout recipes={recipes} onExit={() => setIsPrintMode(false)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-stone-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-stone-900 text-stone-300 border-r border-stone-800 z-20 shadow-xl">
         <div className="p-6 border-b border-stone-800">
            <h1 className="font-serif text-2xl text-stone-100 mb-1">Shirley’s Kitchen</h1>
            <p className="text-xs text-stone-500 uppercase tracking-widest">Family Cookbook</p>
         </div>

         <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
            <NavLink 
              to="/categories" 
              className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-sky-900/50 text-white shadow-inner border border-sky-800/50' : 'hover:bg-stone-800 hover:text-white'}`}
            >
              <LayoutGrid size={18} /> <span className="font-medium">Categories</span>
            </NavLink>
            
            <NavLink 
              to="/recipes" 
              className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-stone-800 text-white shadow-inner' : 'hover:bg-stone-800 hover:text-white'}`}
            >
              <BookOpen size={18} /> <span className="font-medium">All Recipes</span>
            </NavLink>
            
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-rose-900/30 text-rose-100 shadow-inner border border-rose-900/50' : 'hover:bg-stone-800 hover:text-white'}`}
            >
              <Heart size={18} /> <span className="font-medium">Favorites</span>
            </NavLink>

            <button 
              onClick={() => setIsPrintMode(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-stone-800 hover:text-white mt-1"
            >
              <Printer size={18} /> <span className="font-medium">Print Cookbook</span>
            </button>

            <div className="pt-6 mt-6 border-t border-stone-800">
              <h3 className="px-4 text-xs font-bold uppercase tracking-widest text-stone-600 mb-3">Categories</h3>
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  onClick={() => navigate(`/recipes?category=${encodeURIComponent(cat)}`)}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors truncate"
                >
                  {cat}
                </button>
              ))}
            </div>
         </nav>
         
         <div className="p-4 border-t border-stone-800 bg-stone-950/50 text-xs text-stone-600 text-center flex flex-col gap-2">
            <button onClick={() => setShowDataExport(true)} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-stone-800 hover:text-stone-400 transition-colors">
              <Database size={14} /> Data Management
            </button>
            <p>&copy; 2024 MacIntosh Family</p>
         </div>
      </aside>

      {/* Mobile Header & Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
         <header className="bg-white border-b border-stone-200 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 z-10 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-4 flex-1">
               <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg">
                  <Menu size={24} />
               </button>
               
               <div 
                 onClick={() => navigate('/recipes')}
                 className="relative w-full max-w-xl group cursor-pointer"
               >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                     <Search size={18} />
                  </div>
                  <div className="w-full pl-10 pr-4 py-2.5 bg-stone-100 border border-transparent rounded-xl text-stone-500 text-sm">
                    Search recipes...
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setShowAddModal(true)}
              className="ml-4 bg-stone-900 hover:bg-stone-800 text-white p-2.5 md:px-5 md:py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Plus size={20} /> <span className="hidden md:inline font-medium">Add Recipe</span>
            </button>
         </header>

         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 scroll-smooth relative">
            <Outlet />
         </div>

         {/* Mobile Menu */}
         {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
               <div className="relative w-64 bg-stone-900 text-stone-300 h-full shadow-2xl animate-scale-in flex flex-col">
                  <div className="p-6 border-b border-stone-800 flex justify-between items-center">
                    <span className="font-serif text-xl text-stone-100">Menu</span>
                    <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                  </div>
                  <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                      <NavLink to="/categories" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800">
                        <LayoutGrid size={18} /> Categories
                      </NavLink>
                      <NavLink to="/recipes" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800">
                        <BookOpen size={18} /> All Recipes
                      </NavLink>
                      <NavLink to="/favorites" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800">
                        <Heart size={18} /> Favorites
                      </NavLink>
                      <button 
                        onClick={() => { setIsPrintMode(true); setMobileMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-left"
                      >
                        <Printer size={18} /> Print Cookbook
                      </button>
                  </nav>
               </div>
            </div>
         )}
      </main>

      {/* Modals */}
      <DataExportModal 
        isOpen={showDataExport}
        onClose={() => setShowDataExport(false)}
        recipes={recipes}
        onImport={importRecipes}
      />
      
      {showAddModal && (
        <RecipeModal 
          onClose={() => setShowAddModal(false)}
          onSave={(r) => { addRecipe(r); setShowAddModal(false); }}
        />
      )}
    </div>
  );
};

export default Layout;
