import React from 'react';

export default function CustomerTable({ customers, orders }) {
  const spendByEmail = orders.reduce((acc, order) => {
    const email = order.customer?.email;
    if (email) acc[email] = (acc[email] || 0) + order.total;
    return acc;
  }, {});

  const enriched = customers.map(c => ({
    ...c,
    realSpend: spendByEmail[c.email] || 0,
  }));

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th></th>
            <th>Customer</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Orders</th>
            <th>Lifetime Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {enriched.map(c => (
            <tr key={c.id}>
              <td style={{ width:52 }}>
                <div className="cust-avatar">{c.name.charAt(0)}</div>
              </td>
              <td>
                <span style={{ fontWeight:600 }}>{c.name}</span>
              </td>
              <td style={{ color:'var(--muted)', fontSize:12 }}>{c.email}</td>
              <td style={{ color:'var(--muted)', fontSize:12 }}>
                {new Date(c.joined).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}
              </td>
              <td style={{ fontWeight:600, textAlign:'center' }}>{c.orders}</td>
              <td>
                <span style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:15 }}>
                  ${(c.lifetime + c.realSpend).toLocaleString()}
                </span>
              </td>
              <td>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px',
                  borderRadius:999, fontSize:10, fontWeight:700,
                  background:'var(--success-bg)', color:'var(--success)',
                }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'currentColor' }} />
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
