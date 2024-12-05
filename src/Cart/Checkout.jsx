import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import styles from "./Checkout.module.css";

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    note: "",
    payment_method: "CREDIT",
    order_method: "home",
    shipping_address: "",
    time_renting: 1, // Default time for renting
  });
  const [paymentLink, setPaymentLink] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));
    if (user) {
      setFormData({
        ...formData,
        full_name: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        shipping_address: user.address,
      });
    }
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Tạo payload cho API từ giỏ hàng và thông tin người dùng
    const orderPayload = {
      full_name: formData.full_name,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      note: formData.note,
      payment_method: formData.payment_method,
      shipping_address: formData.shipping_address,
      time_renting: formData.time_renting, // Thêm time_renting vào payload
      list_order_detail: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.priceProduct
      })),
      total_money: cartItems.reduce((acc, item) => acc + item.priceProduct * item.quantity, 0),
    };

    try {
      const response = await axios.post(`/api/v1/orders`, orderPayload);
      if (response.data.payment_url) {
        setPaymentLink(response.data.payment_url); // Lưu URL thanh toán
        showToast("Tạo đơn hàng thành công.");
      } else {
        showToast("Không thể tạo đơn hàng, vui lòng thử lại.");
      }
    } catch (error) {
      showToast("Đã có lỗi xảy ra khi tạo đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkout}>
      <h3>Nhập thông tin đặt hàng</h3>
      <form onSubmit={handleCreateOrder} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Note:</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Shipping Address:</label>
          <input
            type="text"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Time Renting (Days):</label>
          <input
            type="number"
            name="time_renting"
            min="1"
            value={formData.time_renting}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Payment Method:</label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
          >
            <option value="CREDIT">CREDIT</option>
            <option value="CASH">CASH</option>
          </select>
        </div>
        <button
          type="submit"
          className={styles.payButton}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Tạo đơn hàng"}
        </button>
      </form>

      {paymentLink && (
        <div className={styles.qrContainer}>
          <h4>Thanh toán qua VNPay</h4>
          <QRCode value={paymentLink} size={150} />
          <p>Quét mã QR để thanh toán.</p>
        </div>
      )}

      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
};

export default Checkout;
