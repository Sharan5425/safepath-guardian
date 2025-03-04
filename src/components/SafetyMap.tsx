
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ShieldCheck, AlertTriangle, Navigation, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.75rem'
};

// Default center position
const center = {
  lat: 37.7749,
  lng: -122.4194
};

// Map options
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

const SafetyMap = () => {
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [mapReady, setMapReady] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [safetyRating, setSafetyRating] = useState<number>(0);
  const [location, setLocation] = useState(center);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Setup Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapApiKey || ''
  });

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log("User denied geolocation or it's not available");
        }
      );
    }
    
    // Simulate safety rating calculation
    setSafetyRating(Math.floor(Math.random() * 100));
  }, []);

  // Handle map load 
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    setMapReady(true);
  }, []);

  // Handle map unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Simulated safety areas (in a real app, these would come from API data)
  const safetyAreas = [
    { id: '1', name: 'Downtown', rating: 85, position: { lat: 37.7749, lng: -122.4194 }, radius: 1000 },
    { id: '2', name: 'Riverside Park', rating: 72, position: { lat: 37.7699, lng: -122.4330 }, radius: 800 },
    { id: '3', name: 'University Area', rating: 92, position: { lat: 37.7857, lng: -122.4071 }, radius: 750 },
    { id: '4', name: 'Shopping District', rating: 78, position: { lat: 37.7840, lng: -122.4272 }, radius: 600 },
  ];

  const handleAreaSelect = (id: string) => {
    setSelectedArea(id);
    const area = safetyAreas.find(area => area.id === id);
    if (area) {
      setSafetyRating(area.rating);
      if (map) {
        map.panTo(area.position);
        map.setZoom(15);
      }
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

  // API key input handler
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapApiKey(e.target.value);
    localStorage.setItem('google_maps_api_key', e.target.value);
  };

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('google_maps_api_key');
    if (storedKey) {
      setMapApiKey(storedKey);
    }
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-xl overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full rounded-xl overflow-hidden transition-opacity duration-1000">
        {!mapApiKey && (
          <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center">
            <div className="glass rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-2">Google Maps API Key Required</h3>
              <p className="text-muted-foreground text-sm mb-4">
                To use the safety map, please enter your Google Maps API key:
              </p>
              <input
                type="text"
                value={mapApiKey}
                onChange={handleApiKeyChange}
                placeholder="Enter your Google Maps API key"
                className="w-full bg-background border border-input rounded-md px-3 py-2 mb-4"
              />
              <p className="text-xs text-muted-foreground">
                You can get an API key from the <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
              </p>
            </div>
          </div>
        )}
        
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={14}
            options={options}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* User location marker */}
            <Marker 
              position={location} 
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#3b82f6",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
            
            {/* Safety areas visualization */}
            {safetyAreas.map(area => (
              <React.Fragment key={area.id}>
                <Circle
                  center={area.position}
                  radius={area.radius}
                  options={{
                    strokeColor: getCircleColor(area.rating),
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: getCircleColor(area.rating),
                    fillOpacity: 0.2,
                    clickable: true,
                  }}
                  onClick={() => handleAreaSelect(area.id)}
                />
                <Marker
                  position={area.position}
                  label={{
                    text: area.rating.toString(),
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 14,
                    fillColor: getCircleColor(area.rating),
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                  }}
                  onClick={() => handleAreaSelect(area.id)}
                />
              </React.Fragment>
            ))}
          </GoogleMap>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="flex items-center space-x-1">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          </div>
        )}
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
