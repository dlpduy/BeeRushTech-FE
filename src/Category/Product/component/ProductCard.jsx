import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  return (
    <div>
    <div className="product-card">
      {/* Image Section */}
      <div className="product-image">
        <img src={product.image} alt={product.name} className="product-image-img" />
      </div>
    </div>
      {/* Product Info */}
      <div className="product-info">
        {/* Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          <span>⭐ {product.rating}/5</span>
        </div>

        {/* Price */}
        <div className="product-pricing">
          <span className="discounted-price">${product.discountedPrice}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount-percentage">
                -{calculateDiscountPercentage(product.originalPrice, product.discountedPrice)}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
