import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIssStore } from '../store/useIssStore';
import { useThemeStore } from '../store/useThemeStore';

const IssSpeedChart = () => {
  const { speedHistory } = useIssStore();
  const { theme } = useThemeStore();
  
  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

  if (!speedHistory || speedHistory.length === 0) {
    return <div className="h-full flex items-center justify-center text-card-foreground/50">Collecting speed data...</div>;
  }

  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={speedHistory}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke={textColor} 
            fontSize={12} 
            tickMargin={10} 
            minTickGap={30}
          />
          <YAxis 
            stroke={textColor} 
            fontSize={12} 
            domain={['dataMin - 100', 'dataMax + 100']} 
            tickFormatter={(value) => `${Math.round(value)}`}
            width={50}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value) => [`${Math.round(value)} km/h`, 'Speed']}
          />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#3b82f6', stroke: theme === 'dark' ? '#0f172a' : '#ffffff', strokeWidth: 2 }}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssSpeedChart;
