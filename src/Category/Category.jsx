import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
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
        // Fetch product data from backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`); // Replace with your actual API URL
                const categories = response.data;

                // Assuming the categories contain products, flatten the products into the product list
                const allProducts = categories.flatMap(category => category.products || []);
                setProducts(allProducts);
                setFilteredProducts(allProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
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
        navigate(`/product-info/${productId}`);
    };

    return (
        <div className={styles.category}>
            <Header />
            <div className={styles.container}>
                <div className={styles.divider}></div>
                <div className={styles.topBar}></div>
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
