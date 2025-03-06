
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  name: string;
  position: [number, number];
}

interface SearchOverlayProps {
  onSearch: (query: string) => void;
  onSelectResult: (result: SearchResult) => void;
  results: SearchResult[];
  isSearching: boolean;
}

const SearchOverlay = ({ onSearch, onSelectResult, results, isSearching }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowResults(true);
    }
  };

  // Handle clicking outside of results to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear search
  const handleClearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <div className="absolute top-4 left-0 right-0 px-4 flex justify-center z-10">
      <div className="glass rounded-full px-4 py-2 shadow-glass w-full max-w-md animate-slide-down">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center">
            <Search className="text-muted-foreground w-5 h-5 flex-shrink-0" />
            <Input 
              type="text" 
              value={query}
              onChange={handleSearchChange}
              placeholder="Search locations..." 
              className="w-full bg-transparent border-none outline-none px-3 py-1 placeholder:text-muted-foreground/70 text-foreground"
            />
            {query && (
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Search Results */}
          {showResults && results.length > 0 && (
            <div 
              ref={resultsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg max-h-64 overflow-y-auto z-20"
            >
              <div className="p-2">
                {isSearching ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="loading-dot mx-1"></div>
                    <div className="loading-dot mx-1"></div>
                    <div className="loading-dot mx-1"></div>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {results.map((result) => (
                      <li key={result.id}>
                        <button
                          className="flex items-center w-full text-left px-3 py-2 hover:bg-accent rounded-md transition-colors"
                          onClick={() => {
                            onSelectResult(result);
                            setShowResults(false);
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4 text-primary" />
                          <span>{result.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchOverlay;
