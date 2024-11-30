import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./HotItem.module.css";
import Loading from "../../MutualComponents/Loading/Loading";
import { mockProducts } from "../../Category/mockData"; // Import mock data

const HotItem = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotItems = async () => {
            try {
                const response = await api.get("/products");
                // Kiểm tra nếu dữ liệu trả về hợp lệ, nếu không sử dụng mock data
                if (response.data && Array.isArray(response.data)) {
                    const sortedProducts = response.data
                        .sort((a, b) => b.rents - a.rents)
                        .slice(0, 4);
                    setProducts(sortedProducts);
                } else {
                    setProducts(mockProducts); // Nếu không có dữ liệu hợp lệ từ API, sử dụng mock data
                }
            } catch (err) {
                console.error("Failed to fetch hot items:", err);
                setProducts(mockProducts); // Nếu có lỗi, sử dụng mock data
            }
            finally {
                setLoading(false); // Đặt lại trạng thái tải
            }
        };

        fetchHotItems(); // Gọi hàm fetch khi component mount
    }, []); // Mảng phụ thuộc rỗng để gọi API một lần duy nhất khi component mount

    const handleProductClick = (productId) => {
        navigate(`/product-info/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
    };

    if (loading) return <div><Loading/></div>;

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.bold}>HOT</div> Items
            </div>
            <div className={styles.productContainer}>
                {products.length ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className={styles.productFrame}
                            onClick={() => handleProductClick(product.id)} // Khi click sẽ chuyển đến chi tiết sản phẩm
                        >
                            <img 
                                src={product.image || "/logo.png"} 
                                alt={product.name} 
                                className={styles.productImage} 
                            />
                            <div className={styles.productInfoOverlay}>
                                <h3>{product.name}</h3>
                                <p>{product.rents}+ rentals</p> {/* Hiển thị lượt thuê */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hot items available</p> // Nếu không có sản phẩm thì hiển thị thông báo
                )}
            </div>
        </div>
    );
};

export default HotItem;
