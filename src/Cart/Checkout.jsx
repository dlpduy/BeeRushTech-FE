import React, { useState } from "react";
import axios from "axios"; // Thư viện axios để gửi yêu cầu HTTP
import QRCode from "react-qr-code"; // Thư viện QR code React
import styles from "./Checkout.module.css";

const Checkout = ({ onPay, total }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentLink, setPaymentLink] = useState(""); // Lưu URL thanh toán từ VNPay
  const [toastMessage, setToastMessage] = useState(""); // Quản lý thông báo
  const [loading, setLoading] = useState(false); // Quản lý trạng thái khi đang gửi yêu cầu thanh toán

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(""); // Ẩn thông báo sau 2 giây
    }, 2000);
  };

  const handlePay = async () => {
    if (paymentMethod === "direct") {
      setLoading(true);
      try {
        // Gửi yêu cầu thanh toán tới backend API
        const response = await axios.get(`/payment/vn-pay`);

        // Giả sử API trả về URL thanh toán VNPay
        setPaymentLink(response.data.data.paymentUrl);
        showToast("Thanh toán thành công. Quét mã QR để hoàn tất.");
      } catch (error) {
        showToast("Đã có lỗi xảy ra trong quá trình thanh toán.");
      } finally {
        setLoading(false);
      }
    } else if (paymentMethod === "store") {
      showToast("Bạn đã chọn thanh toán tại cửa hàng. Vui lòng đến cửa hàng.");
      onPay();
    } else {
      showToast("Vui lòng chọn phương thức thanh toán.");
    }
  };

  const paymentMethods = [
    { method: "direct", label: "Thanh toán trực tiếp (VNPay)" },
    { method: "store", label: "Thanh toán tại cửa hàng" }
  ];

  return (
    <div className={styles.checkout}>
      <h3>Chọn phương thức thanh toán</h3>
      <div className={styles.paymentOptions}>
        {paymentMethods.map((method) => (
          <div key={method.method} className={styles.option}>
            <input
              type="radio"
              id={method.method}
              name="paymentMethod"
              value={method.method}
              onChange={() => setPaymentMethod(method.method)}
            />
            <label htmlFor={method.method}>{method.label}</label>
          </div>
        ))}
      </div>

      {paymentMethod === "direct" && paymentLink && (
        <div className={styles.qrContainer}>
          <h4>Thanh toán qua VNPay</h4>
          <QRCode
            value={paymentLink}  // Dùng URL thanh toán VNPay để tạo mã QR
            size={150}
            fgColor="#000000"
            bgColor="#ffffff"
            level="H"
          />
          <p>Quét mã QR để thanh toán số tiền {total}</p>
        </div>
      )}

      <button
        className={styles.payButton}
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Thanh toán"}
      </button>

      {/* Hiển thị Toast Message */}
      {toastMessage && (
        <div className={styles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Checkout;
