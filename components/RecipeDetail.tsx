
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Trash2, Share2, Printer, Heart, ChefHat, ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Recipe } from '../types';
import { getAvatarColor } from '../data';
import { getApiKey } from '../utils';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateRecipe: (recipe: Recipe) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, isFavorite, onToggleFavorite, onEdit, onDelete, onUpdateRecipe }) => {
  const [tips, setTips] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);
  const [errorTips, setErrorTips] = useState<string | null>(null);
  
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [imageError, setImageError] = useState<string | null>(null);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const badgeColor = getAvatarColor(recipe.addedBy, recipe.userColor);

  // Reset states when recipe changes
  useEffect(() => {
    setTips(null);
    setErrorTips(null);
    setLoadingTips(false);
    setImageError(null);
    setIsGeneratingImage(false);
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
      const text = `${recipe.title}\n\n${recipe.description || ''}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
      navigator.clipboard.writeText(text);
      alert('Recipe copied to clipboard!');
    }
  };

  const getGeminiTips = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setErrorTips("API Key is missing or not configured correctly.");
      return;
    }

    setLoadingTips(true);
    setErrorTips(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
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

  const generateImage = async () => {
    const apiKey = getApiKey();
    if (!apiKey) {
      setImageError("API Key is missing or not configured correctly.");
      return;
    }

    setIsGeneratingImage(true);
    setImageError(null);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Professional food photography of ${recipe.title}. ${recipe.description || ''}. The image should be appetizing, high resolution, with soft natural lighting and elegant plating suitable for a family cookbook.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: imageSize
          }
        },
      });

      // Find the image part in the response
      let base64Image: string | undefined;
      
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Image) {
        const imageUrl = `data:image/png;base64,${base64Image}`;
        // Update recipe with new image
        const updatedRecipe = { ...recipe, imageUrl };
        onUpdateRecipe(updatedRecipe);
      } else {
        setImageError("No image generated. Please try again.");
      }
      
    } catch (e) {
      console.error(e);
      setImageError("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[85vh] shadow-2xl rounded-none md:rounded-2xl overflow-hidden flex flex-col relative animate-fade-in print:shadow-none print:h-auto border border-white/50 ring-1 ring-stone-200/50">
      
      {/* Print Specific Styles */}
      <style>
        {`
          @media print {
            @page { margin: 1.5cm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .print-page-number::after { content: counter(page); }
          }
        `}
      </style>

      {/* Print Header */}
      <div className="hidden print:flex fixed top-0 left-0 w-full justify-between items-center p-8 bg-white z-50 border-b-2 border-stone-800">
         <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-stone-900">Shirley's Kitchen</h1>
         </div>
         <span className="text-stone-500 font-serif italic">{recipe.title}</span>
      </div>

      {/* Print Footer */}
      <div className="hidden print:flex fixed bottom-0 left-0 w-full justify-between items-center p-8 bg-white z-50 border-t border-stone-200 text-xs text-stone-500">
         <span>The MacIntosh Family Cookbook</span>
         <span className="print-page-number">Page </span>
      </div>

      <DeleteConfirmationModal 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete();
        }}
        recipeTitle={recipe.title}
      />

      {/* Header Controls */}
      <div className="absolute top-4 left-4 z-20 print:hidden">
        <button onClick={onBack} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all group">
          <ArrowLeft size={24} className="text-stone-600 group-hover:text-stone-900" />
        </button>
      </div>
      <div className="absolute top-4 right-4 z-20 flex gap-2 print:hidden">
        <button onClick={onEdit} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-white hover:scale-105 transition-all text-stone-600" title="Edit Recipe">
          <Edit2 size={24} />
        </button>
        <button onClick={() => setShowDeleteConfirm(true)} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg border border-white/50 hover:bg-red-50 hover:text-red-500 hover:scale-105 transition-all text-stone-600" title="Delete Recipe">
          <Trash2 size={24} />
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
      <div className={`bg-sky-50 text-center relative overflow-hidden print:bg-white print:p-0 print:border-b-2 print:border-black print:mb-8 transition-all duration-500 print:mt-16 ${recipe.imageUrl ? 'h-[400px] md:h-[500px]' : 'p-8 md:p-16'}`}>
        {recipe.imageUrl ? (
           <div className="absolute inset-0 z-0">
             <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
           </div>
        ) : (
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>
        )}
        
        <div className={`relative z-10 flex flex-col items-center justify-center h-full ${recipe.imageUrl ? 'text-white justify-end pb-12' : 'text-stone-800'}`}>
          <span className={`inline-block px-4 py-1.5 rounded-full border font-serif italic text-sm md:text-base mb-4 backdrop-blur-sm shadow-sm print:hidden ${recipe.imageUrl ? 'bg-black/30 border-white/20 text-white' : 'border-sky-200/60 text-sky-700 bg-white/60'}`}>
            {recipe.category}
          </span>
          <h2 className={`font-serif text-4xl md:text-6xl font-bold mb-4 print:text-black drop-shadow-sm max-w-4xl leading-tight ${recipe.imageUrl ? 'text-white text-shadow-lg' : 'text-stone-800'}`}>{recipe.title}</h2>
          {recipe.description && <p className={`text-lg md:text-xl italic font-serif max-w-2xl mx-auto leading-relaxed print:text-stone-600 ${recipe.imageUrl ? 'text-stone-200' : 'text-stone-500'}`}>"{recipe.description}"</p>}
          
          {/* Metadata Badges */}
          <div className={`flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm font-light print:text-stone-800 ${recipe.imageUrl ? 'text-white' : 'text-stone-600'}`}>
             {recipe.prepTime && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Prep</span>
                 <span className="font-medium">{recipe.prepTime}</span>
               </div>
             )}
             {recipe.cookTime && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Cook</span>
                 <span className="font-medium">{recipe.cookTime}</span>
               </div>
             )}
             {recipe.temp && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Temp</span>
                 <span className="font-medium">{recipe.temp}</span>
               </div>
             )}
             {recipe.yields && (
               <div className={`flex flex-col items-center px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md print:shadow-none print:border-0 ${recipe.imageUrl ? 'bg-black/30 border-white/10' : 'bg-white/50 border-stone-100'}`}>
                 <span className={`font-bold uppercase text-[10px] tracking-widest mb-1 print:text-black ${recipe.imageUrl ? 'text-sky-200' : 'text-sky-700'}`}>Yields</span>
                 <span className="font-medium">{recipe.yields}</span>
               </div>
             )}
          </div>

          {/* Added By Badge */}
          <div className={`mt-8 pt-6 border-t flex justify-center items-center gap-3 print:border-stone-200 ${recipe.imageUrl ? 'border-white/20' : 'border-stone-200/60'}`}>
            <span className={`text-xs uppercase tracking-widest font-bold ${recipe.imageUrl ? 'text-stone-300' : 'text-stone-400'}`}>Recipe Source</span>
            <span className={`pl-2 pr-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm border print:bg-transparent print:text-black print:border print:border-black ${recipe.imageUrl ? 'bg-black/40 border-white/10 text-white' : 'bg-white border-stone-100 text-stone-600'}`}>
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

      <div className="flex-1 p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 print:block print:p-0 bg-white print:mb-16">
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

          {/* Image Generation Controls (Desktop) - Hidden in Print */}
          <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100 print:hidden">
            <h4 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-sky-600" />
              {recipe.imageUrl ? "Update Photo" : "Generate Photo"}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-stone-200">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${imageSize === size ? 'bg-sky-100 text-sky-700 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={generateImage}
                disabled={isGeneratingImage}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isGeneratingImage ? 'bg-stone-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 hover:shadow-sky-200'}`}
              >
                {isGeneratingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <ChefHat size={16} />
                    {recipe.imageUrl ? "Regenerate Photo" : "Create Photo"}
                  </>
                )}
              </button>
              {imageError && <p className="text-xs text-rose-500 mt-2 text-center">{imageError}</p>}
              <p className="text-[10px] text-stone-400 text-center mt-1">Powered by Gemini 3 Pro</p>
            </div>
          </div>

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

export default RecipeDetail;
