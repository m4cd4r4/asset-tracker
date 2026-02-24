import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { useStore } from '@/store/useStore';
import { LOCATIONS } from '@/types';

function TruncatedTick({ x, y, payload }: { x: number; y: number; payload: { value: string } }) {
  const label = payload.value.length > 14
    ? payload.value.slice(0, 12) + '\u2026'
    : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{payload.value}</title>
      <text x={0} y={0} dy={12} textAnchor="end" fill="#94a3b8" fontSize={10} transform="rotate(-35)">
        {label}
      </text>
    </g>
  );
}

export function InventoryChart() {
  const { assets, currentLocation } = useStore();

  const data = assets.map(a => ({
    name: a.item,
    count: a.newCount,
    threshold: a.threshold,
    isLow: a.newCount < a.threshold,
  }));

  const locationName = LOCATIONS.find(l => l.id === currentLocation)?.name ?? currentLocation;
  const avgThreshold = data.length > 0
    ? Math.round(data.reduce((sum, d) => sum + d.threshold, 0) / data.length)
    : 10;

  if (data.length === 0) return null;

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Stock Levels</h3>
        <span className="text-xs text-muted-foreground">{locationName}</span>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis
              dataKey="name"
              tick={TruncatedTick as any}
              axisLine={{ stroke: 'rgba(148,163,184,0.2)' }}
              tickLine={false}
              interval={0}
              height={50}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
              formatter={(value: unknown, _name: unknown, props: unknown) => {
                const t = (props as { payload?: { threshold?: number } })?.payload?.threshold;
                return [`${value}${t != null ? ` (threshold: ${t})` : ''}`, 'Count'];
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.isLow ? '#f59e0b' : '#3b82f6'}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
            <ReferenceLine
              y={avgThreshold}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{ value: `Avg (${avgThreshold})`, fill: '#ef4444', fontSize: 9, position: 'right' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
