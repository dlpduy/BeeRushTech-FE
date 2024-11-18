import React from "react";
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
    // Updated product data format to match the previous mockData format
    const product = {
        name: "Apple iPhone 16 Pro Max",
        category: "Smartphone",
        price: 25, // Original price
        discountedPrice: 15, // Discounted price
        rating: 5.0, // Rating out of 5
        description: "The latest iPhone model with advanced features including better camera performance, A16 Bionic chip, and longer battery life.",
        colors: ["#555", "#8c8", "#333"], // Color options as hex codes
        storageOptions: [
            { size: "256GB", inStock: true },
            { size: "512GB", inStock: true },
            { size: "1TB", inStock: true }
        ],
        stock: 5, // Quantity remaining for the selected storage option
        rentalCount: 5, // Number of rentals
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
    };

    return (
        <main className={styles.ProductInfo}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.detail}><ProductDetail product={product} /></div>
                    <NewsletterSection />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default ProductInfo;
