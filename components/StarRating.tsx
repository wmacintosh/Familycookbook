
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating = 0, 
  max = 5, 
  onChange, 
  readonly = false,
  size = 16
}) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={`flex items-center gap-0.5 ${readonly ? '' : 'cursor-pointer'}`}>
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hover || rating);
        
        return (
          <button
            key={index}
            type="button"
            disabled={readonly}
            onClick={() => onChange && onChange(starValue)}
            onMouseEnter={() => !readonly && setHover(starValue)}
            onMouseLeave={() => !readonly && setHover(null)}
            className={`transition-all duration-200 ${!readonly ? 'hover:scale-125' : ''} ${readonly ? 'cursor-default' : ''}`}
          >
            <Star
              size={size}
              className={`${
                isActive 
                  ? 'text-amber-400 fill-amber-400' 
                  : 'text-stone-300 fill-transparent'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
