import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./NewProduct.module.css";

const NewProduct = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products?sort=new");
                setProducts(response.data || []);
            } catch (err) {
                console.error("Failed to fetch new products:", err);
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product-info/${product.id}`, { state: { product } });
    };

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
                                src={product.image}
                                alt={product.name}
                                className={styles.productImage}
                            />
                            <div className={styles.productInfoOverlay}>
                                <h3>{product.name}</h3>
                                <p>{product.category}</p>
                                <p>
                                    From{" "}
                                    <span className={styles.originalPrice}>${product.price}</span>
                                </p>
                                {product.discountedPrice < product.price && (
                                    <p>
                                        <span className={styles.discountedPrice}>
                                            ${product.discountedPrice}
                                        </span>
                                    </p>
                                )}
                                <p>Rating: {product.rating} / 5</p>
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
