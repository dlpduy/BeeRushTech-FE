import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div>
    <div className="product-card">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
    </div>
    <div className="product-info">
    <h3>{product.name}</h3>
    <p> {product.rentalCount} rentails</p>
    </div>
  </div>
  );
}

export default ProductCard;
