import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';
import { format } from 'date-fns';

export const SpeedChart = () => {
  const { issPath } = useData();

  const data = issPath.map(p => ({
    time: format(new Date(p.timestamp * 1000), 'HH:mm:ss'),
    speed: Math.round(p.speed)
  }));

  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickMargin={10} />
          <YAxis stroke="#64748b" fontSize={10} domain={['dataMin - 1000', 'dataMax + 1000']} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
            itemStyle={{ color: '#06b6d4' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Line 
            type="monotone" 
            dataKey="speed" 
            stroke="#06b6d4" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4, fill: '#06b6d4' }}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
