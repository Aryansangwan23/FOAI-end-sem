import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useData } from '../context/DataContext';

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e', '#f59e0b', '#10b981'];

export const NewsPieChart = () => {
  const { news } = useData();

  const sourceCount = news.reduce((acc, curr) => {
    const src = curr.source.name || 'Unknown';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(sourceCount).slice(0, 7).map(key => ({
    name: key,
    value: sourceCount[key]
  }));

  if (data.length === 0) return null;

  return (
    <div className="flex items-center gap-3">
      <PieChart width={60} height={60}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={15}
          outerRadius={28}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
          itemStyle={{ color: '#fff' }}
        />
      </PieChart>
      <div className="hidden md:flex flex-wrap gap-x-3 gap-y-1 max-w-[200px]">
        {data.slice(0, 4).map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};
