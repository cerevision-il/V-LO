import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, Truck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, cartSubtotal, removeFromCart, updateQty } = useStore();

  const tax      = +(cartSubtotal * 0.08).toFixed(2);
  const shipping = cartSubtotal >= 200 ? 0 : 15;
  const total    = +(cartSubtotal + tax + shipping).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="cart-pg">
        <div className="container">
          <div style={{
            textAlign:'center', padding:'80px 24px',
            background:'#fff', borderRadius:'var(--radius-xl)',
            boxShadow:'var(--shadow-md)',
          }}>
            <ShoppingBag size={64} style={{ color:'var(--border)', margin:'0 auto 24px' }} />
            <h2 style={{ fontFamily:'var(--font-serif)', marginBottom:12 }}>Your cart is empty</h2>
            <p style={{ marginBottom:32 }}>Explore our collection and add your favourite pieces.</p>
            <Link to="/home" className="btn btn-primary btn-lg">
              Shop Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="cart-pg" aria-label="Shopping cart">
      <div className="cart-pg__inner">
        {/* Items */}
        <div>
          <div className="cart-pg__head">
            <h1>Shopping Cart</h1>
            <span className="cart-pg__count">{cart.reduce((s,i) => s+i.qty, 0)} items</span>
          </div>

          {cart.map(item => (
            <div key={item.id} className="cart-full-item">
              <div className="cfi__img">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  onError={e => { e.currentTarget.style.display='none'; }}
                />
              </div>

              <div>
                <h3 className="cfi__name">{item.name}</h3>
                <div className="cfi__variants">
                  <span className="cfi__variant">
                    <span style={{ width:10, height:10, borderRadius:'50%', background:item.colorHex, border:'1px solid rgba(0,0,0,.1)', display:'inline-block' }} />
                    {item.color}
                  </span>
                  <span className="cfi__variant">Size: {item.size}</span>
                </div>
                <div className="cfi__qty">
                  <button
                    className="qty-btn"
                    onClick={() => item.qty > 1 && updateQty(item.id, item.qty - 1)}
                    aria-label="Decrease quantity"
                    disabled={item.qty <= 1}
                  >
                    <Minus size={13} />
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="cfi__right">
                <div className="cfi__price" style={{ fontFamily:'var(--font-serif)', fontSize:22, fontWeight:600 }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop:24, display:'flex', gap:12 }}>
            <Link to="/home" className="btn btn-ghost">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary" aria-label="Order summary">
          <h3>Order Summary</h3>

          {/* Promo code */}
          <div className="promo-row">
            <input
              type="text"
              className="form-input promo-input"
              placeholder="Promo code"
              id="promo-code-input"
              aria-label="Enter promo code"
            />
            <button className="promo-btn" aria-label="Apply promo code">
              Apply
            </button>
          </div>

          <div className="sum-row"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
          <div className="sum-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="sum-row">
            <span>Shipping</span>
            <span style={{ color: shipping === 0 ? 'var(--success)' : undefined }}>
              {shipping === 0 ? 'Free' : `$${shipping}`}
            </span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize:11.5, color:'var(--muted)', display:'flex', gap:5, alignItems:'center', marginTop:4 }}>
              <Truck size={12} />
              Add ${(200 - cartSubtotal).toFixed(2)} for free shipping
            </p>
          )}
          <div className="sum-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>

          <Link
            to="/checkout"
            className="btn btn-accent"
            style={{ width:'100%', justifyContent:'center', fontSize:12 }}
          >
            Proceed to Checkout <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize:11, color:'var(--muted)', textAlign:'center', marginTop:14, display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
            <Tag size={11} /> Secure 256-bit SSL checkout
          </p>
        </div>
      </div>
    </main>
  );
}
