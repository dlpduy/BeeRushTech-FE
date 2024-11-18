// src/pages/Category.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import ProductCard from "./Product/component/ProductCard";
import FilterSidebar from './FilterSidebar';

import styles from './Category.module.css';

const Category = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({ category: null, priceRange: [0, 300] });
    const navigate = useNavigate();

    useEffect(() => {
        // Mock product data with a price property and unique ID
        const mockData = [
            {
                id: 1,
                name: "Fuji XT-5",
                category: "Camera",
                price: 25, // Original price
                discountedPrice: 20, // Discounted price
                rating: 4.0, // Rating out of 5
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/061aeef4929baa7311c51b60c045d1356c7bef644be41c6efa6f3b6d6d9a6d77?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c",
            },
            {
                id: 2,
                name: "Sony ULT Tower 10",
                category: "Speaker",
                price: 75, // Original price
                discountedPrice: 75, // No discount
                rating: 3.5, // Rating out of 5
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/620a1c99cd138f4279f733b22ef7213cefe4fbaaa673ff9c51ca006378723f78?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c0",
            },
            {
                id: 3,
                name: "Samsung Z Flip 6",
                category: "Smartphone",
                price: 25, // Original price
                discountedPrice: 15, // Discounted price
                rating: 4.5, // Rating out of 5
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/8bc234606f19c11a185c160124b803006edebb82dc54c64a6a37021a7b9866bc?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c",
            },
            {
                id: 4,
                name: "Apple Iphone 16 Pro Max",
                category: "Smartphone",
                price: 25, // Original price
                discountedPrice: 15, // Discounted price
                rating: 5.0, // Rating out of 5
                image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8",
            },
        ];

        setProducts(mockData);
        setFilteredProducts(mockData);
    }, []);

    const applyFilter = () => {
        const filtered = products.filter(product => {
            if (filterCriteria.category && product.category !== filterCriteria.category) {
                return false;
            }
            if (product.price < filterCriteria.priceRange[0] || product.price > filterCriteria.priceRange[1]) {
                return false;
            }
            return true;
        });
        setFilteredProducts(filtered);
    };

    const handleProductClick = (productId) => {
        navigate(`/product-info`);
    };

    return (
        <div className={styles.category}>
    <Header />
    <div className={styles.container}>
        <div className={styles.divider}></div>
        <div className={styles.topBar}>
            
        </div>
        <div className={styles.content}>
            <div className={styles.filter_border}>
                <div className={styles.filter_container}>
                    <FilterSidebar setFilterCriteria={setFilterCriteria} applyFilter={applyFilter} />
                </div>
            </div>
            <aside className={styles.side}>
            <div className={styles.title}>  
                <div className={styles.title}>Category</div>
            <div className={styles.sortOptions}>
                <label htmlFor="sort-select">Sort by:</label>
                <select
                    id="sort-select"
                    onChange={(e) => {
                        const sortType = e.target.value;
                        let sortedProducts = [...filteredProducts];
                        if (sortType === "price-asc") {
                            sortedProducts.sort((a, b) => a.price - b.price);
                        } else if (sortType === "price-desc") {
                            sortedProducts.sort((a, b) => b.price - a.price);
                        } else if (sortType === "rental-desc") {
                            sortedProducts.sort((a, b) => b.rentalCount - a.rentalCount);
                        }
                        setFilteredProducts(sortedProducts);
                    }}
                >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rental-desc">Most Popular</option>
                </select>
            </div>
            </div>  
                <div className={styles.sidebar}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} onClick={() => handleProductClick(product.id)}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </aside>
        </div>
        <NewsletterSection />
    </div>
    <Footer />
</div>

    );
};

export default Category;
