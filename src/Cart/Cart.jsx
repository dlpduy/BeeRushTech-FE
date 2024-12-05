import React, { useState, useEffect } from "react";
import { Header } from "../MutualComponents/Header/Header";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import Loading from "../MutualComponents/Loading/Loading";
import { Footer } from "../MutualComponents/Footer/Footer";
import { useNavigate } from "react-router-dom";
import api from "../api";
import styles from "./Cart.module.css";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/customer/cart');
        if (response.statusCode === 200) {
          setCartItems(response.data);
        } else {
          setError('Không thể lấy dữ liệu giỏ hàng.');
        }
      } catch (err) {
        setError("Error fetching cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/user/profile');
        if (response.statusCode === 200) {
          setUserInfo(response.data);
        } else {
          setError("Không thể lấy thông tin người dùng.");
        }
      } catch (err) {
        setError("Error fetching user info.");
      }
    };
    fetchUserInfo();
  }, []);

  // Handle checkout
  const handleCheckout = async () => {
    const orderData = {
      full_name: userInfo.fullName,
      email: userInfo.email,
      phone_number: userInfo.phoneNumber || "",
      address: userInfo.address || "",
      note: 'hàng dễ vỡ', // Customize this if needed
      payment_method: 'CREDIT',
      order_method: 'home',
      shipping_address: userInfo.address || "",
      list_order_detail: cartItems.map(item => ({
        cart_item_id: item.productId,
        time_renting: item.quantity,
      }))
    };

    try {
      setLoading(true);
      const response = await api.post('/orders', orderData);
      if (response.statusCode === 200) {
        setLoading(false);
        navigate(response.data.payment_url);
      } else {
        setError('Không thể tạo đơn hàng, vui lòng thử lại!');
      }
    } catch (err) {
      setLoading(false);
      setError('Đã xảy ra lỗi khi tạo đơn hàng!');
      console.error('Error creating order:', err);
    }
  };

  // Update product quantity in cart
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await api.put('/customer/cart', { productId, quantity: newQuantity });

      if (response.statusCode === 200) {
        // Update the cart item in the local state after successful update
        const updatedCartItems = cartItems.map(item =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
      } else {
        setError("Không thể cập nhật số lượng sản phẩm.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi cập nhật số lượng sản phẩm.");
      console.error('Error updating product quantity:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove product from cart
  const handleRemoveProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await api.delete(`/customer/cart?productId=${productId}`);

      if (response.statusCode === 200) {
        // Remove the product from the local cart state after successful deletion
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
      } else {
        setError("Không thể xóa sản phẩm khỏi giỏ hàng.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi xóa sản phẩm.");
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.cart}>
      <Header />
      <div className={styles.container}>
        <div className={styles.divider}></div>

        <h1 className={styles.title}>Order Summary</h1>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            {loading ? (
              <Loading />
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <OrderSummary
                cartItems={cartItems}
                userInfo={userInfo}
                onCheckout={handleCheckout}
                onQuantityChange={handleQuantityChange} // Pass down to OrderSummary
                onRemoveProduct={handleRemoveProduct} // Pass down to OrderSummary
              />
            )}
          </div>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </main>
  );
};
