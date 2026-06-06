import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#9a0002','#1a1a1a','#b5a89a','#3d3d3d','#c4a882'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background:'#fff', border:'1px solid #e8dfd6',
        borderRadius:8, padding:'10px 14px', boxShadow:'0 4px 16px rgba(0,0,0,.1)',
      }}>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#7a7068', marginBottom:6 }}>{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ fontSize:14, fontWeight:600, color:p.name === 'revenue' ? '#9a0002' : '#1a1a1a' }}>
            {p.name === 'revenue' ? `$${p.value.toLocaleString()}` : `${p.value} orders`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SalesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top:5, right:10, left:-10, bottom:0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8dfd6" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fontSize:11, fill:'#7a7068', fontWeight:500 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fontSize:11, fill:'#7a7068' }}
          axisLine={false} tickLine={false}
          tickFormatter={v => `$${(v/1000).toFixed(1)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill:'rgba(154,0,2,.05)', radius:4 }} />
        <Bar dataKey="revenue" fill="#9a0002" radius={[4,4,0,0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryChart({ products }) {
  const cats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(cats).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%" cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          formatter={(v) => <span style={{ fontSize:11, color:'#7a7068', fontWeight:500 }}>{v}</span>}
        />
        <Tooltip
          formatter={(value, name) => [value, name]}
          contentStyle={{ borderRadius:8, border:'1px solid #e8dfd6', fontSize:12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
