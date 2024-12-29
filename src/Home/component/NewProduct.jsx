import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Sử dụng instance API
import styles from "./HotItem.module.css";
import Loading from "../../MutualComponents/Loading/Loading";

function formatNumberWithDots(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
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
                Sản phẩm<div className={styles.bold}> MỚI</div> 
            </div>
            <div className={styles.product}>
    {products.length ? (
      products.map((product) => (
        <div className={styles.productContainer} key={product.id} onClick={() => handleProductClick(product.id)}>
          <div
            className={styles.productFrame}
            
          >
            <img
              src={product.thumbnail || "/logo.png"}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
              <p>{product.name}</p>
              <p>{formatNumberWithDots(product.price)}VND/giờ</p>

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

export default NewProduct;
