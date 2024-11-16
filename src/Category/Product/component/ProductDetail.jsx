import React, { useState } from "react";
import styles from './ProductDetail.module.css';

const ProductDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#555'); // Default color
    const [selectedStorage, setSelectedStorage] = useState('512GB'); // Default storage

    if (!product) return null;

    const handleQuantityChange = (type) => {
        setQuantity(prevQuantity => type === 'increase' ? prevQuantity + 1 : Math.max(1, prevQuantity - 1));
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleStorageChange = (storage) => {
        setSelectedStorage(storage);
    };

    return (
        <div className={styles.product_detail}>
            <section className={styles.pic}>
                <div className={styles.product_img}>
                    <div style={{ backgroundImage: `url(${product.image})` }}></div>
                </div>
            </section>
            <aside className={styles.detail}>
                <div className={styles.product_detail_info}>
                    <h1 className={styles.product_name}>{product.name}</h1>
                    <div className={styles.rating}>
                        <span className={styles.stars}>★★★★★</span>
                        <span className={styles.rating_value}>5/5</span>
                    </div>
                    <div className={styles.price_section}>
                        <span className={styles.price}>${product.price}</span>
                        <span className={styles.original_price}>${product.originalPrice}</span>
                        <span className={styles.discount}>-40%</span>
                    </div>
                    <p className={styles.description}>
                        This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
                    </p>
                    <div className={styles.divider}></div>
                    <div className={styles.select_colors}>
                        <p>Select Colors</p>
                        <div className={styles.colors}>
                            {['#555', '#8c8', '#333'].map(color => (
                                <span 
                                    key={color}
                                    className={`${styles.color_circle} ${selectedColor === color ? styles.selected : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.select_storage}>
                        <p>Choose Storage</p>
                        <div className={styles.storage_options}>
                            {['256GB', '512GB', '1TB'].map(storage => (
                                <button
                                    key={storage}
                                    className={`${styles.storage_button} ${selectedStorage === storage ? styles.selected : ''}`}
                                    onClick={() => handleStorageChange(storage)}
                                >
                                    {storage}
                                </button>
                            ))}
                            <span className={styles.stock}>5 last products</span>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.Rent}>
                    <div className={styles.quantity_section}>
                        <button onClick={() => handleQuantityChange('decrease')} className={styles.quantity_button}>-</button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button onClick={() => handleQuantityChange('increase')} className={styles.quantity_button}>+</button>
                    </div>
                    <button className={styles.add_to_rent}>Add to Rent</button>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default ProductDetail;
