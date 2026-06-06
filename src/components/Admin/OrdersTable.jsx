import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const STATUSES = ['Pending','Processing','Shipped','Delivered','Cancelled'];

export default function OrdersTable({ orders, updateOrderStatus }) {
  const [search,    setSearch]    = useState('');
  const [statusFilter, setFilter] = useState('All');

  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display:'flex', gap:12, marginBottom:18, flexWrap:'wrap' }}>
        <div className="admin-search" style={{ flex:1, minWidth:200 }}>
          <Search size={15} />
          <input
            className="form-input admin-search"
            style={{ paddingLeft:38 }}
            placeholder="Search orders, customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="order-search"
          />
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center', flexWrap:'wrap' }}>
          {['All', ...STATUSES].map(s => (
            <button
              key={s}
              className={`filter-btn ${statusFilter === s ? 'filter-btn--active' : ''}`}
              style={{ padding:'7px 14px', fontSize:10 }}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign:'center', padding:36, color:'var(--muted)' }}>
                  No orders found
                </td>
              </tr>
            ) : (
              filtered.map(order => (
                <tr key={order.id}>
                  <td>
                    <span style={{ fontWeight:700, fontFamily:'monospace', fontSize:12 }}>
                      {order.id}
                    </span>
                  </td>
                  <td>
                    <div>
                      <span style={{ fontWeight:600, display:'block' }}>
                        {order.customer?.name || 'Guest'}
                      </span>
                      <span style={{ fontSize:11, color:'var(--muted)' }}>
                        {order.customer?.email || '—'}
                      </span>
                    </div>
                  </td>
                  <td>{order.items?.length || 0}</td>
                  <td>
                    <span style={{ fontFamily:'var(--font-serif)', fontWeight:600 }}>
                      ${order.total?.toFixed(2)}
                    </span>
                  </td>
                  <td style={{ color:'var(--muted)', fontSize:12 }}>
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month:'short', day:'numeric', year:'numeric',
                    })}
                  </td>
                  <td>
                    <span className={`order-status order-status--${order.status}`}>
                      <span className="status-dot" />
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value)}
                      aria-label={`Change status for order ${order.id}`}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop:14, fontSize:12, color:'var(--muted)' }}>
        Showing {filtered.length} of {orders.length} orders
      </div>
    </div>
  );
}
