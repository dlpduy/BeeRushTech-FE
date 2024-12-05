import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./NewProduct.module.css";
import Loading from "../../MutualComponents/Loading/Loading";

const NewProduct = () => {
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái tải
    const [error, setError] = useState(false); // Trạng thái lỗi
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true); // Đặt trạng thái tải
            const response = await api.get("/products", {
              params: {
                page: 0,   // Ví dụ, bạn có thể truyền các tham số trang
                limit: 10   // Lấy tối đa 10 sản phẩm để chắc chắn có đủ sản phẩm
              }
            });
            

      
            // Kiểm tra nếu response thành công và có dữ liệu sản phẩm
            if (response.statusCode === 200 && response.data && Array.isArray(response.data.products)) {
                console.log(response);
              const sortedProducts = response.data.products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
              // Lấy 4 sản phẩm mới nhất
              const latestProducts = sortedProducts.slice(0, 4); // Lấy 4 sản phẩm đầu tiên
              setProducts(latestProducts); // Cập nhật danh sách sản phẩm mới nhất
            } else {
              setError(true); // Nếu không có sản phẩm, đánh dấu lỗi
            }
          } catch (err) {
            console.error("Failed to fetch new products:", err);
            setError(true); // Nếu có lỗi trong quá trình gọi API
          } finally {
            setLoading(false); // Đặt lại trạng thái tải
          }
        };
      
        fetchProducts(); // Gọi hàm lấy dữ liệu
      }, []);
      

      const handleProductClick = (productId) => {
        navigate(`/product-info/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
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
                                src={product.thumbnail || "/logo.png"} // Thêm ảnh mặc định nếu không có ảnh
                                alt={product.name}
                                className={styles.productImage}
                            />
                            <div className={styles.productInfoOverlay}>
                                <h3>{product.name}</h3>
                                <p>{product.category.name}</p>
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
