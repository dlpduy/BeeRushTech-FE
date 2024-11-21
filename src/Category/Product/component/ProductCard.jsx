import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  // Function to calculate the discount percentage
  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (!originalPrice || originalPrice <= discountedPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="product-image">
        <img src={product.image} alt={product.name} className="product-image-img" />
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Product Rating */}
        <div className="product-rating">
          <span>⭐ {product.rating}/5</span>
        </div>

        {/* Product Price */}
        <div className="product-pricing">
          <span className="discounted-price">${product.discountedPrice}</span>
          {product.price && product.discountedPrice && (
            <>
              <span className="original-price">${product.price}</span>
              <span className="discount-percentage">
                -{calculateDiscountPercentage(product.price, product.discountedPrice)}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
