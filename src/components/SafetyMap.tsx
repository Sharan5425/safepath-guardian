
import React, { useEffect, useState } from 'react';
import MapView from './map/MapView';
import SearchOverlay from './map/SearchOverlay';
import SafetyRatingCard from './map/SafetyRatingCard';
import { SafetyArea } from './map/types';

const SafetyMap = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [safetyRating, setSafetyRating] = useState<number>(0);
  const [location, setLocation] = useState<[number, number]>([37.7749, -122.4194]);
  const [mapZoom, setMapZoom] = useState(13);

  // Simulated safety areas (in a real app, these would come from API data)
  const safetyAreas: SafetyArea[] = [
    { id: '1', name: 'Downtown', rating: 85, position: [37.7749, -122.4194], radius: 1000 },
    { id: '2', name: 'Riverside Park', rating: 72, position: [37.7699, -122.4330], radius: 800 },
    { id: '3', name: 'University Area', rating: 92, position: [37.7857, -122.4071], radius: 750 },
    { id: '4', name: 'Shopping District', rating: 78, position: [37.7840, -122.4272], radius: 600 },
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

  // Get the selected area name for display in the rating card
  const selectedAreaName = selectedArea
    ? safetyAreas.find(area => area.id === selectedArea)?.name
    : null;

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] rounded-xl overflow-hidden">
      <MapView 
        location={location}
        mapZoom={mapZoom}
        safetyAreas={safetyAreas}
        selectedArea={selectedArea}
        onAreaSelect={handleAreaSelect}
      />
      <SearchOverlay />
      <SafetyRatingCard 
        safetyRating={safetyRating}
        selectedAreaName={selectedAreaName}
      />
    </div>
  );
};

export default SafetyMap;
