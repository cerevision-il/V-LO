import React from 'react';

function getStockLevel(product) {
  const stockObj = product.stock || { S: 10, M: 15, L: 10 }; // Fallback stock if missing
  const vals = Object.values(stockObj);
  const total = vals.reduce((s, v) => s + v, 0);
  const max = vals.length * 20 || 100;
  return { total, pct: Math.min(100, (total / max) * 100) };
}

function stockColor(pct) {
  if (pct > 60) return 'var(--success)';
  if (pct > 25) return 'var(--warning)';
  return 'var(--error)';
}

export default function InventoryPanel({ products }) {
  return (
    <div>
      <div className="inv-grid">
        {products.map(product => {
          const { total, pct } = getStockLevel(product);
          return (
            <div key={product.id} className="inv-item">
              <div className="inv-item__img">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={e => { e.currentTarget.style.display='none'; }}
                />
              </div>
              <div className="inv-item__info">
                <div className="inv-item__name" title={product.name}>
                  {product.name}
                </div>
                <div className="inv-item__bar">
                  <div
                    className="inv-item__fill"
                    style={{ width:`${pct}%`, background: stockColor(pct) }}
                  />
                </div>
                <div className="inv-item__stock">
                  <span style={{ color: stockColor(pct), fontWeight:600 }}>
                    {total} units
                  </span>
                  {' · '}
                  <span style={{ fontSize:10 }}>{product.id}</span>
                </div>
              </div>
              <div style={{ marginLeft:'auto', flexShrink:0 }}>
                <span style={{
                  fontSize:10, fontWeight:700, letterSpacing:'.06em',
                  textTransform:'uppercase', padding:'3px 10px',
                  borderRadius:999, background: pct < 25 ? 'var(--error-bg)' : pct < 60 ? 'var(--warning-bg)' : 'var(--success-bg)',
                  color: pct < 25 ? 'var(--error)' : pct < 60 ? 'var(--warning)' : 'var(--success)',
                }}>
                  {pct < 25 ? 'Low' : pct < 60 ? 'Med' : 'Good'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
