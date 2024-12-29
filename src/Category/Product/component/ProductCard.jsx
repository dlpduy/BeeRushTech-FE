import React from "react";
import styles from "./ProductCard.module.css"

function formatNumberWithDots(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
const ProductCard = ({ id, name, price,brand, originalPrice, thumbnail, rating, discount, category, onClick }) => {
    return (
        <div className={styles.product_card} onClick={() => onClick(id)}>
            <div className={styles.product_image}>
                <img
                    src={thumbnail || "logo.png"} 
                    alt={name}
                    className={styles.product_image_img}
                />
            </div>
            <div className={styles.product_info}>
                <h3>{name || "Unnamed Product"}</h3>
                <p>{formatNumberWithDots(price) || "N/A"} VND/ giờ</p>
                <p>Thương hiệu: {brand || "N/A"}</p>
                
                {discount && (
                    <span className={styles.discount_percentage}>{discount}% off</span>
                )}
                <p> Loại: {category || "N/A"}</p>
            </div>
        </div>
    );
};

export default ProductCard;
