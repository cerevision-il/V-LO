import React, { useState } from 'react';
import ProductCard from '../components/UI/ProductCard';

export default function CategoryPage({ title, description, products, categories }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('featured');

  let filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.sub === activeCategory || p.category === activeCategory);

  if (sortOrder === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'newest') {
    filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
  }

  return (
    <div className="category-page" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      {/* Category Header */}
      <div style={{ background: 'var(--light)', padding: '60px 0 40px 0', marginBottom: '40px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', margin: '0 0 16px 0', fontFamily: 'var(--font-serif)' }}>{title}</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--muted)', fontSize: '1.1rem' }}>
            {description}
          </p>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          {/* Filters */}
          <div className="filter-bar" style={{ margin: 0, padding: 0, border: 'none', background: 'transparent' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)' }}>Sort by:</span>
            <select
              className="form-select"
              style={{ width: '180px', padding: '8px 12px', fontSize: '14px' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Count */}
        <div style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--muted)' }}>
          Showing {filtered.length} products
        </div>

        {/* Grid */}
        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            No products found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
