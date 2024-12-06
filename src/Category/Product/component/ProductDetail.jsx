import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api"; // Sử dụng instance API
import styles from "./ProductDetail.module.css";
import Loading from "../../../MutualComponents/Loading/Loading";

function getColorFromString(color) {
  switch (color.toLowerCase()) {
      case "red":
          return "#FF0000";  // Mã màu đỏ
      case "blue":
          return "#0000FF";  // Mã màu xanh dương
      case "green":
          return "#008000";  // Mã màu xanh lá
      case "yellow":
          return "#FFFF00";  // Mã màu vàng
      // Thêm các màu khác tùy vào yêu cầu
      default:
          return "#000000";  // Mặc định là màu đen nếu không tìm thấy
  }
}

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null); // Trạng thái sản phẩm
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null); // Trạng thái màu sắc
  const [selectedStorage, setSelectedStorage] = useState(null); // Trạng thái dung lượng
  const [imageError, setImageError] = useState(false); // Trạng thái lỗi hình ảnh
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi gửi request API
  const [error, setError] = useState(null); // Để lưu lỗi nếu có
  const [isAdded, setIsAdded] = useState(false); // Trạng thái đã thêm sản phẩm vào giỏ hàng
  const [message, setMessage] = useState(""); // Thông báo khi thêm vào giỏ hàng

  useEffect(() => {
    // Cuộn trang lên đầu khi component ProductDetail được mount
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        setIsLoading(true); // Bắt đầu loading khi API gọi
        const response = await api.get(`/products/${productId}`);
        if (response.data) {
          const fetchedProduct = response.data;

          // Kiểm tra dữ liệu trả về từ API
          if (fetchedProduct && fetchedProduct.colors && fetchedProduct.colors.length > 0) {
            setSelectedColor(fetchedProduct.colors[0]); // Mặc định chọn màu đầu tiên
          }
          if (fetchedProduct && fetchedProduct.storageOptions && fetchedProduct.storageOptions.length > 0) {
            setSelectedStorage(fetchedProduct.storageOptions[0].size); // Mặc định chọn dung lượng đầu tiên
          }
          setProduct(fetchedProduct); // Cập nhật state với dữ liệu sản phẩm
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true); // Đặt trạng thái lỗi nếu có lỗi
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchProduct(); // Gọi API khi component mount
  }, [productId]); // Mảng phụ thuộc để gọi lại khi `productId` thay đổi

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };

  

  // Hàm gọi API để thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async () => {

    try {
      // Gửi yêu cầu API để thêm sản phẩm vào giỏ hàng
      const response = await api.post("/customer/cart", {
        productId: product.id,
        quantity: quantity,
      });
        console.log(response);
      if (response.statusCode === 200) {
        setIsAdded(true); // Đánh dấu sản phẩm đã được thêm vào giỏ
        setMessage("Product added to cart successfully!");
        
      } else {
        setIsAdded(false); // Nếu có lỗi, đảm bảo trạng thái không bị thay đổi
      }
    } catch (err) {
      console.error("Error adding product to cart:", err);
      setIsAdded(false); // Đánh dấu lỗi nếu có
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  // Hàm xử lý lỗi khi tải hình ảnh
  const handleImageError = () => {
    setImageError(true); // Đánh dấu có lỗi khi tải hình ảnh
  };

  // Đường dẫn hình ảnh (nếu có lỗi thì sử dụng ảnh mặc định)
  const imageUrl = imageError ? "/public/logo.png" : (product?.image || "/public/logo.png");

  if (isLoading) {
    return <div><Loading/></div>; 
  }

  if (!product) {
    return <div>Product not found</div>; // Nếu không tìm thấy sản phẩm
  }

  return (
    <div className={styles.product_detail}>
      {/* Phần hình ảnh sản phẩm */}
      <section className={styles.pic}>
        <img
          src={product.thumbnail}
          alt={product.name}
          onError={handleImageError} // Gọi handleImageError nếu không tải được hình ảnh
          className={styles.product_img}
        />
      </section>

      {/* Phần chi tiết sản phẩm */}
      <aside className={styles.detail}>
        <div className={styles.product_detail_info}>
            <h1 className={styles.name}>{product.name}</h1>

            <h3 className={styles.brand}>Brand: {product.brand}</h3>

            <p className={styles.price}>Price : {product.price}</p>

            <p className={styles.description}>Description: {product.description}</p>

            <div className={styles.color}>
              <p>Color: </p>
            <div 
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: getColorFromString(product.color), // Lấy màu từ hàm ánh xạ
                marginTop: '10px',
                borderRadius: '5px',
                }}
              />
            </div>

            <p className={styles.quantity}>Quantity: {product.quantity}</p>

          {/* Lựa chọn số lượng và nút "Add to Rent" */}
          <div className={styles.Rent}>
            <div className={styles.quantity_section}>
              <button
                onClick={() => handleQuantityChange("decrease")}
                className={styles.quantity_button}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className={styles.quantity_button}
              >
                +
              </button>
            </div>
            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <div className="error-message">{error}</div>}

            {/* Hiển thị nút "Add to Cart" với trạng thái loading */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={styles.add_to_rent}
            >
              {isLoading ? "Adding..." : isAdded ? "Added to Cart" : "Add to Cart"}
              {message && <div className={styles.message}>{message}</div>}
            </button>
          </div>
        </div>
      </aside>
      
    </div>
  );
};

export default ProductDetail;
