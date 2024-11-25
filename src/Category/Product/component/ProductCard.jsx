import React from "react";
import styles from "./ProductCard.css";

const ProductCard = ({ id, name, price, originalPrice, imageUrl, rating, discount }) => {
    return (
        <div className={styles["product-card"]}>
            <div className={styles["product-image"]}>
                <img
                    src={imageUrl || "https://via.placeholder.com/210"} // Ảnh mặc định nếu thiếu
                    alt={name}
                    className={styles["product-image-img"]}
                />
            </div>
            <div className={styles["product-info"]}>
                <h3>{name || "Unnamed Product"}</h3>
                <p>${price || "N/A"}</p>
                {originalPrice && (
                    <span className={styles["original-price"]}>${originalPrice}</span>
                )}
                {discount && (
                    <span className={styles["discount-percentage"]}>{discount}% off</span>
                )}
                <p>⭐ {rating || "N/A"}</p>
            </div>
        </div>
    );
};

export default ProductCard;
