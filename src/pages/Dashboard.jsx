import React, { useEffect } from 'react';
import IssMap from '../components/iss/IssMap';
import IssStats from '../components/iss/IssStats';
import AstronautsList from '../components/iss/AstronautsList';
import IssSpeedChart from '../charts/IssSpeedChart';
import NewsCategoryChart from '../charts/NewsCategoryChart';
import { useIssStore } from '../store/useIssStore';
import { useNewsStore } from '../store/useNewsStore';
import { issService } from '../services/issService';
import { calculateDistance, calculateSpeed } from '../utils/haversine';
import { Activity, Satellite, Newspaper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentPosition, updatePosition, setAstronauts, setNearestLocation, setError, setLoading } = useIssStore();
  const { articles } = useNewsStore();

  useEffect(() => {
    let intervalId;

    const fetchIssData = async () => {
      try {
        const [locationData, astroData] = await Promise.all([
          issService.getCurrentLocation(),
          issService.getPeopleInSpace()
        ]);

        let speed = 0;
        // Access previous state without subscribing
        const prevState = useIssStore.getState();
        const prevPos = prevState.currentPosition;
        
        if (prevPos) {
          const distance = calculateDistance(
            prevPos.latitude, prevPos.longitude,
            locationData.latitude, locationData.longitude
          );
          const timeDiffMs = (locationData.timestamp - prevPos.timestamp) * 1000;
          speed = calculateSpeed(distance, timeDiffMs);
        } else {
           speed = 27600; // Default approx orbital speed if no previous point
        }

        updatePosition(locationData, speed);
        setAstronauts(astroData);
        
        // Reverse geocoding (don't block the main update)
        issService.getNearestLocation(locationData.latitude, locationData.longitude)
          .then(loc => setNearestLocation(loc))
          .catch(console.error);
          
      } catch (error) {
        console.error('Failed to fetch ISS data', error);
      }
    };

    fetchIssData(); // Initial fetch
    intervalId = setInterval(fetchIssData, 15000); // Every 15 seconds

    return () => clearInterval(intervalId);
  }, [updatePosition, setAstronauts, setNearestLocation]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-card-foreground/60 mt-1">Real-time space operations and news intelligence.</p>
        </div>
      </div>

      <IssStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2 relative">
          <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border shadow-sm flex items-center gap-2">
            <Satellite className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Live Trajectory</span>
          </div>
          <IssMap />
        </div>
        <div className="lg:col-span-1">
          <AstronautsList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Orbital Velocity</h2>
            </div>
            <Link to="/analytics" className="text-xs text-primary hover:underline flex items-center gap-1">
              View Analytics <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex-1 min-h-0">
            <IssSpeedChart />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">News Sources</h2>
            </div>
            <Link to="/news" className="text-xs text-primary hover:underline flex items-center gap-1">
              Read News <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex-1 min-h-0">
            <NewsCategoryChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
