import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ label, value, change, changeType, icon: Icon, iconBg, iconColor }) {
  const isUp = changeType === 'up';

  return (
    <div className="stat-card">
      <div className="stat-card__ico" style={{ background: iconBg }}>
        <Icon size={20} color={iconColor} />
      </div>
      <p className="stat-card__label">{label}</p>
      <div className="stat-card__value">{value}</div>
      {change !== undefined && (
        <div className={`stat-card__change stat-card__change--${changeType}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{change}</span>
          <span style={{ color:'var(--muted)', fontWeight:400 }}> vs last month</span>
        </div>
      )}
      <div className="stat-card__bg-ico">
        <Icon size={80} />
      </div>
    </div>
  );
}
