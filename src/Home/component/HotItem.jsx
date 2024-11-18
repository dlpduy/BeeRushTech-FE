import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './HotItem.module.css';

const HotItem = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Updated mock product data
        const mockData = [
            {
                id: 1,
                name: "Fuji XT-5",
                category: "Camera",
                price: 25, // Original price
                discountedPrice: 20, // Discounted price
                rating: 4.0, // Rating out of 5
                rents:2000,
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/061aeef4929baa7311c51b60c045d1356c7bef644be41c6efa6f3b6d6d9a6d77?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c",
            },
            {
                id: 2,
                name: "Sony ULT Tower 10",
                category: "Speaker",
                price: 75, // Original price
                discountedPrice: 75, // No discount
                rating: 3.5, // Rating out of 5
                rents:5000,
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/620a1c99cd138f4279f733b22ef7213cefe4fbaaa673ff9c51ca006378723f78?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c0",
            },
            {
                id: 3,
                name: "Samsung Z Flip 6",
                category: "Smartphone",
                price: 25, // Original price
                discountedPrice: 15, // Discounted price
                rating: 4.5, // Rating out of 5
                rents:10000,
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bc234606f19c11a185c160124b803006edebb82dc54c64a6a37021a7b9866bc?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c",
            },
            {
                id: 4,
                name: "Apple Iphone 16 Pro Max",
                category: "Smartphone",
                price: 25, // Original price
                discountedPrice: 15, // Discounted price
                rating: 5.0, // Rating out of 5
                rents:9000,
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8",
            },
        ];

        // Sort by rating (highest first) and get top 4 products
        const topProducts = mockData.sort((a, b) => b.rating - a.rating).slice(0, 4);
        setProducts(topProducts);
    }, []);

    const handleProductClick = (product) => {
        // Scroll to the top before navigating
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navigate(`/product-info`, { state: { product } });
    };

    const handleViewAllClick = () => {
        // Scroll to the top before navigating
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navigate(`/category`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>HOT </div> Items
            </div>
            <div className={styles.productContainer}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productFrame} onClick={() => handleProductClick(product)}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <div className={styles.productInfoOverlay}>
                            <h3>{product.name}</h3>
                            <p> {product.rents}+ rentals </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.viewAll} onClick={handleViewAllClick}>
                <div className={styles.view_all_content}>
                    View all
                </div>
            </div>
        </div>
    );
};

export default HotItem;
