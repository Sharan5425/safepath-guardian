
import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, Navigation, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SafetyMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [safetyRating, setSafetyRating] = useState<number>(0);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate safety rating calculation
      setSafetyRating(Math.floor(Math.random() * 100));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulated safety areas (in a real app, these would come from API data)
  const safetyAreas = [
    { id: '1', name: 'Downtown', rating: 85 },
    { id: '2', name: 'Riverside Park', rating: 72 },
    { id: '3', name: 'University Area', rating: 92 },
    { id: '4', name: 'Shopping District', rating: 78 },
  ];

  const handleAreaSelect = (id: string) => {
    setSelectedArea(id);
    const area = safetyAreas.find(area => area.id === id);
    if (area) {
      setSafetyRating(area.rating);
    }
  };

  const getSafetyColor = (rating: number) => {
    if (rating >= 80) return 'bg-green-500';
    if (rating >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-xl overflow-hidden">
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className={cn(
          "w-full h-full rounded-xl overflow-hidden transition-opacity duration-1000",
          isLoading ? "opacity-50" : "opacity-100"
        )}
      >
        {/* Placeholder for actual map */}
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          ) : (
            <span className="text-muted-foreground">Map will be integrated here</span>
          )}
        </div>
      </div>

      {/* Controls Overlay */}
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

      {/* Safety Rating Card */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
        <div className="glass rounded-xl p-4 shadow-glass w-full max-w-md mx-4 pointer-events-auto animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-lg">Safety Assessment</h3>
            <div className={cn(
              "text-xs font-medium py-1 px-2 rounded-full", 
              safetyRating >= 80 ? "bg-green-100 text-green-800" : 
              safetyRating >= 60 ? "bg-yellow-100 text-yellow-800" : 
              "bg-red-100 text-red-800"
            )}>
              {selectedArea ? safetyAreas.find(area => area.id === selectedArea)?.name : "Current Location"}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-sm">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold",
                getSafetyColor(safetyRating)
              )}>
                {safetyRating}%
              </div>
            </div>
            <div>
              <div className="font-medium">
                {safetyRating >= 80 ? "Very Safe Area" : 
                 safetyRating >= 60 ? "Relatively Safe" : 
                 "Exercise Caution"}
              </div>
              <div className="text-sm text-muted-foreground">
                {safetyRating >= 80 ? (
                  "High safety rating based on recent data"
                ) : safetyRating >= 60 ? (
                  "Moderate safety with some concerns"
                ) : (
                  "Lower than average safety rating"
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg py-2 px-3 transition-colors">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Routes</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg py-2 px-3 transition-colors">
              <Navigation className="w-4 h-4" />
              <span>Navigate</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg py-2 px-3 transition-colors">
              <AlertTriangle className="w-4 h-4" />
              <span>Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
