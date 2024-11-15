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
            { id: 1, name: 'Product A', category: 'Máy ảnh & Máy quay', price: 100, rentalCount: 120, image: 'https://via.placeholder.com/150' },
            { id: 2, name: 'Product B', category: 'Flycam', price: 150, rentalCount: 110, image: 'https://via.placeholder.com/150' },
            { id: 3, name: 'Product C', category: 'Smart phone', price: 200, rentalCount: 95, image: 'https://via.placeholder.com/150' },
            { id: 4, name: 'Product D', category: 'Chân máy', price: 80, rentalCount: 80, image: 'https://via.placeholder.com/150' },
            { id: 5, name: 'Product E', category: 'Máy ảnh & Máy quay', price: 50, rentalCount: 75, image: 'https://via.placeholder.com/150' }
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
                <div className={styles.content}>
                    <div className={styles.filter_border}>
                        <div className={styles.filter_container}>
                            <FilterSidebar setFilterCriteria={setFilterCriteria} applyFilter={applyFilter} />
                        </div>
                    </div>
                    <aside className={styles.sidebar}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} onClick={() => handleProductClick(product.id)}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </aside>
                </div>
                <NewsletterSection />
            </div>
            <Footer />
        </div>
    );
};

export default Category;
