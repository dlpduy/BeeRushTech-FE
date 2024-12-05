import React, { useState, useEffect, useCallback } from "react";
import { Header } from "../MutualComponents/Header/Header";
import { CartItem } from "./components/CartItem/CartItem";
import Checkout from "./Checkout";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import Loading from "../MutualComponents/Loading/Loading";
import { Footer } from "../MutualComponents/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api"; // Import api.js để gọi API
import styles from "./Cart.module.css";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng mặc định trống
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading khi đang lấy dữ liệu
  const [error, setError] = useState(null); // Quản lý trạng thái lỗi
  const [userInfo, setUserInfo] = useState(null); // Thông tin người dùng
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy sản phẩm trong giỏ hàng từ API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/customer/cart'); // Gọi API để lấy dữ liệu giỏ hàng
        if (response.statusCode === 200) {
          console.log(response);
          setCartItems(response.data); // Cập nhật giỏ hàng nếu lấy dữ liệu thành công
        } else {
          setError('Không thể lấy dữ liệu giỏ hàng, vui lòng thử lại.');
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
        setError("Lỗi không xác định khi gọi API.");
      } finally {
        setLoading(false); // Đặt lại trạng thái loading sau khi lấy dữ liệu xong
      }
    };

    fetchCartItems();
  }, []); // Chỉ gọi API một lần khi component được mount

  // Lấy thông tin người dùng (có thể từ localStorage hoặc API)
  useEffect(() => {
    const fetchUserInfo = async () => {
      // Giả sử thông tin người dùng đã được lưu trong localStorage (ví dụ: user_info)
      const user = JSON.parse(localStorage.getItem("user_info"));
      if (user) {
        setUserInfo(user); // Nếu có, lưu thông tin vào state
      }
    };

    fetchUserInfo();
  }, []);


  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = useCallback(
    async (id, newQuantity) => {
      try {
        const response = await api.put('/customer/cart', { productId: id, quantity: newQuantity });
        if (response.statusCode === 200) {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.productId === id ? { ...item, quantity: newQuantity } : item
            )
          );
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
      }
    },
    [setCartItems]
  );

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = useCallback(
    async (id) => {
      try {
        const response = await api.delete(`/customer/cart?productId=${id}`);
        console.log(response);
        if (response.statusCode === 200) {
          setCartItems((prevItems) => prevItems.filter((item) => item.productId !== id));
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      }
    },
    [setCartItems]
  );

  // Tính toán tổng tiền giỏ hàng
  const subtotal = cartItems.reduce((acc, item) => acc + item.priceProduct * item.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = subtotal > 0 ? 50000 : 0;
  const total = subtotal - discount + deliveryFee;

  // API tạo đơn hàng
  const createOrder = async () => {
    if (!userInfo) {
      setError("Không có thông tin người dùng, vui lòng đăng nhập.");
      return;
    }

    const orderData = {
      user_id: userInfo.user_id, // ID người dùng
      fullname: userInfo.fullname, // Tên đầy đủ
      email: userInfo.email, // Email
      phone_number: userInfo.phone_number, // Số điện thoại
      address: userInfo.address, // Địa chỉ
      note: "Cảm ơn bạn đã mua sắm!", // Ghi chú
      total_money: total, // Tổng tiền
      shipping_method: "Giao hàng nhanh", // Phương thức giao hàng
      payment_method: "Thanh toán qua thẻ tín dụng", // Phương thức thanh toán
      shipping_address: userInfo.address, // Địa chỉ giao hàng
    };

    try {
      const response = await api.post("/orders", orderData);
      if (response.status === 200) {
        alert("Đơn hàng của bạn đã được tạo thành công!");
        navigate("/order-success"); // Chuyển hướng đến trang thành công
      } else {
        setError("Không thể tạo đơn hàng. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      setError("Lỗi khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };

  const handleCheckout = () => {
    navigate("/cart/checkout");
  };

  const handlePayment = () => {
    createOrder(); // Gọi API tạo đơn hàng khi người dùng nhấn "Pay"
  };

  return (
    <main className={styles.cart}>
      <Header />

      <div className={styles.container}>
        <div className={styles.divider}></div>

        <h1 className={styles.title}>
          {location.pathname === "/cart/checkout" ? "Payment Methods" : "Your Cart"}
        </h1>

        <div className={styles.content}>
          <section className={styles.cartItems}>
            {location.pathname === "/cart/checkout" ? (
              <Checkout onPay={handlePayment} /> // Gọi hàm handlePayment khi nhấn "Pay"
            ) : loading ? (
              <div><Loading/></div>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : cartItems.length ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.productId}
                  {...item}
                  onQuantityChange={(newQuantity) => updateQuantity(item.productId, newQuantity)}
                  onRemove={() => removeItem(item.productId)}
                />
              ))
            ) : (
              <p>Your cart is empty!</p>
            )}
          </section>

          <aside className={styles.sidebar}>
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
              isCheckout={location.pathname === "/cart/checkout"}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </main>
  );
};
