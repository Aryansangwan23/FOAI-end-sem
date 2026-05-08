import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNewsStore } from '../store/useNewsStore';
import { useThemeStore } from '../store/useThemeStore';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const NewsCategoryChart = () => {
  const { articles } = useNewsStore();
  const { theme } = useThemeStore();

  const data = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    
    const sourceCount = {};
    articles.forEach(article => {
      const source = article.source?.name || 'Unknown';
      sourceCount[source] = (sourceCount[source] || 0) + 1;
    });

    return Object.keys(sourceCount)
      .map(source => ({
        name: source,
        value: sourceCount[source]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 sources
  }, [articles]);

  if (data.length === 0) {
    return <div className="h-full flex items-center justify-center text-card-foreground/50">No data available</div>;
  }

  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              borderRadius: '0.5rem',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewsCategoryChart;
