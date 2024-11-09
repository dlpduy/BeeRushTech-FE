// src/pages/Product/component/ProductDetail.js
import React from "react";
import styles from './ProductDetail.module.css';

const ProductDetail = ({ product }) => {
    if (!product) return null;

    return (
        <div className={styles.product_detail}>
            <div className={styles.product_img}>
                <div style={{ backgroundImage: `url(${product.image})` }}></div>
            </div>
            <div className={styles.product_detail_info}>
                <div className={styles.product_name}>{product.name}</div>
                <p className={styles.product_category}>Category: {product.category}</p>
                <p className={styles.product_price}>Price: ${product.price}</p>
                <p className={styles.product_rental_count}>Rentals: {product.rentalCount}</p>
            </div>
        </div>
    );
}

export default ProductDetail;
