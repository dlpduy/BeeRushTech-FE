import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api"; // Sử dụng instance API
import styles from "./ProductDetail.module.css";
import { mockProducts } from "../../mockData"; // Import mock data

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(mockProducts[0]); // Hiển thị sản phẩm đầu tiên trong mock data mặc định
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProducts[0].colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(mockProducts[0].storageOptions[0].size);
  const [imageError, setImageError] = useState(false); // Trạng thái lỗi hình ảnh
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi gửi request API
  const [error, setError] = useState(null); // Để lưu lỗi nếu có

  useEffect(() => {
    // Cuộn trang lên đầu khi component ProductDetail được mount
    window.scrollTo(0, 0);
    const handleAddToCart = async () => {
      try {
        setIsLoading(true); // Bắt đầu loading khi API gọi
        const response = await api.post('/api/v1/customer/cart', {
          productId: product.id,
          quantity,
        });
    
        if (response.data.statusCode === 200) {
          // Nếu API gọi thành công
          addToCart({
            id: response.data.data.cartId,
            productId: response.data.data.productId,
            quantity: response.data.data.quantity,
          });
          console.log('Product added to cart successfully');
        } else {
          console.error('Error adding product to cart:', response.data.message);
          setError(response.data.message); // Lưu lại thông báo lỗi nếu có
        }
      } catch (err) {
        console.error('Failed to add product to cart:', err);
        setError('Failed to add product to cart');
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        if (response.data) {
          setProduct(response.data);
          setSelectedColor(response.data.colors[0]); // Mặc định chọn màu đầu tiên
          setSelectedStorage(response.data.storageOptions[0].size); // Mặc định chọn dung lượng đầu tiên
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        // Nếu có lỗi, giữ sản phẩm đầu tiên trong mock data
        setProduct(mockProducts[0]); // Sử dụng sản phẩm đầu tiên trong mock data
        setSelectedColor(mockProducts[0].colors[0]);
        setSelectedStorage(mockProducts[0].storageOptions[0].size);
      }
    };

    fetchProduct(); // Gọi API khi component mount
  }, [productId]); // Mảng phụ thuộc để gọi lại khi `productId` thay đổi

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };

  // Xử lý chọn màu
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Xử lý chọn dung lượng lưu trữ
  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      quantity,
      color: selectedColor,
      storage: selectedStorage,
    };
    addToCart(cartItem);
  };

  // Lấy số lượng trong kho cho dung lượng được chọn
  const selectedStorageOption = product.storageOptions.find(
    (option) => option.size === selectedStorage
  );
  const stock = selectedStorageOption ? selectedStorageOption.inStock : 0;

  // Hàm xử lý lỗi khi tải hình ảnh
  const handleImageError = () => {
    setImageError(true); // Đánh dấu có lỗi khi tải hình ảnh
  };

  // Đường dẫn hình ảnh (nếu có lỗi thì sử dụng ảnh mặc định)
  const imageUrl = imageError ? "/public/logo.png" : (product.image || "/public/logo.png");

  if (!product) {
    return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
  }

  return (
    <div className={styles.product_detail}>
      {/* Phần hình ảnh sản phẩm */}
      <section className={styles.pic}>
        <img
          src={imageUrl}
          alt={product.name}
          onError={handleImageError} // Gọi handleImageError nếu không tải được hình ảnh
          className={styles.product_img}
        />
      </section>

      {/* Phần chi tiết sản phẩm */}
      <aside className={styles.detail}>
        <div className={styles.product_detail_info}>
          {/* Tên sản phẩm */}
          <h1 className={styles.product_name}>{product.name}</h1>

          {/* Xếp hạng */}
          <div className={styles.rating}>
            <span className={styles.stars}>
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span className={styles.rating_value}>{product.rating}/5</span>
          </div>

          {/* Giá sản phẩm */}
          <div className={styles.price_section}>
            <span className={styles.price}>${product.discountedPrice}</span>
            {product.discountedPrice < product.price && (
              <>
                <span className={styles.original_price}>${product.price}</span>
                <span className={styles.discount}>
                  -{Math.round(
                    ((product.price - product.discountedPrice) / product.price) * 100
                  )}
                  %
                </span>
              </>
            )}
          </div>

          {/* Mô tả sản phẩm */}
          <p className={styles.description}>{product.description}</p>

          {/* Lựa chọn màu sắc */}
          <div className={styles.divider}></div>
          <div className={styles.select_colors}>
            <p>Select Colors</p>
            <div className={styles.colors}>
              {product.colors.map((color) => (
                <span
                  key={color}
                  className={`${styles.color_circle} ${
                    selectedColor === color ? styles.selected : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                ></span>
              ))}
            </div>
          </div>

          {/* Lựa chọn dung lượng lưu trữ */}
          <div className={styles.divider}></div>
          <div className={styles.select_storage}>
            <p>Choose Storage</p>
            <div className={styles.storage_options}>
              {product.storageOptions.map((storage) => (
                <button
                  key={storage.size}
                  className={`${styles.storage_button} ${
                    selectedStorage === storage.size ? styles.selected : ""
                  }`}
                  onClick={() => handleStorageChange(storage.size)}
                >
                  {storage.size}
                </button>
              ))}
            </div>
            <span className={styles.stock}>
              {stock > 0 ? `${stock} left in stock` : "Out of stock"}
            </span>
          </div>

          {/* Lựa chọn số lượng và nút "Add to Rent" */}
          <div className={styles.divider}></div>
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
  {isLoading ? "Adding..." : "Add to Cart"}
</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
