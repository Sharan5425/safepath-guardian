
import React from 'react';
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  location: [number, number];
  mapZoom: number;
  safetyAreas: Array<{
    id: string;
    name: string;
    rating: number;
    position: [number, number];
    radius: number;
  }>;
  selectedArea: string | null;
  onAreaSelect: (id: string) => void;
}

// Custom marker component to move the map view
const MapController = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
  const map = useMap();
  
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const MapView = ({ location, mapZoom, safetyAreas, selectedArea, onAreaSelect }: MapViewProps) => {
  const getCircleColor = (rating: number) => {
    if (rating >= 80) return '#22c55e';
    if (rating >= 60) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden transition-opacity duration-1000">
      <style>{`
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
      `}</style>
      
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
                  click: () => onAreaSelect(area.id)
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
                  click: () => onAreaSelect(area.id)
                }}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
