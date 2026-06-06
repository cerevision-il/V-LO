import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, User, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useStore();
  const [showPass, setShowPass] = useState(false);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (password.length < 4)  { setError('Password too short.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    addToast(`Welcome back!`, 'success');
    setLoading(false);
    navigate('/home');
  };

  const bypass = (role) => {
    addToast(`Signed in as ${role}`, 'success');
    if (role === 'Admin') navigate('/admin/dashboard');
    else navigate('/home');
  };

  return (
    <div className="login-pg">
      {/* Left visual panel */}
      <div className="login-pg__visual">
        <div className="login-pg__visual-bg" />
        <div className="login-pg__visual-content">
          <img src="/logo.png" alt="VÉLO logo" className="login-visual__logo" />
          <h2 className="login-visual__title">VÉLO<br />&amp; VINTAGE</h2>
          <p className="login-visual__sub">Premium urban streetwear. Retro aesthetics. Modern minimalism.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-pg__form">
        <div className="login-form">
          <div className="login-form__head">
            <h2>Welcome Back</h2>
            <p>Sign in to your VÉLO account to continue.</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div className="login-form-fields">
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <div style={{ position:'relative' }}>
                  <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight:44 }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    style={{
                      position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                      background:'none', border:'none', color:'var(--muted)', cursor:'pointer', display:'flex',
                    }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p style={{ color:'var(--error)', fontSize:13, marginBottom:12 }}>{error}</p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width:'100%', justifyContent:'center', marginBottom:8 }}
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? 'Signing In...' : <>Sign In <ArrowRight size={15} /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider"><span>or skip login with a demo account</span></div>

          {/* Quick-access bypass cards */}
          <div className="bypass-cards">
            <div
              className="bypass-card bypass-card--customer"
              onClick={() => bypass('Customer')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && bypass('Customer')}
              id="demo-customer-btn"
              aria-label="Enter as customer demo"
            >
              <div className="bypass-card__ico"><User size={20} /></div>
              <div>
                <span className="bypass-card__tag">Demo</span>
                <span className="bypass-card__title">Shop as Customer</span>
                <span className="bypass-card__desc">Browse, add to cart &amp; checkout</span>
              </div>
              <ArrowRight size={15} className="bypass-card__arrow" />
            </div>

            <div
              className="bypass-card bypass-card--admin"
              onClick={() => bypass('Admin')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && bypass('Admin')}
              id="demo-admin-btn"
              aria-label="Enter as admin demo"
            >
              <div className="bypass-card__ico"><Shield size={20} /></div>
              <div>
                <span className="bypass-card__tag">Admin Panel</span>
                <span className="bypass-card__title">Admin Dashboard</span>
                <span className="bypass-card__desc">Analytics, orders &amp; inventory</span>
              </div>
              <ArrowRight size={15} className="bypass-card__arrow" />
            </div>
          </div>

          <p style={{ textAlign:'center', fontSize:12, color:'var(--muted)', marginTop:28 }}>
            No account?{' '}
            <Link to="/home" style={{ color:'var(--accent)', fontWeight:600 }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
