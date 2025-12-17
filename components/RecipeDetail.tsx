
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Edit2, Trash2, Share2, Printer, Heart, ChefHat, 
  ImageIcon, Settings, Volume2, Search, ExternalLink, 
  ChevronRight, Star, Sparkles, Lightbulb
} from 'lucide-react';
import { Recipe } from '../types';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import StarRating from './StarRating';

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
  const [showImageSettings, setShowImageSettings] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  
  const [isReading, setIsReading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ text: string, links: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setTips(null);
    setErrorTips(null);
    setLoadingTips(false);
    setImageError(null);
    setIsGeneratingImage(false);
    setSearchResults(null);
    setSearchQuery('');
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [recipe.id]);

  const initializeGenAI = async () => {
    const { GoogleGenAI } = await import("@google/genai");
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  };

  const handleAIError = async (e: any, setError: (msg: string) => void) => {
    console.error(e);
    if (e.message?.includes("Requested entity was not found")) {
       setError("API configuration error. Please ensure your key is correct.");
       const aistudio = (window as any).aistudio;
       if (aistudio) await aistudio.openSelectKey();
    } else {
      setError("AI service unavailable.");
    }
  };

  const getGeminiTips = async () => {
    setLoadingTips(true);
    setErrorTips(null);
    try {
      const ai = await initializeGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a warm, professional chef who specializes in family heirlooms. 
                   Provide 3 short, expert tips for making "${recipe.title}" perfectly. 
                   Context ingredients: ${recipe.ingredients.join(', ')}.
                   Also, suggest one "Nan's Secret Twist" (a modern or unique ingredient addition) that would elevate this specific dish.
                   Format the output with clear headers.`,
      });
      setTips(response.text || "I couldn't come up with any specific tips right now, dear.");
    } catch (e: any) {
      handleAIError(e, setErrorTips);
    } finally {
      setLoadingTips(false);
    }
  };

  const searchSubstitutions = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults(null);
    try {
      const ai = await initializeGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I'm cooking "${recipe.title}" and I need help with: ${searchQuery}. Provide ingredient substitutions or advice.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      
      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSearchResults({ text: response.text || "I couldn't find an answer.", links });
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const generateImage = async () => {
    setIsGeneratingImage(true);
    setImageError(null);
    try {
      const ai = await initializeGenAI();
      const prompt = `Gourmet food photography of ${recipe.title}. ${recipe.description || ''}. 8k, natural lighting, rustic kitchen setting.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9", imageSize: imageSize } },
      });

      let base64Image: string | undefined;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) { base64Image = part.inlineData.data; break; }
        }
      }

      if (base64Image) {
        onUpdateRecipe({ ...recipe, imageUrl: `data:image/png;base64,${base64Image}` });
      } else {
        setImageError("No image returned.");
      }
    } catch (e: any) {
      handleAIError(e, setImageError);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const readRecipe = async () => {
    if (isReading) return;
    setIsReading(true);
    try {
      const ai = await initializeGenAI();
      const textToRead = `Recipe for ${recipe.title}. Ingredients: ${recipe.ingredients.join('. ')}. Method: ${recipe.instructions.join('. ')}`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this recipe naturally and warmly: ${textToRead}` }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const decode = (base64: string) => {
          const binaryString = atob(base64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
          return bytes;
        };

        const data = decode(base64Audio);
        const dataInt16 = new Int16Array(data.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsReading(false);
        source.start();
      }
    } catch (e) {
      console.error(e);
      setIsReading(false);
    }
  };

  const handleRatingChange = (newRating: number) => {
    onUpdateRecipe({ ...recipe, rating: newRating });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-[85vh] shadow-2xl rounded-none md:rounded-2xl overflow-hidden flex flex-col relative animate-fade-in print:shadow-none print:h-auto border border-stone-200">
      <div className="absolute top-4 right-4 z-20 flex gap-2 print:hidden">
        <button onClick={readRecipe} disabled={isReading} title="Listen to Recipe" className={`bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg hover:scale-105 transition-all ${isReading ? 'text-teal-600 animate-pulse' : 'text-stone-600'}`}>
          <Volume2 size={24} />
        </button>
        <button onClick={onEdit} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg hover:scale-105 transition-all text-stone-600"><Edit2 size={24} /></button>
        <button onClick={() => setShowDeleteConfirm(true)} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg hover:text-red-500 hover:scale-105 transition-all text-stone-600"><Trash2 size={24} /></button>
        <button onClick={() => window.print()} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg hover:scale-105 transition-all text-stone-600"><Printer size={24} /></button>
        <button onClick={onToggleFavorite} className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105 bg-white/80 ${isFavorite ? 'text-rose-500' : 'text-stone-400'}`}>
          <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20 print:hidden">
         <button onClick={onBack} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-lg hover:scale-105 transition-all text-stone-600"><ArrowLeft size={24} /></button>
      </div>

      <DeleteConfirmationModal 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={() => { setShowDeleteConfirm(false); onDelete(); }}
        recipeTitle={recipe.title}
      />

      <div className={`bg-stone-50 text-center relative overflow-hidden transition-all duration-500 ${recipe.imageUrl ? 'h-[400px] md:h-[500px]' : 'p-8 md:p-16'}`}>
        {recipe.imageUrl ? (
           <div className="absolute inset-0 z-0"><img src={recipe.imageUrl} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div></div>
        ) : (
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/food.png')] pointer-events-none"></div>
        )}
        <div className={`relative z-10 flex flex-col items-center justify-center h-full ${recipe.imageUrl ? 'text-white justify-end pb-12' : 'text-stone-800'}`}>
           <span className="inline-block px-4 py-1.5 rounded-full border font-serif italic text-sm mb-4 backdrop-blur-sm shadow-sm">{recipe.category}</span>
           <h2 className="font-serif text-4xl md:text-6xl font-bold mb-2">{recipe.title}</h2>
           
           <div className="mb-4 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Rate:</span>
              <StarRating rating={recipe.rating || 0} onChange={handleRatingChange} size={20} />
           </div>

           {recipe.description && <p className={`text-xl italic font-serif max-w-2xl mx-auto opacity-90`}>"{recipe.description}"</p>}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 bg-white">
         <div className="md:col-span-4 border-r border-stone-100 pr-8">
            <h3 className="font-serif text-2xl text-stone-800 border-b-2 border-teal-100 pb-3 mb-6">Ingredients</h3>
            <ul className="space-y-4 text-stone-600">
               {recipe.ingredients.map((ing, i) => (
                 <li key={i} className="flex gap-4 items-start p-2 hover:bg-teal-50 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-200 mt-2.5 flex-shrink-0"></div>
                    <span className="font-medium text-stone-700">{ing}</span>
                 </li>
               ))}
            </ul>

            <div className="mt-12 p-6 bg-stone-50 rounded-2xl border border-stone-100 print:hidden">
               <div className="flex justify-between items-center mb-4">
                 <h4 className="font-bold text-stone-700 flex items-center gap-2"><ImageIcon size={18} className="text-teal-600"/> Recipe Photo</h4>
                 <button onClick={() => setShowImageSettings(!showImageSettings)} className="text-stone-400 hover:text-stone-600"><Settings size={16}/></button>
               </div>
               {showImageSettings && (
                 <div className="mb-4 bg-white p-3 rounded-lg border border-stone-200 text-xs animate-scale-in">
                    <label className="block font-bold text-stone-500 mb-2">Resolution</label>
                    <div className="flex gap-2">
                       {['1K', '2K', '4K'].map((size) => (
                         <button key={size} onClick={() => setImageSize(size as any)} className={`flex-1 py-1.5 rounded border ${imageSize === size ? 'bg-teal-100 border-teal-300 text-teal-800' : 'bg-stone-50 border-stone-200 text-stone-600'}`}>{size}</button>
                       ))}
                    </div>
                 </div>
               )}
               <button onClick={generateImage} disabled={isGeneratingImage} className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isGeneratingImage ? 'bg-stone-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}`}>
                  {isGeneratingImage ? "Designing..." : `Generate High-Res (${imageSize})`}
               </button>
               {imageError && <p className="text-xs text-red-500 mt-2">{imageError}</p>}
            </div>

            <div className="mt-8 p-6 bg-white border border-stone-200 rounded-2xl shadow-inner print:hidden">
               <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2"><Search size={18} className="text-teal-600"/> Substitutions</h4>
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={searchQuery} 
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && searchSubstitutions()}
                   placeholder="e.g. replace eggs?" 
                   className="flex-1 bg-stone-100 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                 />
                 <button onClick={searchSubstitutions} disabled={isSearching} className="bg-stone-800 text-white p-2 rounded-lg hover:bg-stone-900 transition-colors">
                    {isSearching ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : <ChevronRight size={18}/>}
                 </button>
               </div>
               {searchResults && (
                 <div className="mt-4 animate-fade-in">
                   <p className="text-xs text-stone-700 leading-relaxed bg-teal-50 p-3 rounded-lg border border-teal-100">{searchResults.text}</p>
                   {searchResults.links.length > 0 && (
                     <div className="mt-2 flex flex-wrap gap-2">
                       {searchResults.links.map((chunk: any, i) => (
                         chunk.web && (
                           <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-600 px-2 py-1 rounded flex items-center gap-1">
                             <ExternalLink size={10}/> {chunk.web.title}
                           </a>
                         )
                       ))}
                     </div>
                   )}
                 </div>
               )}
            </div>
         </div>

         <div className="md:col-span-8">
            {/* AI Kitchen Wisdom Section - Moved higher for visibility */}
            <div className="mb-12 bg-[#fdfbf7] rounded-3xl p-8 border-2 border-dashed border-teal-100 print:hidden relative overflow-hidden shadow-sm group">
               <div className="absolute -right-4 -top-4 text-teal-50 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                  <ChefHat size={120}/>
               </div>
               
               <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="bg-teal-600 p-3 rounded-2xl text-white shadow-lg animate-bounce-slow">
                        <Lightbulb size={24}/>
                     </div>
                     <div>
                        <h4 className="font-serif text-2xl text-stone-800 font-bold">Kitchen Wisdom</h4>
                        <p className="text-[10px] text-teal-600 uppercase font-black tracking-[0.2em]">Consulting Chef Gemini</p>
                     </div>
                  </div>
                  {!tips && !loadingTips && (
                    <button 
                      onClick={getGeminiTips} 
                      className="bg-white border-2 border-teal-600 text-teal-700 px-6 py-2 rounded-full hover:bg-teal-600 hover:text-white transition-all shadow-md font-bold flex items-center gap-2 group/btn"
                    >
                      Ask for Tips <Sparkles size={16} className="group-hover/btn:rotate-12 transition-transform"/>
                    </button>
                  )}
               </div>

               {loadingTips && (
                 <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-100 border-t-teal-600"></div>
                      <Sparkles className="absolute inset-0 m-auto text-teal-500 animate-pulse" size={20}/>
                    </div>
                    <p className="text-stone-500 italic font-serif">"Let's see what Shirley would suggest..."</p>
                 </div>
               )}

               {tips && (
                  <div className="animate-scale-in relative z-10">
                    <div className="prose prose-stone text-stone-700 bg-white/60 p-6 rounded-2xl border border-teal-50 relative whitespace-pre-line leading-relaxed shadow-inner italic font-serif text-lg">
                       {tips}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button onClick={getGeminiTips} className="text-xs text-teal-600 hover:underline font-bold flex items-center gap-1">
                        <RotateCcw size={12}/> Refresh Wisdom
                      </button>
                    </div>
                  </div>
               )}
               {errorTips && (
                 <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2 relative z-10">
                    <AlertTriangle size={18}/>
                    <p className="text-sm font-medium">{errorTips}</p>
                 </div>
               )}
            </div>

            <h3 className="font-serif text-2xl text-stone-800 border-b-2 border-teal-100 pb-3 mb-8">Method</h3>
            <ol className="space-y-8 text-stone-600">
               {recipe.instructions.map((step, i) => (
                 <li key={i} className="flex gap-6 group">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-stone-50 border border-stone-100 text-teal-700 font-serif font-bold text-xl flex items-center justify-center group-hover:bg-teal-50 group-hover:scale-110 transition-all">{i + 1}</span>
                    <p className="mt-1 text-lg text-stone-700 leading-relaxed">{step}</p>
                 </li>
               ))}
            </ol>
         </div>
      </div>
    </div>
  );
};

// Simple rotation helper for the UI
const RotateCcw = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

const AlertTriangle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);

export default RecipeDetail;
