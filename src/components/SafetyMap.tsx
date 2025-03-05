
import React, { useEffect, useState, useMemo } from 'react';
import { ShieldCheck, AlertTriangle, Navigation, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker component to move the map view
const MapController = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const SafetyMap = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [safetyRating, setSafetyRating] = useState<number>(0);
  const [location, setLocation] = useState<[number, number]>([37.7749, -122.4194]);
  const [mapZoom, setMapZoom] = useState(13);

  // Simulated safety areas (in a real app, these would come from API data)
  const safetyAreas = [
    { id: '1', name: 'Downtown', rating: 85, position: [37.7749, -122.4194] as [number, number], radius: 1000 },
    { id: '2', name: 'Riverside Park', rating: 72, position: [37.7699, -122.4330] as [number, number], radius: 800 },
    { id: '3', name: 'University Area', rating: 92, position: [37.7857, -122.4071] as [number, number], radius: 750 },
    { id: '4', name: 'Shopping District', rating: 78, position: [37.7840, -122.4272] as [number, number], radius: 600 },
  ];

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        () => {
          console.log("User denied geolocation or it's not available");
        }
      );
    }
    
    // Simulate safety rating calculation
    setSafetyRating(Math.floor(Math.random() * 100));
  }, []);

  const handleAreaSelect = (id: string) => {
    setSelectedArea(id);
    const area = safetyAreas.find(area => area.id === id);
    if (area) {
      setSafetyRating(area.rating);
      setLocation(area.position);
      setMapZoom(15);
    }
  };

  const getSafetyColor = (rating: number) => {
    if (rating >= 80) return 'bg-green-500';
    if (rating >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCircleColor = (rating: number) => {
    if (rating >= 80) return '#22c55e';
    if (rating >= 60) return '#eab308';
    return '#ef4444';
  };

  // Create custom CSS classes for markers
  const customMarkerCSS = `
    .user-dot {
      width: 20px;
      height: 20px;
      background-color: #3b82f6;
      border: 2px solid white;
      border-radius: 50%;
    }
    .safety-dot {
      width: 28px;
      height: 28px;
      border: 2px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    }
  `;

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-xl overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full rounded-xl overflow-hidden transition-opacity duration-1000">
        <style>{customMarkerCSS}</style>
        
        <MapContainer 
          center={location} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
        >
          <MapController center={location} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker */}
          <Marker 
            position={location}
            icon={new Icon({
              iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIgZmlsbD0iIzNiODJmNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          />
          
          {/* Safety areas */}
          {safetyAreas.map(area => {
            const circleColor = getCircleColor(area.rating);
            
            return (
              <React.Fragment key={area.id}>
                <Circle 
                  center={area.position}
                  radius={area.radius}
                  pathOptions={{
                    color: circleColor,
                    fillColor: circleColor,
                    fillOpacity: 0.2,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => handleAreaSelect(area.id)
                  }}
                />
                <Marker 
                  position={area.position}
                  icon={new Icon({
                    iconUrl: `data:image/svg+xml;base64,${btoa(`<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="${circleColor}"/><text x="14" y="18" text-anchor="middle" fill="white" font-weight="bold" font-size="12" font-family="Arial">${area.rating}</text></svg>`)}`,
                    iconSize: [28, 28],
                    iconAnchor: [14, 14]
                  })}
                  eventHandlers={{
                    click: () => handleAreaSelect(area.id)
                  }}
                />
              </React.Fragment>
            );
          })}
        </MapContainer>
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
