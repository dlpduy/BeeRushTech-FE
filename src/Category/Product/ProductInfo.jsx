import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
    const { productId } = useParams(); // Get productId from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch product details");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <main className={styles.ProductInfo}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    {product ? (
                        <div className={styles.detail}>
                            <ProductDetail product={product} />
                        </div>
                    ) : (
                        <div>Product not found</div>
                    )}
                    <NewsletterSection />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default ProductInfo;
