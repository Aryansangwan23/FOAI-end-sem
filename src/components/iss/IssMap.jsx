import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useIssStore } from '../../store/useIssStore';

// Custom ISS Icon
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className: 'drop-shadow-lg'
});

// Component to handle auto-centering
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const IssMap = () => {
  const { currentPosition, history } = useIssStore();
  const mapRef = useRef(null);

  if (!currentPosition) {
    return (
      <div className="w-full h-full min-h-[400px] bg-secondary animate-pulse rounded-2xl flex items-center justify-center border border-border">
        <span className="text-card-foreground/50">Loading map data...</span>
      </div>
    );
  }

  const positions = history.map(pos => [pos.latitude, pos.longitude]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-border shadow-sm z-0 relative">
      <MapContainer 
        center={[currentPosition.latitude, currentPosition.longitude]} 
        zoom={3} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        ref={mapRef}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {positions.length > 1 && (
          <Polyline positions={positions} color="#ef4444" weight={3} dashArray="5, 10" />
        )}
        
        <Marker position={[currentPosition.latitude, currentPosition.longitude]} icon={issIcon}>
          <Popup className="custom-popup">
            <div className="text-center font-semibold">
              ISS Current Location<br/>
              <span className="text-xs font-normal text-gray-500">
                Lat: {currentPosition.latitude.toFixed(4)}<br/>
                Lon: {currentPosition.longitude.toFixed(4)}
              </span>
            </div>
          </Popup>
        </Marker>
        
        <RecenterAutomatically lat={currentPosition.latitude} lng={currentPosition.longitude} />
      </MapContainer>
    </div>
  );
};

export default IssMap;
