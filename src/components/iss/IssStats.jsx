import React from 'react';
import { MapPin, Navigation, Clock, Activity, Loader2 } from 'lucide-react';
import { useIssStore } from '../../store/useIssStore';

const StatCard = ({ icon: Icon, title, value, subtitle, isLoading }) => (
  <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
    <div className="p-3 bg-primary/10 rounded-xl text-primary">
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-sm font-medium text-card-foreground/60">{title}</p>
      {isLoading ? (
        <div className="h-6 w-24 bg-secondary animate-pulse rounded mt-1"></div>
      ) : (
        <h3 className="text-xl font-bold text-foreground mt-0.5 truncate">{value}</h3>
      )}
      {subtitle && (
        <p className="text-xs text-card-foreground/50 mt-1 truncate">{subtitle}</p>
      )}
    </div>
  </div>
);

const IssStats = () => {
  const { currentPosition, currentSpeed, nearestLocation, history, isLoading } = useIssStore();

  const formattedTime = currentPosition 
    ? new Date(currentPosition.timestamp * 1000).toLocaleTimeString() 
    : '--:--:--';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={Navigation} 
        title="Coordinates" 
        value={currentPosition ? `${currentPosition.latitude.toFixed(2)}°, ${currentPosition.longitude.toFixed(2)}°` : '0.00°, 0.00°'} 
        subtitle="Current Location"
        isLoading={isLoading}
      />
      <StatCard 
        icon={Activity} 
        title="Velocity" 
        value={currentSpeed ? `${currentSpeed.toFixed(0)} km/h` : 'Calculating...'} 
        subtitle="Est. Ground Speed"
        isLoading={isLoading}
      />
      <StatCard 
        icon={MapPin} 
        title="Nearest Area" 
        value={nearestLocation || 'Unknown'} 
        subtitle="Reverse Geocoding"
        isLoading={isLoading}
      />
      <StatCard 
        icon={Clock} 
        title="Last Updated" 
        value={formattedTime} 
        subtitle={`${history.length} positions tracked`}
        isLoading={isLoading}
      />
    </div>
  );
};

export default IssStats;
