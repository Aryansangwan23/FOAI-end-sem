import React from 'react';
import { Users, User } from 'lucide-react';
import { useIssStore } from '../../store/useIssStore';

const AstronautsList = () => {
  const { astronauts, isLoading } = useIssStore();

  if (isLoading && astronauts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col items-center justify-center gap-4 text-card-foreground/50">
        <Users className="w-8 h-8 opacity-50" />
        <p>Loading crew data...</p>
      </div>
    );
  }

  // Group by spacecraft
  const grouped = astronauts.reduce((acc, curr) => {
    const craft = curr.craft || 'Unknown';
    if (!acc[craft]) acc[craft] = [];
    acc[craft].push(curr);
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-lg">People in Space</h2>
        </div>
        <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Total: {astronauts.length}
        </span>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        {Object.entries(grouped).map(([craft, crew]) => (
          <div key={craft} className="space-y-3">
            <h3 className="text-sm font-bold text-card-foreground/50 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              {craft}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crew.map((person, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border/50 transition-colors hover:border-indigo-500/30">
                  <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-card-foreground/60 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">{person.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstronautsList;
