import React from "react";
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
    // Updated sample product data to match the required format
    const product = {
        name: "Apple iPhone 16 Pro Max",
        category: "Electronics",
        price: 15, // discounted price
        originalPrice: 25, // original price before discount
        rating: 5,
        description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        colors: ["#555", "#8c8", "#333"], // Color options as hex codes
        storageOptions: [
            { size: "256GB", inStock: true },
            { size: "512GB", inStock: true },
            { size: "1TB", inStock: true }
        ],
        stock: 5, // Quantity remaining for the selected storage option
        rentalCount: 5,
        image: "https://example.com/sample-product-image.jpg"
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
