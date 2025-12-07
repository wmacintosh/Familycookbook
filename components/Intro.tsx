
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

const tartanStyles = {
  backgroundColor: '#cc0000', // MacIntosh Red Base
  backgroundImage: `
    repeating-linear-gradient(90deg, rgba(0, 50, 0, 0.5) 0px, rgba(0, 50, 0, 0.5) 50px, transparent 50px, transparent 110px),
    repeating-linear-gradient(0deg, rgba(0, 50, 0, 0.5) 0px, rgba(0, 50, 0, 0.5) 50px, transparent 50px, transparent 110px),
    
    repeating-linear-gradient(90deg, rgba(0, 0, 80, 0.5) 50px, rgba(0, 0, 80, 0.5) 70px, transparent 70px, transparent 110px),
    repeating-linear-gradient(0deg, rgba(0, 0, 80, 0.5) 50px, rgba(0, 0, 80, 0.5) 70px, transparent 70px, transparent 110px),
    
    repeating-linear-gradient(90deg, transparent 0px, transparent 25px, rgba(255, 215, 0, 0.8) 25px, rgba(255, 215, 0, 0.8) 27px, transparent 27px, transparent 110px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 25px, rgba(255, 215, 0, 0.8) 25px, rgba(255, 215, 0, 0.8) 27px, transparent 27px, transparent 110px)
  `
};

const Intro: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={tartanStyles} className="flex flex-col items-center justify-start min-h-screen w-full relative overflow-y-auto pb-20">
      <div className="absolute inset-0 bg-black/30 fixed"></div>
      
      <div className="relative z-10 bg-stone-50/95 p-8 md:p-16 rounded-sm shadow-2xl max-w-4xl mx-4 text-center border-double border-8 border-stone-800 mt-10 md:mt-20 animate-fade-in">
        {/* Family Crest */}
        <div className="mb-8 flex justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 relative group perspective-1000">
            {!imgError ? (
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Macintosh_Crest.svg/1200px-Macintosh_Crest.svg.png" 
                alt="MacIntosh Family Crest" 
                className="w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:rotate-y-12"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white font-serif text-xs p-4 text-center border-4 border-amber-500">
                MacIntosh Family Crest
              </div>
            )}
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-2 tracking-tight drop-shadow-sm">Shirley’s Kitchen</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-red-900 italic mb-6">Cooking with Nan</h2>
        <p className="font-serif text-lg md:text-xl text-stone-600 mb-10 uppercase tracking-widest border-t-b border-stone-300 py-2 inline-block border-t border-b">
          A Cherished Collection of Recipes Passed Down Through Generations
        </p>
        
        <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed text-justify mb-12 mx-auto max-w-2xl bg-stone-100/50 p-6 rounded-lg border border-stone-200 shadow-inner">
          <p className="mb-4 indent-8">
            My earliest memories of the kitchen are forged links to my Nan, Shirley MacIntosh. It was her domain, a
            sanctuary where she moved with quiet, purposeful grace, her hands perpetually busy, creating magic from
            simple ingredients. This book is a labor of love, a deeply personal compilation of her cherished recipes,
            each one carrying a piece of her spirit, a story waiting to be retold. It’s dedicated with particular affection
            to her daughters, who, like myself, were privileged to learn the art of cooking beside her, absorbing not just
            her techniques but also her quiet wisdom.
          </p>
          <p className="indent-8">
            These recipes are more than mere instructions; they are a tangible connection to her, a way to recreate
            the flavors and the moments that defined our family gatherings, moments that now feel precious and fleeting
            in the passage of time. May each dish you prepare from these pages bring back the warmth of her presence,
            the comfort of her touch, and the joy of the memories we shared, preserving her legacy for generations to
            come. This book is a way to hold on to her, to keep her alive in our kitchens and in our hearts.
          </p>
        </div>

        <div className="mb-8">
          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-teal-800 text-white font-serif text-xl rounded-sm shadow-xl hover:bg-teal-900 hover:-translate-y-1 transition-all duration-300 overflow-hidden ring-1 ring-teal-700/50"
          >
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center gap-3">
              <BookOpen size={24} />
              Enter Kitchen
            </span>
          </button>
        </div>

        <p className="italic text-stone-900 font-bold font-serif text-xl mt-16">
          "The secret ingredient is always love."
        </p>
      </div>
    </div>
  );
};

export default Intro;
