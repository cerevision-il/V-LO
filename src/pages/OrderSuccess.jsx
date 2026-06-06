import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;
  const canvasRef = useRef(null);

  /* Mini confetti */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx  = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -200,
      vx: (Math.random() - .5) * 3,
      vy: Math.random() * 3 + 1.5,
      color: ['#9a0002','#1a1a1a','#c4a882','#b5a89a','#efe6dd'][Math.floor(Math.random()*5)],
      size: Math.random() * 7 + 4,
      rotation: Math.random() * 360,
      spin: (Math.random() - .5) * 8,
    }));
    let af;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size/2);
        ctx.restore();
        p.x  += p.vx;
        p.y  += p.vy;
        p.rotation += p.spin;
        if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
      });
      af = requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(() => cancelAnimationFrame(af), 5000);
    return () => { cancelAnimationFrame(af); clearTimeout(t); };
  }, []);

  const shortId = order?.shortId || '??????';
  const total   = order?.total?.toFixed(2) || '—';
  const email   = order?.customer?.email || '—';

  return (
    <main
      className="success-pg"
      aria-label="Order confirmed"
      style={{ position:'relative', overflow:'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position:'absolute', inset:0, pointerEvents:'none',
          width:'100%', height:'100%',
        }}
        aria-hidden="true"
      />

      <div className="success-card" style={{ position:'relative', zIndex:1 }}>
        <div className="success-card__icon">
          <CheckCircle size={36} />
        </div>
        <div className="success-card__order">Order #{shortId}</div>
        <h1>Order Confirmed!</h1>
        <p>
          Thank you for shopping at VÉLO &amp; VINTAGE. Your order has been received and is being prepared.
          A confirmation has been sent to <strong>{email}</strong>.
        </p>

        <div className="success-details">
          <div className="success-detail-row">
            <span>Order Number</span>
            <span style={{ fontFamily:'monospace', fontWeight:700 }}>VV-{shortId}</span>
          </div>
          <div className="success-detail-row">
            <span>Order Total</span>
            <span>${total}</span>
          </div>
          <div className="success-detail-row">
            <span>Status</span>
            <span style={{ color:'var(--warning)' }}>Pending</span>
          </div>
          <div className="success-detail-row">
            <span>Estimated Delivery</span>
            <span>5–8 Business Days</span>
          </div>
        </div>

        <div className="success-ctas">
          <Link to="/home" className="btn btn-primary btn-lg">
            <Home size={15} /> Continue Shopping
          </Link>
          <Link to="/admin/dashboard" className="btn btn-outline btn-lg">
            <Package size={15} /> Track in Admin <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </main>
  );
}
