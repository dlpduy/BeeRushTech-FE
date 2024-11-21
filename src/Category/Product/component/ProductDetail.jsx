import React, { useState } from "react";
import styles from './ProductDetail.module.css';

const ProductDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Default to the first color
    const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0].size); // Default to the first storage option

    // If no product data is passed, return null
    if (!product) return null;

    // Handle increasing and decreasing quantity
    const handleQuantityChange = (type) => {
        setQuantity(prevQuantity => 
            type === 'increase' ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
        );
    };

    // Handle color selection
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    // Handle storage option selection
    const handleStorageChange = (storage) => {
        setSelectedStorage(storage);
    };

    // Find stock availability for the selected storage option
    const selectedStorageOption = product.storageOptions.find(option => option.size === selectedStorage);
    const stock = selectedStorageOption ? selectedStorageOption.inStock ? product.stock : 0 : 0;

    return (
        <div className={styles.product_detail}>
            {/* Product Image Section */}
            <section className={styles.pic}>
                <div className={styles.product_img}>
                    <div style={{ backgroundImage: `url(${product.image})` }}></div>
                </div>
            </section>

            {/* Product Details Section */}
            <aside className={styles.detail}>
                <div className={styles.product_detail_info}>
                    {/* Product Name */}
                    <h1 className={styles.product_name}>{product.name}</h1>

                    {/* Rating */}
                    <div className={styles.rating}>
                        <span className={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
                        <span className={styles.rating_value}>{product.rating}/5</span>
                    </div>

                    {/* Price Section */}
                    <div className={styles.price_section}>
                        <span className={styles.price}>${product.discountedPrice}</span>
                        {product.discountedPrice < product.price && (
                            <>
                                <span className={styles.original_price}>${product.price}</span>
                                <span className={styles.discount}>
                                    -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Product Description */}
                    <p className={styles.description}>
                        {product.description}
                    </p>

                    {/* Color Selection */}
                    <div className={styles.divider}></div>
                    <div className={styles.select_colors}>
                        <p>Select Colors</p>
                        <div className={styles.colors}>
                            {product.colors.map(color => (
                                <span 
                                    key={color}
                                    className={`${styles.color_circle} ${selectedColor === color ? styles.selected : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                ></span>
                            ))}
                        </div>
                    </div>

                    {/* Storage Option Selection */}
                    <div className={styles.divider}></div>
                    <div className={styles.select_storage}>
                        <p>Choose Storage</p>
                        <div className={styles.storage_options}>
                            {product.storageOptions.map(storage => (
                                <button
                                    key={storage.size}
                                    className={`${styles.storage_button} ${selectedStorage === storage.size ? styles.selected : ''}`}
                                    onClick={() => handleStorageChange(storage.size)}
                                >
                                    {storage.size}
                                </button>
                            ))}
                        </div>
                        <span className={styles.stock}>
                            {stock > 0 ? `${stock} left in stock` : 'Out of stock'}
                        </span>
                    </div>

                    {/* Quantity Selection and Add to Rent Button */}
                    <div className={styles.divider}></div>
                    <div className={styles.Rent}>
                        <div className={styles.quantity_section}>
                            <button onClick={() => handleQuantityChange('decrease')} className={styles.quantity_button}>-</button>
                            <span className={styles.quantity}>{quantity}</span>
                            <button onClick={() => handleQuantityChange('increase')} className={styles.quantity_button}>+</button>
                        </div>
                        <button 
                            className={styles.add_to_rent} 
                            disabled={stock === 0}
                        >
                            {stock > 0 ? 'Add to Rent' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default ProductDetail;
