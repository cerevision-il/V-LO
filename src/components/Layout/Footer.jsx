import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, CreditCard } from 'lucide-react';

const LINKS = {
  Shop: [
    { label: 'Hoodies',      to: '/home' },
    { label: 'Jackets',      to: '/home' },
    { label: 'Graphic Tees', to: '/home' },
    { label: 'Accessories',  to: '/home' },
    { label: 'New Arrivals', to: '/home' },
  ],
  Company: [
    { label: 'About VÉLO',   to: '/home' },
    { label: 'Sustainability',to: '/home' },
    { label: 'Careers',      to: '/home' },
    { label: 'Press',        to: '/home' },
  ],
  Support: [
    { label: 'Size Guide',   to: '/home' },
    { label: 'Returns',      to: '/home' },
    { label: 'Shipping',     to: '/home' },
    { label: 'Contact',      to: '/home' },
    { label: 'FAQ',          to: '/home' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__grid">
        {/* Brand */}
        <div>
          <div className="footer__logo">
            <img src="/logo.png" alt="VÉLO logo" className="footer__logo-img" />
            <div>
              <span className="footer__logo-velo">VÉLO</span>
              <span className="footer__logo-sub">Vintage &amp; Co.</span>
            </div>
          </div>
          <p className="footer__tagline">
            An upscale urban streetwear and lifestyle brand. Merging retro aesthetics with modern minimalism since 2020.
          </p>
          <div style={{ display:'flex', gap:12, marginTop:24 }}>
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <button
                key={i}
                aria-label="Social media link"
                style={{
                  width:36, height:36, background:'rgba(255,255,255,.08)',
                  border:'none', borderRadius:8, display:'flex',
                  alignItems:'center', justifyContent:'center',
                  color:'rgba(255,255,255,.55)', cursor:'pointer',
                  transition:'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(154,0,2,.4)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.color='rgba(255,255,255,.55)'; }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([section, items]) => (
          <div key={section}>
            <div className="footer__col-title">{section}</div>
            <ul className="footer__links">
              {items.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} VÉLO &amp; VINTAGE. All rights reserved.
        </p>
        <div className="footer__pay-icons">
          {['VISA', 'MC', 'AMEX', 'PayPal'].map(p => (
            <span key={p} className="footer__pay-icon">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
