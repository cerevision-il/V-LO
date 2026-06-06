import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize,  setSelectedSize]  = useState(product.sizes[0]);
  const [wishlisted,    setWishlisted]    = useState(false);
  const [imgError,      setImgError]      = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [product.image]);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor);
    if (window.innerWidth <= 768) {
      navigate('/cart');
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Image */}
      <div className="product-card__img-wrap">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="product-card__img-fallback"
            style={{ background: `linear-gradient(135deg, ${selectedColor.hex}18 0%, ${selectedColor.hex}38 100%)` }}
          >
            <span className="product-card__img-placeholder">{product.name[0]}</span>
          </div>
        )}

        {/* Badges */}
        <div className="product-card__badges">
          {product.badge && (
            <span className={`badge badge--${product.badge.toLowerCase().replace(/\s/g,'-')}`}>
              {product.badge}
            </span>
          )}
          {discount && !product.badge && (
            <span className="badge badge--sale">-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={`product-card__wish ${wishlisted ? 'product-card__wish--active' : ''}`}
          onClick={() => setWishlisted(w => !w)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Hover overlay CTA */}
        <div className="product-card__overlay">
          <button
            className="product-card__overlay-btn"
            onClick={handleAdd}
            id={`quick-add-${product.id}`}
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div className="product-card__meta">
          <span className="product-card__cat">{product.category}</span>
          <div className="product-card__rating" aria-label={`Rating: ${product.rating}`}>
            <Star size={11} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="product-card__reviews">({product.reviews})</span>
          </div>
        </div>

        <h3 className="product-card__name">{product.name}</h3>

        {/* Color swatches */}
        <div className="product-card__colors" role="group" aria-label="Select color">
          {product.colors.map(color => (
            <button
              key={color.name}
              className={`color-swatch ${selectedColor.name === color.name ? 'color-swatch--active' : ''}`}
              style={{ '--swatch-color': color.hex }}
              data-light={color.light ? 'true' : 'false'}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              aria-label={`${color.name} color${selectedColor.name === color.name ? ' (selected)' : ''}`}
              aria-pressed={selectedColor.name === color.name}
            />
          ))}
        </div>

        {/* Size pills */}
        <div className="product-card__sizes" role="group" aria-label="Select size">
          {product.sizes.map(size => (
            <button
              key={size}
              className={`size-pill ${selectedSize === size ? 'size-pill--active' : ''}`}
              onClick={() => setSelectedSize(size)}
              aria-label={`Size ${size}${selectedSize === size ? ' (selected)' : ''}`}
              aria-pressed={selectedSize === size}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Price + add */}
        <div className="product-card__price-row">
          <div className="product-card__prices">
            <span className="product-card__price">${product.price}</span>
            {product.originalPrice && (
              <span className="product-card__orig">${product.originalPrice}</span>
            )}
          </div>
          <button
            className="product-card__add"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
