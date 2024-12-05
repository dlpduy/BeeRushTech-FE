import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./HotItem.module.css";
import Loading from "../../MutualComponents/Loading/Loading"; // Component loading để hiển thị khi đang tải dữ liệu

const HotItem = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Lấy sản phẩm hot từ API khi component load
  useEffect(() => {
    const fetchHotItems = async () => {
      try {
        const page = 1; // You can dynamically set the page if required
        const response = await api.get("/products", { params: { page, limit: 4 } }); // Gửi yêu cầu lấy sản phẩm
        if (response.data && response.data.products && Array.isArray(response.data.products)) {
          // Sắp xếp sản phẩm theo số lượng thuê giảm dần và lấy 4 sản phẩm đầu
          const sortedProducts = response.data.products
            .sort((a, b) => b.rented_quantity - a.rented_quantity)
            .slice(0, 4);
          
          setProducts(sortedProducts); // Cập nhật danh sách sản phẩm
        } 
      } catch (error) {
        console.error("Failed to fetch hot items:", error);
        setMessage("Có lỗi khi lấy dữ liệu sản phẩm!");
      } finally {
        setLoading(false); // Đặt lại trạng thái tải sau khi hoàn thành
      }
    };

    fetchHotItems(); // Gọi hàm fetch khi component mount
  }, []); // Mảng phụ thuộc rỗng, chỉ gọi một lần khi component mount

  const handleProductClick = (productId) => {
    navigate(`/product-info/${productId}`); // Chuyển hướng đến trang chi tiết sản phẩm
  };

  if (loading) return <div><Loading /></div>; // Hiển thị loading khi dữ liệu đang tải

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
                src={product.thumbnail || "/logo.png"}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfoOverlay}>
                <h3>{product.name}</h3>
                <p>{product.rented_quantity}+ rentals</p> {/* Hiển thị lượt thuê */}
              </div>
            </div>
          ))
        ) : (
          <p>No hot items available</p> // Nếu không có sản phẩm thì hiển thị thông báo
        )}
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default HotItem;
