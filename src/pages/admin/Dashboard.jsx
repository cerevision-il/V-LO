import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingCart, Package, Users, Settings as SettingsIcon,
  TrendingUp, DollarSign, ShoppingBag, BarChart2, Bell,
  Menu, X, ExternalLink, LogOut, RefreshCw,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import StatCard        from '../../components/Admin/StatCard';
import { SalesChart, CategoryChart } from '../../components/Admin/SalesChart';
import OrdersTable     from '../../components/Admin/OrdersTable';
import InventoryPanel  from '../../components/Admin/InventoryPanel';
import CustomerTable   from '../../components/Admin/CustomerTable';

const VIEWS = [
  { id:'overview',   label:'Overview',   Icon:LayoutDashboard },
  { id:'orders',     label:'Orders',     Icon:ShoppingCart    },
  { id:'inventory',  label:'Inventory',  Icon:Package         },
  { id:'customers',  label:'Customers',  Icon:Users           },
  { id:'settings',   label:'Settings',   Icon:SettingsIcon    },
];

function AdminSidebar({ view, setView, orders, mobileSidebarOpen, setMobileSidebarOpen }) {
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="mobile-menu__backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
          style={{ zIndex:49 }}
        />
      )}
      <aside
        className={`admin-sidebar ${mobileSidebarOpen ? 'admin-sidebar--mobile-open' : ''}`}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="admin-sidebar__logo">
          <img src="/logo.png" alt="VÉLO logo" />
          <div>
            <span className="admin-sidebar__velo">VÉLO</span>
            <span className="admin-sidebar__sub">Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <div className="admin-sidebar__section">
          <div className="admin-sidebar__sec-label">Management</div>
          {VIEWS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`admin-nav-item ${view === id ? 'admin-nav-item--active' : ''}`}
              onClick={() => { setView(id); setMobileSidebarOpen(false); }}
              id={`admin-nav-${id}`}
            >
              <Icon size={16} />
              {label}
              {id === 'orders' && pendingCount > 0 && (
                <span className="admin-nav-item__badge">{pendingCount}</span>
              )}
            </button>
          ))}
        </div>

        <div className="admin-sidebar__spacer" />

        <div className="admin-sidebar__footer">
          <Link
            to="/home"
            className="admin-nav-item"
            style={{ textDecoration:'none' }}
          >
            <ExternalLink size={15} /> Storefront
          </Link>
          <button
            className="admin-nav-item"
            style={{ color:'rgba(255,255,255,.35)' }}
            onClick={() => {}}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Settings() {
  const [notifs,    setNotifs]    = useState(true);
  const [autoFulfil,setAutoFulfil] = useState(false);
  const [darkMode,  setDarkMode]  = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const Toggle = ({ id, checked, onChange }) => (
    <label className="toggle">
      <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  );

  return (
    <div>
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Notifications</h3>
          {[
            { label:'New Order Alerts', desc:'Notify on every new order', key:'notifs', val:notifs, set:setNotifs },
            { label:'Analytics Reports', desc:'Weekly performance reports', key:'analytics', val:analytics, set:setAnalytics },
          ].map(r => (
            <div key={r.key} className="settings-row">
              <div>
                <label htmlFor={`toggle-${r.key}`} style={{ display:'block', fontWeight:600, fontSize:13, cursor:'pointer' }}>{r.label}</label>
                <p>{r.desc}</p>
              </div>
              <Toggle id={`toggle-${r.key}`} checked={r.val} onChange={r.set} />
            </div>
          ))}
        </div>
        <div className="settings-card">
          <h3>Operations</h3>
          {[
            { label:'Auto-Fulfillment', desc:'Auto-advance orders to Shipped', key:'autoFulfil', val:autoFulfil, set:setAutoFulfil },
            { label:'Dark Mode', desc:'Experimental dark theme', key:'darkMode', val:darkMode, set:setDarkMode },
          ].map(r => (
            <div key={r.key} className="settings-row">
              <div>
                <label htmlFor={`toggle-${r.key}`} style={{ display:'block', fontWeight:600, fontSize:13, cursor:'pointer' }}>{r.label}</label>
                <p>{r.desc}</p>
              </div>
              <Toggle id={`toggle-${r.key}`} checked={r.val} onChange={r.set} />
            </div>
          ))}
        </div>
        <div className="settings-card" style={{ gridColumn:'1/-1' }}>
          <h3>Store Information</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:4 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="store-name">Store Name</label>
              <input id="store-name" className="form-input" defaultValue="VÉLO &amp; VINTAGE" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="store-email">Contact Email</label>
              <input id="store-email" type="email" className="form-input" defaultValue="hello@velo-vintage.com" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="store-currency">Currency</label>
              <select id="store-currency" className="form-select"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="store-tz">Timezone</label>
              <select id="store-tz" className="form-select"><option>UTC-5 (Eastern)</option><option>UTC+1 (Central European)</option><option>UTC+9 (Tokyo)</option></select>
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop:20 }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { products, orders, customers, salesData, updateOrderStatus } = useStore();
  const [view,              setView]              = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const totalRevenue   = orders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingCount   = orders.filter(o => o.status === 'Pending').length;
  const avgOrderValue  = orders.length ? totalRevenue / orders.length : 0;
  const totalUnits     = orders.reduce((s, o) => s + (o.items || []).reduce((a,i) => a+i.qty,0), 0);

  const BREADCRUMBS = {
    overview: 'Dashboard', orders: 'Orders', inventory: 'Inventory',
    customers: 'Customers', settings: 'Settings',
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        view={view} setView={setView}
        orders={orders}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <span className="admin-topbar__bread">Admin / {BREADCRUMBS[view]}</span>
            <span className="admin-topbar__title">{BREADCRUMBS[view]}</span>
          </div>
          <div className="admin-topbar__right">
            <button
              className="admin-topbar__mobile-btn"
              onClick={() => setMobileSidebarOpen(o => !o)}
              aria-label="Toggle sidebar"
            >
              {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button className="btn btn-ghost btn-sm" aria-label="Refresh data">
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="btn btn-ghost btn-sm" aria-label="Notifications">
              <Bell size={14} />
              {pendingCount > 0 && (
                <span style={{
                  position:'absolute', top:4, right:4,
                  width:8, height:8, borderRadius:'50%', background:'var(--accent)',
                }} />
              )}
            </button>
            <div className="admin-topbar__user">
              <div className="admin-topbar__avatar">A</div>
              <div>
                <span className="admin-topbar__name">Admin User</span>
                <span className="admin-topbar__role">Store Manager</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {/* ── OVERVIEW ──────────────────────────────────────── */}
          {view === 'overview' && (
            <>
              <div className="stats-grid">
                <StatCard
                  label="Total Revenue" value={`$${totalRevenue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/,',')}`}
                  change="+18.2%" changeType="up" icon={DollarSign}
                  iconBg="rgba(154,0,2,.1)" iconColor="var(--accent)"
                />
                <StatCard
                  label="Total Orders" value={orders.length}
                  change={`+${orders.length} new`} changeType="up" icon={ShoppingCart}
                  iconBg="rgba(21,101,192,.1)" iconColor="var(--info)"
                />
                <StatCard
                  label="Avg Order Value" value={`$${avgOrderValue.toFixed(0)}`}
                  change="+4.5%" changeType="up" icon={TrendingUp}
                  iconBg="rgba(45,106,79,.1)" iconColor="var(--success)"
                />
                <StatCard
                  label="Units Sold" value={totalUnits}
                  change="+12.8%" changeType="up" icon={ShoppingBag}
                  iconBg="rgba(181,84,12,.1)" iconColor="var(--warning)"
                />
              </div>

              <div className="charts-grid">
                <div className="admin-card">
                  <div className="admin-card__head">
                    <div>
                      <div className="admin-card__title">Weekly Revenue</div>
                      <div className="admin-card__sub">Sales performance over the last 7 days</div>
                    </div>
                    <BarChart2 size={18} style={{ color:'var(--muted-light)' }} />
                  </div>
                  <SalesChart data={salesData} />
                </div>
                <div className="admin-card">
                  <div className="admin-card__head">
                    <div>
                      <div className="admin-card__title">Sales by Category</div>
                      <div className="admin-card__sub">Product distribution</div>
                    </div>
                  </div>
                  <CategoryChart products={products} />
                </div>
              </div>

              {/* Recent orders + top inventory */}
              <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>
                <div className="admin-card">
                  <div className="admin-card__head">
                    <div>
                      <div className="admin-card__title">Recent Orders</div>
                      <div className="admin-card__sub">Latest {Math.min(5, orders.length)} orders</div>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => setView('orders')}>
                      View All <ExternalLink size={11} />
                    </button>
                  </div>
                  <OrdersTable orders={orders.slice(0,5)} updateOrderStatus={updateOrderStatus} />
                </div>
                <div className="admin-card">
                  <div className="admin-card__head">
                    <div>
                      <div className="admin-card__title">Top Inventory</div>
                      <div className="admin-card__sub">Stock levels</div>
                    </div>
                  </div>
                  <InventoryPanel products={products.slice(0,6)} />
                </div>
              </div>
            </>
          )}

          {/* ── ORDERS ────────────────────────────────────────── */}
          {view === 'orders' && (
            <div className="admin-card">
              <div className="admin-card__head">
                <div>
                  <div className="admin-card__title">All Orders</div>
                  <div className="admin-card__sub">{orders.length} total · {pendingCount} pending</div>
                </div>
              </div>
              <OrdersTable orders={orders} updateOrderStatus={updateOrderStatus} />
            </div>
          )}

          {/* ── INVENTORY ─────────────────────────────────────── */}
          {view === 'inventory' && (
            <div className="admin-card">
              <div className="admin-card__head">
                <div>
                  <div className="admin-card__title">Inventory Management</div>
                  <div className="admin-card__sub">{products.length} SKUs</div>
                </div>
              </div>
              <InventoryPanel products={products} />
            </div>
          )}

          {/* ── CUSTOMERS ─────────────────────────────────────── */}
          {view === 'customers' && (
            <div className="admin-card">
              <div className="admin-card__head">
                <div>
                  <div className="admin-card__title">Customers</div>
                  <div className="admin-card__sub">{customers.length} registered</div>
                </div>
              </div>
              <CustomerTable customers={customers} orders={orders} />
            </div>
          )}

          {/* ── SETTINGS ──────────────────────────────────────── */}
          {view === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
}
