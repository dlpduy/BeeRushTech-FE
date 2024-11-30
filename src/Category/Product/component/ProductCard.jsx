import React from "react";
import styles from "./ProductCard.css";

const ProductCard = ({ id, name, price, originalPrice, imageUrl, rating, discount }) => {
    return (
        <div className={styles.product_card}>
            <div className={styles.product_image}>
                <img
                    src={imageUrl || "logo.png"} 
                    alt={name}
                    className={styles.product_image_img}
                />
            </div>
            <div className={styles.product_info}>
                <h3>{name || "Unnamed Product"}</h3>
                <p>${price || "N/A"}</p>
                {originalPrice && (
                    <span className={styles.original_price}>${originalPrice}</span>
                )}
                {discount && (
                    <span className={styles.discount_percentage}>{discount}% off</span>
                )}
                <p>⭐ {rating || "N/A"}</p>
            </div>
        </div>
    );
};

export default ProductCard;
