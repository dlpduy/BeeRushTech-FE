// src/components/NewProduct/NewProduct.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './NewProduct.module.css';

const NewProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Mock product data with unique ID
        const mockData = [
            { id: 1, name: 'Product A', rentalCount: 120, image: 'https://via.placeholder.com/150', price: "$15" },
            { id: 2, name: 'Product B', rentalCount: 110, image: 'https://via.placeholder.com/150', price: "$25" },
            { id: 3, name: 'Product C', rentalCount: 95, image: 'https://via.placeholder.com/150', price: "$20" },
            { id: 4, name: 'Product D', rentalCount: 80, image: 'https://via.placeholder.com/150', price: "$18" },
        ];

        // Sort by rental count and get top 4 products
        const topProducts = mockData.sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 4);
        setProducts(topProducts);
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product-info`, { state: { product } });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>NEW </div> Products
            </div>
            <div className={styles.productContainer}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productFrame} onClick={() => handleProductClick(product)}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <div className={styles.productInfoOverlay}>
                            <h3>{product.name}</h3>
                            <p>Rentals: {product.rentalCount}</p>
                            <p>Price: {product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewProduct;
