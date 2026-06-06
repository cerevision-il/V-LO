import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function SideCart() {
  const {
    cart, cartCount, cartSubtotal,
    isCartOpen, setIsCartOpen,
    removeFromCart, updateQty,
  } = useStore();

  const tax      = +(cartSubtotal * 0.08).toFixed(2);
  const shipping = cartSubtotal >= 200 ? 0 : 15;
  const total    = +(cartSubtotal + tax + shipping).toFixed(2);

  return (
    <>
      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`side-cart ${isCartOpen ? 'side-cart--open' : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="side-cart__header">
          <div>
            <h2 className="side-cart__title">Your Cart</h2>
            <p className="side-cart__count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            className="side-cart__close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="side-cart__body">
          {cart.length === 0 ? (
            <div className="side-cart__empty">
              <ShoppingBag size={52} className="side-cart__empty-icon" />
              <h4>Your cart is empty</h4>
              <p>Add some premium pieces to get started.</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item__img"
                    onError={e => { e.currentTarget.style.display='none'; }}
                  />
                </div>

                <div className="cart-item__info">
                  <div>
                    <p className="cart-item__name">{item.name}</p>
                    <div className="cart-item__variants">
                      <span className="cart-item__variant">
                        <span
                          className="cart-item__color-dot"
                          style={{ background: item.colorHex, border: '1px solid rgba(0,0,0,.1)' }}
                        />
                        {item.color}
                      </span>
                      <span className="cart-item__variant">{item.size}</span>
                    </div>
                  </div>

                  <div className="cart-item__bottom">
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                        disabled={item.qty <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="cart-item__qty-num">{item.qty}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="cart-item__price">${(item.price * item.qty).toFixed(2)}</span>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="side-cart__footer">
            <div className="side-cart__sum-row">
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="side-cart__sum-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="side-cart__sum-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className="side-cart__sum-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {cartSubtotal < 200 && (
              <p className="ship-note">
                <Truck size={12} />
                Add ${(200 - cartSubtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <div className="side-cart__ctas">
              <Link
                to="/checkout"
                className="btn btn-accent"
                style={{ width:'100%', justifyContent:'center' }}
                onClick={() => setIsCartOpen(false)}
              >
                Checkout <ArrowRight size={15} />
              </Link>
              <Link
                to="/cart"
                className="btn btn-outline"
                style={{ width:'100%', justifyContent:'center' }}
                onClick={() => setIsCartOpen(false)}
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
