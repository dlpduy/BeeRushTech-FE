// src/components/NewProduct/NewProduct.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './NewProduct.module.css';
import ProductCard from "../../Category/Product/component/ProductCard";

const NewProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Mock product data with unique ID
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

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>NEW </div> Products
            </div>
            <div className={styles.productContainer}>
                {products.map((product, index) => (
                    <div key={index} onClick={() => handleProductClick(product)}>
                        <ProductCard product={product} />
                    </div>
                ))}
                </div>
        </div>
    );
};

export default NewProduct;
