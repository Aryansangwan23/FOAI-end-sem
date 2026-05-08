import React from 'react';
import IssSpeedChart from '../charts/IssSpeedChart';
import NewsCategoryChart from '../charts/NewsCategoryChart';
import { Activity, PieChart } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-card-foreground/60 mt-1">Data visualization for current metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">ISS Orbital Velocity</h2>
              <p className="text-xs text-card-foreground/50">Historical speed tracking over the last 30 intervals</p>
            </div>
          </div>
          <div className="flex-1 min-h-0 bg-secondary/20 rounded-xl p-4 border border-border/50">
            <IssSpeedChart />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">News Source Distribution</h2>
              <p className="text-xs text-card-foreground/50">Breakdown of active articles by publisher</p>
            </div>
          </div>
          <div className="flex-1 min-h-0 bg-secondary/20 rounded-xl p-4 border border-border/50 flex items-center justify-center">
            <NewsCategoryChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
