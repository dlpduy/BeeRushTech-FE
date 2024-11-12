import React from "react";
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
    // Sample product data
    const product = {
        name: "Sample Product",
        category: "Electronics",
        price: 199.99,
        rentalCount: 5,
        image: "https://example.com/sample-product-image.jpg"
    };

    return (
        <main className={styles.ProductInfo}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                <section className={styles.pic}>fasfagadfa</section>
                <aside className={styles.detail}><ProductDetail product={product} /></aside>
                <NewsletterSection />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default ProductInfo;
