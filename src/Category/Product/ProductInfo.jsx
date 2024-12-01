import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API đã cấu hình
import { Header } from "../../MutualComponents/Header/Header";
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import Terms from "./component/Terms";
import Loading from "../../MutualComponents/Loading/Loading";
import { mockProducts } from "../mockData";
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
                setProduct(response.data); // Gán sản phẩm từ API vào state
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(true); // Đặt trạng thái lỗi
                setProduct(mockProducts); // Sử dụng mock data khi có lỗi
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
                <Loading />
                <Footer />
            </main>
        );
    }

    return (
        <main className={styles.ProductInfo}>
            <Header />
            <div className={styles.container}>
                
                    <ProductDetail product={product} />
                
                <Terms/>
                <NewsletterSection />
            </div>
            <Footer />
        </main>
    );
};

export default ProductInfo;
