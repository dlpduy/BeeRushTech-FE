import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API đã cấu hình
import { Header } from "../../MutualComponents/Header/Header";
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import styles from "./ProductInfo.module.css";

const ProductInfo = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data); // Gán sản phẩm vào state
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(true); // Đặt trạng thái lỗi
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <main className={styles.ProductInfo}>
                <Header />
                <div className={styles.loadingContainer}>Loading...</div>
                <Footer />
            </main>
        );
    }

    return (
        <main className={styles.ProductInfo}>
            <Header />
            <div className={styles.container}>
                {error || !product ? (
                    <div className={styles.errorMessage}>
                        Product not found. Please check the product ID.
                    </div>
                ) : (
                    <ProductDetail product={product} />
                )}
                <NewsletterSection />
            </div>
            <Footer />
        </main>
    );
};

export default ProductInfo;
