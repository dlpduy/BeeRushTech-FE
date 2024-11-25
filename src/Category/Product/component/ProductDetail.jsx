import React, { useState } from "react";
import styles from "./ProductDetail.module.css";

const ProductDetail = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]); // Mặc định chọn màu đầu tiên
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0].size); // Mặc định chọn dung lượng đầu tiên

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

  return (
    <div className={styles.product_detail}>
      {/* Phần hình ảnh sản phẩm */}
      <section className={styles.pic}>
        <div
          className={styles.product_img}
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
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
            <button
              className={styles.add_to_rent}
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              {stock > 0 ? "Add to Rent" : "Out of Stock"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
