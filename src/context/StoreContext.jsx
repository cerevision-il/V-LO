import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import productsData from '../data/products';
import menProducts from '../data/menProducts';
import womenProducts from '../data/womenProducts';

const ALL_PRODUCTS = [...productsData, ...menProducts, ...womenProducts];

const StoreContext = createContext(null);

const KEYS = {
  cart:     'velo_cart',
  orders:   'velo_orders',
  products: 'velo_products',
};
const CHANNEL = 'velo_store_sync';

const MOCK_CUSTOMERS = [
  { id:'C001', name:'Isabelle Moreau',  email:'isabelle.m@email.com',  joined:'2024-01-15', orders:8,  lifetime:1840 },
  { id:'C002', name:'Marcus Chen',      email:'m.chen@email.com',       joined:'2024-02-20', orders:5,  lifetime:1125 },
  { id:'C003', name:'Aria Fontaine',    email:'aria.f@email.com',       joined:'2024-03-05', orders:12, lifetime:2670 },
  { id:'C004', name:'Julian Voss',      email:'julian.voss@email.com',  joined:'2024-03-18', orders:3,  lifetime:645  },
  { id:'C005', name:'Sophie Laurent',   email:'s.laurent@email.com',    joined:'2024-04-02', orders:7,  lifetime:1580 },
  { id:'C006', name:'Romain Blanc',     email:'romain.b@email.com',     joined:'2024-04-15', orders:2,  lifetime:380  },
  { id:'C007', name:'Elena Vasquez',    email:'elena.v@email.com',      joined:'2024-05-01', orders:9,  lifetime:2040 },
  { id:'C008', name:'Theo Nakamura',    email:'theo.n@email.com',       joined:'2024-05-20', orders:4,  lifetime:890  },
];

function genSalesData() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return days.map(day => ({
    day,
    revenue: Math.floor(Math.random() * 2800) + 700,
    orders:  Math.floor(Math.random() * 14)   + 2,
  }));
}

function safeParse(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

export function StoreProvider({ children }) {
  const [products]              = useState(ALL_PRODUCTS);
  const [cart,  setCart]        = useState(() => safeParse(KEYS.cart,   []));
  const [orders, setOrders]     = useState(() => safeParse(KEYS.orders, []));
  const [customers]             = useState(MOCK_CUSTOMERS);
  const [toasts, setToasts]     = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [salesData]             = useState(genSalesData);
  const channelRef              = useRef(null);

  /* ── BroadcastChannel ─────────────────────────────────────── */
  useEffect(() => {
    let ch;
    try {
      ch = new BroadcastChannel(CHANNEL);
      channelRef.current = ch;
      ch.onmessage = ({ data }) => {
        const { type, payload } = data;
        if (type === 'ORDER_PLACED') {
          setOrders(prev => {
            if (prev.find(o => o.id === payload.id)) return prev;
            const next = [payload, ...prev];
            localStorage.setItem(KEYS.orders, JSON.stringify(next));
            return next;
          });
        }
        if (type === 'ORDER_STATUS_CHANGED') {
          setOrders(prev => {
            const next = prev.map(o => o.id === payload.id ? { ...o, status: payload.status } : o);
            localStorage.setItem(KEYS.orders, JSON.stringify(next));
            return next;
          });
          addToast(`Order #${payload.shortId} is now ${payload.status}`, 'info');
        }
      };
    } catch {}

    const onStorage = e => {
      if (e.key === KEYS.orders) setOrders(safeParse(KEYS.orders, []));
      if (e.key === KEYS.cart)   setCart(safeParse(KEYS.cart, []));
    };
    window.addEventListener('storage', onStorage);
    return () => {
      try { ch?.close(); } catch {}
      window.removeEventListener('storage', onStorage);
    };
  }, []); // eslint-disable-line

  const broadcast = useCallback((type, payload) => {
    try {
      const ch = new BroadcastChannel(CHANNEL);
      ch.postMessage({ type, payload });
      ch.close();
    } catch {}
  }, []);

  /* ── Toasts ───────────────────────────────────────────────── */
  const addToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4200);
    return id;
  }, []);

  const removeToast = useCallback(id =>
    setToasts(prev => prev.filter(t => t.id !== id)), []);

  /* ── Cart ─────────────────────────────────────────────────── */
  const addToCart = useCallback((product, size, color) => {
    setCart(prev => {
      const key = `${product.id}|${size}|${color.name}`;
      const existing = prev.find(i => i.key === key);
      const next = existing
        ? prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, {
            id:       `${key}-${Date.now()}`,
            key,
            productId: product.id,
            name:      product.name,
            price:     product.price,
            size,
            color:     color.name,
            colorHex:  color.hex,
            qty:       1,
            image:     product.image,
          }];
      localStorage.setItem(KEYS.cart, JSON.stringify(next));
      broadcast('CART_UPDATED', next);
      return next;
    });
    addToast(`${product.name} added to cart`, 'success');
  }, [broadcast, addToast]);

  const removeFromCart = useCallback(itemId => {
    setCart(prev => {
      const next = prev.filter(i => i.id !== itemId);
      localStorage.setItem(KEYS.cart, JSON.stringify(next));
      return next;
    });
    addToast('Item removed from cart', 'info');
  }, [addToast]);

  const updateQty = useCallback((itemId, qty) => {
    if (qty < 1) return;
    setCart(prev => {
      const next = prev.map(i => i.id === itemId ? { ...i, qty } : i);
      localStorage.setItem(KEYS.cart, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem(KEYS.cart, JSON.stringify([]));
  }, []);

  /* ── Orders ───────────────────────────────────────────────── */
  const placeOrder = useCallback((orderData) => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const tax      = +(subtotal * 0.08).toFixed(2);
    const shipping = subtotal >= 200 ? 0 : 15;
    const total    = +(subtotal + tax + shipping).toFixed(2);
    const shortId  = Math.random().toString(36).slice(2,8).toUpperCase();

    const order = {
      id:        `VV-${shortId}`,
      shortId,
      ...orderData,
      items:     [...cart],
      subtotal:  +subtotal.toFixed(2),
      tax,
      shipping,
      total,
      status:    'Pending',
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => {
      const next = [order, ...prev];
      localStorage.setItem(KEYS.orders, JSON.stringify(next));
      broadcast('ORDER_PLACED', order);
      return next;
    });

    clearCart();
    addToast('Order placed successfully!', 'success');
    return order;
  }, [cart, clearCart, broadcast, addToast]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => {
      const order = prev.find(o => o.id === orderId);
      const next  = prev.map(o => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem(KEYS.orders, JSON.stringify(next));
      broadcast('ORDER_STATUS_CHANGED', { id: orderId, shortId: order?.shortId || orderId, status });
      return next;
    });
    addToast(`Order status updated to ${status}`, 'success');
  }, [broadcast, addToast]);

  /* ── Derived ──────────────────────────────────────────────── */
  const cartCount    = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const value = {
    products,
    cart, cartCount, cartSubtotal,
    orders,
    customers,
    toasts,
    isCartOpen, setIsCartOpen,
    salesData,
    addToCart, removeFromCart, updateQty, clearCart,
    placeOrder, updateOrderStatus,
    addToast, removeToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
};
