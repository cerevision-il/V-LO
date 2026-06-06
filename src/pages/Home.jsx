import React, { useState, useRef } from 'react';
import { ArrowRight, Truck, Shield, RotateCcw, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/UI/ProductCard';
import { CATEGORIES } from '../data/products';

export default function Home() {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const newArrivals = products.filter(p => p.newArrival);
  const featured    = products.find(p => p.featured && p.category === 'Tees') || products[9];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__content">
          <div className="hero__eyebrow">
            SS 2025 Collection
          </div>
          <h1 className="hero__heading">
            Premium<br />
            Urban<br />
            <em>Streetwear</em>
          </h1>
          <p className="hero__desc">
            VÉLO & VINTAGE merges retro aesthetics with modern minimalism. Heavyweight
            garments, artisanal details, and a design philosophy rooted in longevity.
          </p>
          <div className="hero__ctas">
            <Link to="/home#shop" className="btn btn-primary btn-lg">
              Shop Collection <ArrowRight size={16} />
            </Link>
            <button className="btn btn-outline btn-lg">Lookbook</button>
          </div>
          <div className="hero__stats">
            <div>
              <span className="hero__stat-num">2,400+</span>
              <span className="hero__stat-label">Pieces Sold</span>
            </div>
            <div>
              <span className="hero__stat-num">4.9</span>
              <span className="hero__stat-label">Avg Rating</span>
            </div>
            <div>
              <span className="hero__stat-num">48h</span>
              <span className="hero__stat-label">Dispatch</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <img src="/hero.png" alt="VÉLO & VINTAGE editorial hero" className="hero__img" />
          <div className="hero__overlay" aria-hidden="true" />
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <div className="trust-bar" role="complementary" aria-label="Store benefits">
        <div className="trust-bar__inner">
          <div className="trust-item"><Truck size={16} /> Free Shipping over $200</div>
          <div className="trust-item"><Gem size={16} /> Premium Materials</div>
          <div className="trust-item"><RotateCcw size={16} /> 30-Day Easy Returns</div>
          <div className="trust-item"><Shield size={16} /> Secure Checkout</div>
        </div>
      </div>

      {/* ── SHOP SECTION ──────────────────────────────────────── */}
      <section className="section" id="shop" aria-label="Product catalog">
        <div className="container">
          <div className="section-header">
            <span className="section-header__eyebrow">The Collection</span>
            <h2>VÉLO Essentials</h2>
            <p>Curated pieces that define the intersection of heritage craft and modern urban living.</p>
          </div>

          {/* Filter bar */}
          <div className="filter-bar" role="group" aria-label="Product categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="product-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BANNER ───────────────────────────────────── */}
      <section className="container" id="collections" aria-label="Featured collection">
        <div className="feat-banner">
          <div className="feat-banner__content">
            <div className="feat-banner__eyebrow">Limited Edition</div>
            <h2>The Editorial<br />Graphic Collection</h2>
            <p>Screen-printed with archive VÉLO graphics. Each piece numbered. Organic 220gsm cotton — relaxed, elevated, yours.</p>
            <Link to="/home" className="btn btn-accent btn-lg">
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="feat-banner__visual">
            <img
              src={featured.image}
              alt="Featured collection"
              onError={e => {
                e.currentTarget.parentNode.style.background = 'rgba(154,0,2,.15)';
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="feat-banner__visual-overlay" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ───────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="section" aria-label="New arrivals">
          <div className="container">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:36 }}>
              <div>
                <span className="section-header__eyebrow">Just Dropped</span>
                <h2 style={{ marginTop:8 }}>New Arrivals</h2>
              </div>
              <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                <button 
                  onClick={() => scroll('left')} 
                  className="btn btn-ghost" 
                  style={{ width:'40px', height:'40px', padding:0, borderRadius:'50%', border:'1px solid var(--border)' }}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => scroll('right')} 
                  className="btn btn-ghost" 
                  style={{ width:'40px', height:'40px', padding:0, borderRadius:'50%', border:'1px solid var(--border)' }}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="scroll-row" ref={scrollRef} style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {newArrivals.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BRAND SECTION ─────────────────────────────────────── */}
      <div className="brand-section" aria-label="Brand promise">
        <div className="container">
          <h2>Crafted for Those Who Know</h2>
          <p>
            Each VÉLO garment begins life as a conversation between heritage technique and
            contemporary vision. We source only from mills with ethical practices and a
            commitment to material excellence.
          </p>
          <Link to="/login" className="btn" style={{ background:'rgba(255,255,255,.15)', color:'#fff', border:'1.5px solid rgba(255,255,255,.3)', backdropFilter:'blur(8px)' }}>
            Our Story <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
