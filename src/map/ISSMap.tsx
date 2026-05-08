import  { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../context/DataContext';

const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 30],
  iconAnchor: [25, 15]
});

const RecenterMap = ({ lat, lon }: { lat: number, lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
};

export const ISSMap = () => {
  const { currentISS, issPath } = useData();

  if (!currentISS) return <div className="h-full w-full bg-slate-800 animate-pulse rounded-2xl flex items-center justify-center text-slate-500">Initializing Map...</div>;

  const positions: [number, number][] = issPath.map(p => [p.latitude, p.longitude]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden relative border border-slate-700/50 shadow-xl">
      <MapContainer 
        center={[currentISS.latitude, currentISS.longitude]} 
        zoom={4} 
        style={{ height: '100%', width: '100%', background: '#0f172a' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        />
        {positions.length > 1 && (
          <Polyline positions={positions} color="#06b6d4" weight={3} opacity={0.6} dashArray="5, 10" />
        )}
        <Marker position={[currentISS.latitude, currentISS.longitude]} icon={issIcon} />
        <RecenterMap lat={currentISS.latitude} lon={currentISS.longitude} />
      </MapContainer>
      <div className="absolute top-4 left-4 z-[400] bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs font-mono text-cyan-400">
        Lat: {currentISS.latitude.toFixed(4)} | Lon: {currentISS.longitude.toFixed(4)}
      </div>
    </div>
  );
};
