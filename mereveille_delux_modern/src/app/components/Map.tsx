'use client';

import { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Property } from '../../types';

// Fix Leaflet marker icon issue in Next.js
const markerIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = markerIcon;

interface MapProps {
  properties?: Property[];
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  center?: { lat: number; lng: number };
  isSelectable?: boolean;
  height?: string;
}

// Component to handle map events
function MapEvents({ onLocationSelect }: { onLocationSelect?: (location: { lat: number; lng: number }) => void }) {
  const map = useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

const defaultCenter = { lat: -1.292066, lng: 36.821945 }; // Default to Nairobi

const Map = ({ 
  properties = [], 
  onLocationSelect, 
  center = defaultCenter,
  isSelectable = false,
  height = '400px'
}: MapProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    if (isSelectable && onLocationSelect) {
      setSelectedLocation(location);
      onLocationSelect(location);
    }
  }, [isSelectable, onLocationSelect]);

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map click events handler */}
        {isSelectable && <MapEvents onLocationSelect={handleLocationSelect} />}

        {/* Property markers */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{property.name}</h3>
                <p className="text-sm">{property.price}</p>
                <p className="text-xs text-gray-600">{property.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Selected location marker */}
        {isSelectable && selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={L.icon({
              iconUrl: '/marker-selected.png',
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map; 