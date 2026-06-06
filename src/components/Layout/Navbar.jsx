import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useStore();
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen,  setMenuOpen]      = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/home',             label: 'Home' },
    { to: '/men',              label: 'Men' },
    { to: '/women',            label: 'Women' },
    { to: '/admin/dashboard',  label: 'Admin' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link to="/home" className="navbar__logo" aria-label="VÉLO & VINTAGE home">
            <img src="/logo.png" alt="VÉLO logo mark" className="navbar__logo-img" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-velo">VÉLO</span>
              <span className="navbar__logo-sub">Vintage &amp; Co.</span>
            </div>
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.to}
                className={`navbar__link ${location.pathname === l.to ? 'navbar__link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="navbar__actions">
            <button className="navbar__action-btn" aria-label="Search">
              <Search size={17} />
            </button>
            <Link to="/login" className="navbar__action-btn" aria-label="Account">
              <User size={17} />
            </Link>
            <button
              id="open-cart-btn"
              className="navbar__action-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="navbar__cart-badge" aria-label={`${cartCount} items in cart`}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

    </>
  );
}
