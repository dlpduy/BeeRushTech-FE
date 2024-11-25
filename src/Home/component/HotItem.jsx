import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./HotItem.module.css";

const HotItem = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotItems = async () => {
            try {
                const response = await api.get("/products");
                const sortedProducts = response.data
                    .sort((a, b) => b.rents - a.rents)
                    .slice(0, 4); // Lấy 4 sản phẩm có lượt thuê cao nhất
                setProducts(sortedProducts);
            } catch (err) {
                console.error("Failed to fetch hot items:", err);
                setProducts([]);
            }
        };

        fetchHotItems();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product-info/${productId}`);
    };

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
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            <div className={styles.productInfoOverlay}>
                                <h3>{product.name}</h3>
                                <p>{product.rents}+ rentals</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hot items available</p>
                )}
            </div>
        </div>
    );
};

export default HotItem;
