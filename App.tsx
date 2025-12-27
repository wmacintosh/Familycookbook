
import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RecipeProvider, useRecipes } from './context/RecipeContext';
import { Category } from './types';
import { FAMILY_MEMBERS } from './data';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Intro from './components/Intro';
import RecipeCard from './components/RecipeCard';
import RecipeListItem from './components/RecipeListItem';
import CategoryCard from './components/CategoryCard';
import RecipeDetail from './components/RecipeDetail';
import RecipeModal from './components/RecipeModal';
import StarRating from './components/StarRating';
import { ResetDataButton } from './components/ResetDataButton';
import { LayoutGrid, List, Search, ArrowUpDown, Clock, Calendar, Type, Star, Filter, X, RotateCcw, User, Ban, PlusCircle } from 'lucide-react';

// --- Page Components ---

const CategoriesPage: React.FC = () => {
  const { recipes } = useRecipes();
  const navigate = useNavigate();

  return (
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
              onClick={() => navigate(`/recipes?category=${encodeURIComponent(cat)}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

type SortKey = 'title' | 'date' | 'time' | 'rating';
type SortDirection = 'asc' | 'desc';

const RecipeListPage: React.FC = () => {
  const { recipes, favorites, toggleFavorite } = useRecipes();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const navigate = useNavigate();

  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Advanced Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxTime, setMaxTime] = useState<number>(Infinity);
  const [selectedOwner, setSelectedOwner] = useState<string>('All');
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [exclusionInput, setExclusionInput] = useState('');

  // Helper to parse cook time strings for sorting/filtering
  const parseTime = (timeStr?: string): number => {
    if (!timeStr) return Infinity;
    const lower = timeStr.toLowerCase();
    const num = parseFloat(lower.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return Infinity;

    if (lower.includes('hour') || lower.includes('hr')) {
      return num * 60;
    }
    return num;
  };

  const filteredRecipes = useMemo(() => {
    const base = recipes.filter(r => {
      // Category check
      const matchCat = categoryFilter ? r.category === categoryFilter : true;

      // Text search check (Title, Ingredients, Description)
      const matchSearch = searchTerm
        ? r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;

      // Rating filter check
      const matchRating = (r.rating || 0) >= minRating;

      // Time filter check
      const rTime = parseTime(r.cookTime);
      const matchTime = maxTime === Infinity ? true : rTime <= maxTime;

      // Owner filter check
      const matchOwner = selectedOwner === 'All' ? true : r.addedBy === selectedOwner;

      // Ingredient Exclusion (Missing ingredients) check
      // If any excluded ingredient is found in the recipe, filter it out
      const matchExclusion = excludedIngredients.length === 0
        ? true
        : !excludedIngredients.some(ex =>
          r.ingredients.some(ing => ing.toLowerCase().includes(ex.toLowerCase()))
        );

      return matchCat && matchSearch && matchRating && matchTime && matchOwner && matchExclusion;
    });

    return base.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortKey === 'date') {
        comparison = a.timestamp - b.timestamp;
      } else if (sortKey === 'time') {
        comparison = parseTime(a.cookTime) - parseTime(b.cookTime);
      } else if (sortKey === 'rating') {
        comparison = (a.rating || 0) - (b.rating || 0);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [recipes, categoryFilter, searchTerm, sortKey, sortDirection, minRating, maxTime, selectedOwner, excludedIngredients]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const resetFilters = () => {
    setMinRating(0);
    setMaxTime(Infinity);
    setSearchTerm('');
    setSelectedOwner('All');
    setExcludedIngredients([]);
  };

  const addExclusion = () => {
    if (exclusionInput.trim() && !excludedIngredients.includes(exclusionInput.trim())) {
      setExcludedIngredients([...excludedIngredients, exclusionInput.trim()]);
      setExclusionInput('');
    }
  };

  const removeExclusion = (ing: string) => {
    setExcludedIngredients(excludedIngredients.filter(i => i !== ing));
  };

  const activeFiltersCount =
    (minRating > 0 ? 1 : 0) +
    (maxTime !== Infinity ? 1 : 0) +
    (searchTerm ? 1 : 0) +
    (selectedOwner !== 'All' ? 1 : 0) +
    (excludedIngredients.length > 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center mb-6 gap-4">
        <div className="w-full lg:w-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
            {categoryFilter || 'All Recipes'}
          </h2>
          {categoryFilter && (
            <button
              onClick={() => navigate('/recipes')}
              className="text-xs text-sky-600 font-bold uppercase tracking-widest mt-1 hover:text-sky-800 flex items-center gap-1"
            >
              <X size={12} /> Clear Category
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <div className="relative group flex-1">
              <Search className="absolute left-3 top-2.5 text-stone-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search title or ingredients..."
                className="pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-lg focus:ring-2 focus:ring-sky-100 outline-none w-full md:w-64 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-2 ${showFilters || activeFiltersCount > 0 ? 'bg-sky-600 text-white border-sky-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}`}
              title="Advanced Filters"
            >
              <Filter size={18} />
              {activeFiltersCount > 0 && <span className="bg-white text-sky-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
            </button>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200 shadow-sm">
            <button
              onClick={() => toggleSort('title')}
              className={`p-2 rounded flex items-center gap-1.5 transition-colors ${sortKey === 'title' ? 'bg-sky-50 text-sky-700' : 'text-stone-400 hover:bg-stone-50'}`}
              title="Sort by Title"
            >
              <Type size={18} />
              {sortKey === 'title' && <ArrowUpDown size={12} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
            </button>
            <button
              onClick={() => toggleSort('rating')}
              className={`p-2 rounded flex items-center gap-1.5 transition-colors ${sortKey === 'rating' ? 'bg-sky-50 text-sky-700' : 'text-stone-400 hover:bg-stone-50'}`}
              title="Sort by Rating"
            >
              <Star size={18} />
              {sortKey === 'rating' && <ArrowUpDown size={12} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
            </button>
            <button
              onClick={() => toggleSort('date')}
              className={`p-2 rounded flex items-center gap-1.5 transition-colors ${sortKey === 'date' ? 'bg-sky-50 text-sky-700' : 'text-stone-400 hover:bg-stone-50'}`}
              title="Sort by Date Added"
            >
              <Calendar size={18} />
              {sortKey === 'date' && <ArrowUpDown size={12} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
            </button>
            <button
              onClick={() => toggleSort('time')}
              className={`p-2 rounded flex items-center gap-1.5 transition-colors ${sortKey === 'time' ? 'bg-sky-50 text-sky-700' : 'text-stone-400 hover:bg-stone-50'}`}
              title="Sort by Cook Time"
            >
              <Clock size={18} />
              {sortKey === 'time' && <ArrowUpDown size={12} className={sortDirection === 'desc' ? 'rotate-180' : ''} />}
            </button>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200 shadow-sm">
            <button onClick={() => setLayoutMode('grid')} className={`p-2 rounded transition-colors ${layoutMode === 'grid' ? 'bg-stone-100 text-stone-800' : 'text-stone-400 hover:bg-stone-50'}`}><LayoutGrid size={20} /></button>
            <button onClick={() => setLayoutMode('list')} className={`p-2 rounded transition-colors ${layoutMode === 'list' ? 'bg-stone-100 text-stone-800' : 'text-stone-400 hover:bg-stone-50'}`}><List size={20} /></button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-md animate-scale-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Rating Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5"><Star size={12} /> Min Rating</label>
            <div className="flex items-center gap-4">
              <StarRating rating={minRating} onChange={setMinRating} size={20} />
              {minRating > 0 && <span className="text-xs font-bold text-amber-600">{minRating}+</span>}
            </div>
          </div>

          {/* Time Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5"><Clock size={12} /> Max Cook Time</label>
            <select
              value={maxTime.toString()}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-100 transition-all text-sm font-medium"
            >
              <option value={Infinity.toString()}>Any Duration</option>
              <option value="15">Under 15 minutes</option>
              <option value="30">Under 30 minutes</option>
              <option value="45">Under 45 minutes</option>
              <option value="60">Under 1 hour</option>
              <option value="120">Under 2 hours</option>
            </select>
          </div>

          {/* Family Member Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5"><User size={12} /> Family Member</label>
            <select
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-100 transition-all text-sm font-medium"
            >
              <option value="All">All Members</option>
              {FAMILY_MEMBERS.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>

          {/* Ingredient Exclusion (Missing ingredients) Filter */}
          <div className="flex flex-col gap-2 lg:col-span-1">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5"><Ban size={12} /> Exclude (Missing)</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={exclusionInput}
                onChange={(e) => setExclusionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addExclusion()}
                placeholder="e.g. Eggs"
                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-sky-100"
              />
              <button
                onClick={addExclusion}
                className="p-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors"
              >
                <PlusCircle size={16} />
              </button>
            </div>
            {excludedIngredients.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {excludedIngredients.map(ing => (
                  <span key={ing} className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100 flex items-center gap-1 animate-scale-in">
                    {ing}
                    <button onClick={() => removeExclusion(ing)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-stone-400 hover:text-rose-500 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors p-2"
            >
              <RotateCcw size={14} /> Reset Filters
            </button>
          </div>
        </div>
      )}

      <div className={`${layoutMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-3'}`}>
        {filteredRecipes.map(recipe => (
          layoutMode === 'grid' ? (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
            />
          ) : (
            <RecipeListItem
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
            />
          )
        ))}
        {filteredRecipes.length === 0 && (
          <div className="text-stone-500 italic col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300 flex flex-col items-center gap-4">
            <div className="bg-stone-50 p-6 rounded-full text-stone-200">
              <Search size={48} />
            </div>
            <div className="max-w-xs">
              <p className="font-serif text-xl text-stone-800 not-italic mb-1">No matches found</p>
              <p className="text-sm">We couldn't find any recipes matching your current search and filters.</p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-bold hover:bg-stone-800 transition-all"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FavoritesPage: React.FC = () => {
  const { recipes, favorites, toggleFavorite } = useRecipes();
  const navigate = useNavigate();
  const favRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20">
      <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            isFavorite={true}
            onToggleFavorite={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
          />
        ))}
        {favRecipes.length === 0 && <p className="text-stone-500 italic col-span-full text-center py-10">No favorites yet. Heart some recipes!</p>}
      </div>
    </div>
  );
};

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams();
  const { recipes, favorites, toggleFavorite, deleteRecipe, updateRecipe } = useRecipes();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) return <div className="text-center py-20 text-stone-500 font-serif text-xl">Recipe not found</div>;

  return (
    <div className="animate-slide-up pb-20">
      <RecipeDetail
        recipe={recipe}
        onBack={() => navigate(-1)}
        isFavorite={favorites.includes(recipe.id)}
        onToggleFavorite={() => toggleFavorite(recipe.id)}
        onEdit={() => setIsEditing(true)}
        onDelete={() => { deleteRecipe(recipe.id); navigate('/recipes'); }}
        onUpdateRecipe={updateRecipe}
      />
      {isEditing && (
        <RecipeModal
          initialData={recipe}
          onClose={() => setIsEditing(false)}
          onSave={(updated) => { updateRecipe(updated); setIsEditing(false); }}
        />
      )}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RecipeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntroWrapper />} />
            <Route element={<Layout />}>
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/recipes" element={<RecipeListPage />} />
              <Route path="/recipes/:id" element={<RecipeDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ResetDataButton />
      </RecipeProvider>
    </ErrorBoundary>
  );
};

// Wrapper to handle Intro logic with Router
const IntroWrapper = () => {
  const navigate = useNavigate();
  return <Intro onStart={() => navigate('/categories')} />;
};

export default App;
