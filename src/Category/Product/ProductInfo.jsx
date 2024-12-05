import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // Import instance API đã cấu hình
import { Header } from "../../MutualComponents/Header/Header";
import { Footer } from "../../MutualComponents/Footer/Footer";
import NewsletterSection from "../../MutualComponents/Newsletter/Newsletter";
import ProductDetail from "./component/ProductDetail";
import Terms from "./component/Terms";
import Loading from "../../MutualComponents/Loading/Loading";
import styles from "./ProductInfo.module.css";

const ProductInfo = (productID) => {
    const { productId } = useParams(); // Lấy productId từ URL params
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch product data từ API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${productId}`); // Gọi API với productId
                setProduct(response.data); // Cập nhật state với dữ liệu sản phẩm
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(true); // Đặt trạng thái lỗi nếu có lỗi
            } finally {
                setLoading(false); // Kết thúc trạng thái loading
            }
        };

        fetchProduct();
    }, [productId]); // Khi productId thay đổi thì gọi lại API

    // Nếu đang loading, hiển thị loading indicator
    if (loading) {
        return (
            <main className={styles.ProductInfo}>
                <Header />
                <Loading /> {/* Hiển thị màn hình loading */}
                <Footer />
            </main>
        );
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return (
            <main className={styles.ProductInfo}>
                <Header />
                <div className={styles.errorMessage}>
                    <h2>Đã có lỗi xảy ra khi tải sản phẩm!</h2>
                </div>
                <Terms/>
                <Footer />
            </main>
        );
    }

    // Khi không có lỗi và đã tải xong dữ liệu, hiển thị thông tin sản phẩm
    return (
        <main className={styles.ProductInfo}>
            <Header />
            <div className={styles.container}>
                {/* Truyền dữ liệu sản phẩm cho thành phần ProductDetail */}
                {product && <ProductDetail product={product} />}
                 {/* Hiển thị phần điều khoản */}
            </div>
            <Terms />
            <NewsletterSection /> 
            <Footer />
        </main>
    );
};

export default ProductInfo;
