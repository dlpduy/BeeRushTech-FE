// src/components/HotItem/HotItem.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Category/Product/component/ProductCard";
import styles from './HotItem.module.css';

const HotItem = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Mock product data
        const mockData = [
            { id: 1, name: 'Product A', rentalCount: 120, image: 'https://via.placeholder.com/150' },
            { id: 2, name: 'Product B', rentalCount: 110, image: 'https://via.placeholder.com/150' },
            { id: 3, name: 'Product C', rentalCount: 95, image: 'https://via.placeholder.com/150' },
            { id: 4, name: 'Product D', rentalCount: 80, image: 'https://via.placeholder.com/150' },
            { id: 5, name: 'Product E', rentalCount: 75, image: 'https://via.placeholder.com/150' }
        ];

        // Sort by rental count and get top 4 products
        const topProducts = mockData.sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 4);
        setProducts(topProducts);
    }, []);

    const handleProductClick = (product) => {
        navigate(`/ProductInfo`, { state: { product } });
    };

    const handleViewAllClick = () => {
        navigate(`/Category`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>HOT </div> Items
            </div>
            <div className={styles.productContainer}>
                {products.map((product, index) => (
                    <div key={index} onClick={() => handleProductClick(product)}>
                        <ProductCard product={product} />
                    </div>
                ))}
                <div className={styles.viewAll} onClick={handleViewAllClick}>
                    <div className={styles.view_all_content}>
                        View all
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotItem;
