import React, { useCallback } from 'react';
import styles from './CartItem.module.css';
import api from '../../../api'; // Import API instance từ api.js

export const CartItem = ({ image, title, size, color, price, quantity, id, onRemove }) => {
  
  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = useCallback(
    async (newQuantity) => {
      try {
        const response = await api.put('/customer/cart', {
          productId: id,  // Dùng productId để cập nhật số lượng
          quantity: newQuantity
        });
        
        if (response.status === 200) {
          // Nếu API trả về thành công, cập nhật số lượng
          onRemove();  // Đảm bảo sau khi update, gọi lại callback để cập nhật giỏ hàng
        }
      } catch (error) {
        console.error("Error updating product quantity:", error);
      }
    },
    [id, onRemove]
  );

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = useCallback(async () => {
    try {
      const response = await api.delete(`/customer/cart?productId=${id}`);
      if (response.status === 200) {
        // Nếu xóa thành công, gọi onRemove để cập nhật giỏ hàng
        onRemove(id);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  }, [id, onRemove]);

  // Tăng số lượng sản phẩm
  const handleIncrease = () => {
    updateQuantity(quantity + 1);
  };

  // Giảm số lượng sản phẩm
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  return (
    <article className={styles.cartItem}>
      <img src={image} alt={title} className={styles.productImage} />
      <div className={styles.productDetails}>
        <div className={styles.mainDetails}>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{title}</h3>
            <div className={styles.productSpecs}>
              <p className={styles.specText}>
                Size: <span className={styles.specValue}>{size}</span>
              </p>
              <p className={styles.specText}>
                Color: <span className={styles.specValue}>{color}</span>
              </p>
            </div>
          </div>
          <p className={styles.price}>${price}</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.removeButton} onClick={handleRemove} aria-label="Remove item">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/240d83a678a51d7ab08c63d5ef3db69c794418755b11f1132ce4e7974054d36a?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
              alt="Trash Bin Icon"
              className={styles.actionIcon}
            />
          </button>
          <div className={styles.quantity}>
            <button
              className={styles.quantityButton}
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d42fc0826fc7fa5b08c5e7de6c44834a0aaeb917ebd63678188497ddf51709f0?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
                alt="Decrease"
                className={styles.quantityIcon}
              />
            </button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/422baa05380082d9ae4983605703240cf0158a5a7c68500ed8106c80fae887e8?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
                alt="Increase"
                className={styles.quantityIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
