import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag, AlignLeft, Hexagon } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const TABS = [
  { to: '/home',  Icon: Home,      label: 'Home'    },
  { to: '/men',   Icon: AlignLeft, label: 'Men'  },
  { to: '/women', Icon: Hexagon,   label: 'Women'  },
  { to: '/cart',  Icon: ShoppingBag, label: 'Cart', hasBadge: true },
  { to: '/login', Icon: User,      label: 'Account' },
];

export default function MobileNav() {
  const { cartCount } = useStore();
  const location = useLocation();

  const isActive = to => {
    if (to.includes('#')) return false;
    return location.pathname === to;
  };

  return (
    <nav className="mobile-nav" aria-label="Mobile bottom navigation">
      {TABS.map(({ to, Icon, label, hasBadge }) => (
        <Link
          key={label}
          to={to}
          className={`mobile-nav__tab ${isActive(to) ? 'mobile-nav__tab--active' : ''}`}
          aria-label={label}
          aria-current={isActive(to) ? 'page' : undefined}
        >
          <div className="mobile-nav__icon-wrap">
            <Icon size={20} strokeWidth={isActive(to) ? 2.5 : 1.75} />
            {hasBadge && cartCount > 0 && (
              <span className="mobile-nav__badge" aria-label={`${cartCount} items`}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </div>
          <span className="mobile-nav__label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
