import React from 'react';
import IssMap from '../components/iss/IssMap';
import IssStats from '../components/iss/IssStats';
import AstronautsList from '../components/iss/AstronautsList';
import { Satellite } from 'lucide-react';

const IssTracker = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ISS Tracker</h1>
          <p className="text-card-foreground/60 mt-1">Live telemetry and crew information.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-sm font-semibold">Live Connection</span>
        </div>
      </div>

      <IssStats />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-[600px] relative">
          <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border shadow-sm flex items-center gap-2">
            <Satellite className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Global View</span>
          </div>
          <IssMap />
        </div>
        <div className="lg:col-span-1 h-[600px]">
          <AstronautsList />
        </div>
      </div>
    </div>
  );
};

export default IssTracker;
