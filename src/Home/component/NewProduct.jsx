import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./NewProduct.module.css";
import Loading from "../../MutualComponents/Loading/Loading";
import { mockProducts } from "../../Category/mockData"; // Import dữ liệu giả lập

const NewProduct = () => {
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái tải
    const [error, setError] = useState(false); // Trạng thái lỗi
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Đặt trạng thái tải
                const response = await api.get("/products");
                // Kiểm tra nếu response.data tồn tại và là mảng hợp lệ
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setProducts(response.data);
                } else {
                    setProducts(mockProducts); // Nếu không có sản phẩm từ API, dùng mock data
                }
            } catch (err) {
                console.error("Failed to fetch new products:", err);
                
                setProducts(mockProducts); // Khi có lỗi, sử dụng mock data
            } finally {
                setLoading(false); // Đặt lại trạng thái tải
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product-info/${product.id}`, { state: { product } });
    };

    if (loading) return <div><Loading/></div>;
   

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>NEW</div> Products
            </div>
            <div className={styles.productContainer}>
                {products.length ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className={styles.productFrame}
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={product.image || "/logo.png"} // Thêm ảnh mặc định nếu không có ảnh
                                alt={product.name}
                                className={styles.productImage}
                            />
                            <div className={styles.productInfoOverlay}>
                                <h3>{product.name}</h3>
                                <p>{product.category}</p>
                                <p>
                                    From{" "}
                                    <span className={styles.originalPrice}>
                                        ${product.price}
                                    </span>
                                </p>
                                {product.discountedPrice && product.discountedPrice < product.price && (
                                    <p>
                                        <span className={styles.discountedPrice}>
                                            ${product.discountedPrice}
                                        </span>
                                    </p>
                                )}
                                <p>Rating: {product.rating || "N/A"} / 5</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No new products available</p>
                )}
            </div>
        </div>
    );
};

export default NewProduct;
