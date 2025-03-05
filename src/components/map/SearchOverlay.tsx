
import React from 'react';
import { Search } from 'lucide-react';

const SearchOverlay = () => {
  return (
    <div className="absolute top-4 left-0 right-0 px-4 flex justify-center pointer-events-none">
      <div className="glass rounded-full px-4 py-3 shadow-glass pointer-events-auto w-full max-w-md animate-slide-down">
        <div className="flex items-center">
          <Search className="text-muted-foreground w-5 h-5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search locations..." 
            className="w-full bg-transparent border-none outline-none px-3 py-1 placeholder:text-muted-foreground/70 text-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
