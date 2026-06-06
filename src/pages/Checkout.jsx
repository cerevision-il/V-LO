import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Lock, CheckCircle, Truck, CreditCard } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const STEPS = ['Information', 'Shipping', 'Payment'];

const SHIPPING_OPTIONS = [
  { id:'standard', label:'Standard Shipping', sub:'5–8 business days', price:15 },
  { id:'express',  label:'Express Shipping',  sub:'2–3 business days', price:28 },
  { id:'overnight',label:'Overnight',          sub:'Next business day',  price:52 },
];

function StepIndicator({ current }) {
  return (
    <div className="checkout-steps" aria-label="Checkout steps">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className={`co-step ${i < current ? 'co-step--done' : ''} ${i === current ? 'co-step--active' : ''}`}>
            <div className="co-step__num">
              {i < current ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span className="co-step__label">{step}</span>
          </div>
          {i < STEPS.length - 1 && <div className="co-step__line" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Checkout() {
  const navigate    = useNavigate();
  const { cart, cartSubtotal, placeOrder } = useStore();
  const [step,  setStep]  = useState(0);
  const [errors, setErrors] = useState({});

  const [info, setInfo] = useState({
    email:'', firstName:'', lastName:'', address:'', city:'', state:'', zip:'', country:'US',
  });
  const [shipping, setShipping] = useState('standard');
  const [payment, setPayment]   = useState({
    cardName:'', cardNumber:'', expiry:'', cvv:'',
  });

  const shippingCost = SHIPPING_OPTIONS.find(o => o.id === shipping)?.price || 15;
  const tax      = +(cartSubtotal * 0.08).toFixed(2);
  const total    = +(cartSubtotal + tax + shippingCost).toFixed(2);

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!info.email.includes('@'))     e.email     = 'Valid email required';
      if (!info.firstName.trim())        e.firstName  = 'Required';
      if (!info.lastName.trim())         e.lastName   = 'Required';
      if (!info.address.trim())          e.address    = 'Required';
      if (!info.city.trim())             e.city       = 'Required';
      if (!info.zip.trim())              e.zip        = 'Required';
    }
    if (s === 2) {
      if (!payment.cardName.trim())      e.cardName   = 'Required';
      if (!/^\d{16}$/.test(payment.cardNumber.replace(/\s/g,''))) e.cardNumber = '16-digit card number required';
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = 'MM/YY format';
      if (!/^\d{3,4}$/.test(payment.cvv)) e.cvv = '3-4 digits';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    // Place order
    const order = placeOrder({
      customer: {
        name:  `${info.firstName} ${info.lastName}`,
        email: info.email,
        address: info.address,
        city: info.city,
        state: info.state,
        zip: info.zip,
      },
      shippingMethod: shipping,
      shippingCost,
    });
    navigate('/order-success', { state: { order } });
  };

  const fmtCard = v =>
    v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const fmtExp  = v =>
    v.replace(/\D/g,'').slice(0,4).replace(/^(\d{2})(\d{0,2})/,'$1/$2');

  const FI = ({ name, label, ...rest }) => (
    <div className="form-group">
      <label className="form-label" htmlFor={`co-${name}`}>{label}</label>
      <input
        id={`co-${name}`}
        className={`form-input ${errors[name] ? 'is-error' : ''}`}
        {...rest}
      />
      {errors[name] && <span className="form-error">{errors[name]}</span>}
    </div>
  );

  return (
    <main className="checkout-pg" aria-label="Checkout">
      <div className="checkout-pg__inner">
        <div>
          <StepIndicator current={step} />

          {/* STEP 0 — Information */}
          {step === 0 && (
            <div className="checkout-form-section">
              <h2>Contact &amp; Shipping</h2>
              <div className="checkout-form">
                <FI name="email" label="Email Address" type="email" placeholder="you@example.com"
                  value={info.email} onChange={e => setInfo(x => ({...x,email:e.target.value}))} />
                <div className="form-row">
                  <FI name="firstName" label="First Name" placeholder="Isabelle"
                    value={info.firstName} onChange={e => setInfo(x => ({...x,firstName:e.target.value}))} />
                  <FI name="lastName"  label="Last Name"  placeholder="Moreau"
                    value={info.lastName}  onChange={e => setInfo(x => ({...x,lastName:e.target.value}))} />
                </div>
                <FI name="address" label="Street Address" placeholder="14 Rue de Rivoli"
                  value={info.address} onChange={e => setInfo(x => ({...x,address:e.target.value}))} />
                <div className="form-row">
                  <FI name="city"  label="City"      placeholder="Paris"
                    value={info.city}  onChange={e => setInfo(x => ({...x,city:e.target.value}))} />
                  <FI name="state" label="State / Province" placeholder="Île-de-France"
                    value={info.state} onChange={e => setInfo(x => ({...x,state:e.target.value}))} />
                </div>
                <div className="form-row">
                  <FI name="zip"     label="Postal Code" placeholder="75001"
                    value={info.zip}     onChange={e => setInfo(x => ({...x,zip:e.target.value}))} />
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-country">Country</label>
                    <select id="co-country" className="form-select"
                      value={info.country} onChange={e => setInfo(x => ({...x,country:e.target.value}))}>
                      <option value="US">United States</option>
                      <option value="FR">France</option>
                      <option value="GB">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="JP">Japan</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Shipping Method */}
          {step === 1 && (
            <div className="checkout-form-section">
              <h2>Shipping Method</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {SHIPPING_OPTIONS.map(opt => (
                  <label
                    key={opt.id}
                    htmlFor={`ship-${opt.id}`}
                    style={{
                      display:'flex', alignItems:'center', gap:16, padding:'18px 22px',
                      border:`1.5px solid ${shipping === opt.id ? 'var(--dark)' : 'var(--border)'}`,
                      borderRadius:'var(--radius-md)', cursor:'pointer',
                      background: shipping === opt.id ? 'rgba(26,26,26,.03)' : '#fff',
                      transition:'var(--t)',
                    }}
                  >
                    <input
                      type="radio" id={`ship-${opt.id}`} name="shipping"
                      value={opt.id} checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      style={{ accentColor:'var(--dark)' }}
                    />
                    <Truck size={18} style={{ color:'var(--muted)' }} />
                    <div style={{ flex:1 }}>
                      <span style={{ display:'block', fontWeight:600 }}>{opt.label}</span>
                      <span style={{ fontSize:12, color:'var(--muted)' }}>{opt.sub}</span>
                    </div>
                    <span style={{ fontFamily:'var(--font-serif)', fontSize:16, fontWeight:600 }}>
                      {opt.price === 0 ? 'Free' : `$${opt.price}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Payment */}
          {step === 2 && (
            <div className="checkout-form-section">
              <h2>Payment Details</h2>

              {/* Live card preview */}
              <div className="card-preview">
                <div className="card-preview__top">
                  <div className="card-preview__chip" />
                  <div className="card-preview__brand">VÉLO</div>
                </div>
                <div className="card-preview__number">
                  {(payment.cardNumber || '•••• •••• •••• ••••').padEnd(19,'•').replace(/(.{4})/g,'$1 ').trim().slice(0,19)}
                </div>
                <div className="card-preview__footer">
                  <div>
                    <div className="card-preview__label">Card Holder</div>
                    <div className="card-preview__value">{payment.cardName || 'YOUR NAME'}</div>
                  </div>
                  <div>
                    <div className="card-preview__label">Expires</div>
                    <div className="card-preview__value">{payment.expiry || 'MM/YY'}</div>
                  </div>
                  <div>
                    <CreditCard size={26} style={{ opacity:.6 }} />
                  </div>
                </div>
              </div>

              <div className="checkout-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="co-cardName">Name on Card</label>
                  <input id="co-cardName" className={`form-input ${errors.cardName ? 'is-error' : ''}`}
                    placeholder="ISABELLE MOREAU" value={payment.cardName}
                    onChange={e => setPayment(p => ({...p, cardName:e.target.value.toUpperCase()}))} />
                  {errors.cardName && <span className="form-error">{errors.cardName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-cardNum">Card Number</label>
                  <input id="co-cardNum" className={`form-input ${errors.cardNumber ? 'is-error' : ''}`}
                    placeholder="1234 5678 9012 3456" value={payment.cardNumber}
                    onChange={e => setPayment(p => ({...p, cardNumber:fmtCard(e.target.value)}))}
                    maxLength={19} inputMode="numeric" />
                  {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-expiry">Expiry Date</label>
                    <input id="co-expiry" className={`form-input ${errors.expiry ? 'is-error' : ''}`}
                      placeholder="MM/YY" value={payment.expiry}
                      onChange={e => setPayment(p => ({...p, expiry:fmtExp(e.target.value)}))}
                      maxLength={5} inputMode="numeric" />
                    {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-cvv">CVV</label>
                    <input id="co-cvv" className={`form-input ${errors.cvv ? 'is-error' : ''}`}
                      placeholder="•••" value={payment.cvv} type="password"
                      onChange={e => setPayment(p => ({...p, cvv:e.target.value.replace(/\D/g,'').slice(0,4)}))}
                      maxLength={4} inputMode="numeric" />
                    {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="checkout-nav">
            {step > 0 && (
              <button
                className="btn btn-ghost"
                onClick={() => { setErrors({}); setStep(s => s - 1); }}
              >
                <ChevronLeft size={15} /> Back
              </button>
            )}
            <button
              className="btn btn-accent"
              style={{ marginLeft:'auto' }}
              onClick={next}
              id={`checkout-next-${step}`}
            >
              {step === STEPS.length - 1
                ? <><Lock size={13} /> Place Order &amp; Pay ${total.toFixed(2)}</>
                : <>Continue <ChevronRight size={15} /></>
              }
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="co-sidebar" aria-label="Order review">
          <div className="co-sidebar__title">Order Review</div>
          {cart.map(item => (
            <div key={item.id} className="co-item">
              <div className="co-item__img">
                <img src={item.image} alt={item.name}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  onError={e => { e.currentTarget.style.display='none'; }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="co-item__name">{item.name}</div>
                <div className="co-item__var">{item.color} · {item.size} · Qty {item.qty}</div>
              </div>
              <div className="co-item__price">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
          <div style={{ borderTop:'1px solid var(--border-light)', marginTop:12, paddingTop:12 }}>
            <div className="sum-row"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
            <div className="sum-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="sum-row">
              <span>Shipping</span>
              <span>{SHIPPING_OPTIONS.find(o=>o.id===shipping)?.label} (${shippingCost})</span>
            </div>
            <div className="sum-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'var(--success)' }}>
            <Lock size={11} />
            SSL encrypted · Secure checkout
          </div>
        </aside>
      </div>
    </main>
  );
}
