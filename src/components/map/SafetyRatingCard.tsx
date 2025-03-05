
import React from 'react';
import { ShieldCheck, AlertTriangle, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SafetyRatingCardProps {
  safetyRating: number;
  selectedAreaName: string | null;
}

const SafetyRatingCard = ({ safetyRating, selectedAreaName }: SafetyRatingCardProps) => {
  const getSafetyColor = (rating: number) => {
    if (rating >= 80) return 'bg-green-500';
    if (rating >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
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
            {selectedAreaName || "Current Location"}
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
  );
};

export default SafetyRatingCard;
