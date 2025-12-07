
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BookOpen, Search, Plus, LayoutGrid, List, Heart, Check, Menu, Database, ChevronRight, X } from 'lucide-react';
import { Recipe, Category } from './types';
import { INITIAL_RECIPES } from './data';
import Intro from './components/Intro';
import PrintLayout from './components/PrintLayout';
import RecipeCard from './components/RecipeCard';
import RecipeListItem from './components/RecipeListItem';
import CategoryCard from './components/CategoryCard';
import RecipeModal from './components/RecipeModal';
import DataExportModal from './components/DataExportModal';
import RecipeDetail from './components/RecipeDetail';

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
  const [showDataExport, setShowDataExport] = useState(false);
  const [toastMessage, setToastMessage] = useState("Action completed successfully");
  
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

  const showToast = (message: string) => {
    setToastMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleAddRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setShowAddModal(false);
    setSelectedCategory(newRecipe.category);
    setView('list');
    setSearchTerm('');
    showToast("Recipe added successfully");
  };

  const handleUpdateRecipe = (updatedRecipe: Recipe) => {
    const updatedList = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    setRecipes(updatedList);
    setSelectedRecipe(updatedRecipe);
    setEditingRecipe(null);
    setShowAddModal(false);
    showToast("Recipe updated");
  }
  
  const handleDeleteRecipe = () => {
    if (selectedRecipe) {
      const updatedList = recipes.filter(r => r.id !== selectedRecipe.id);
      setRecipes(updatedList);
      setSelectedRecipe(null);
      setView('list');
      showToast("Recipe deleted");
    }
  }

  const handleImportRecipes = (importedRecipes: Recipe[]) => {
    // Merge logic: Update existing IDs, Add new ones.
    const recipeMap = new Map(recipes.map(r => [r.id, r]));
    importedRecipes.forEach(r => recipeMap.set(r.id, r));
    const mergedList = Array.from(recipeMap.values());
    
    setRecipes(mergedList);
    showToast(`${importedRecipes.length} recipes imported successfully`);
  };

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
             <div className="p-4 border-t border-stone-800 bg-stone-950/50 text-xs text-stone-600 text-center flex flex-col gap-2">
                <button 
                  onClick={() => setShowDataExport(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-stone-800 hover:text-stone-400 transition-colors"
                >
                  <Database size={14} /> Data Management
                </button>
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
                 <span className="font-medium">{toastMessage}</span>
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

      {/* Data Export Modal */}
      <DataExportModal 
        isOpen={showDataExport}
        onClose={() => setShowDataExport(false)}
        recipes={recipes}
        onImport={handleImportRecipes}
      />
    </div>
  );
};

export default App;
