import React, { useState } from "react";
import api from "../../api";
import styles from "./OrderCard.module.css";

const OrderCard = ({
  full_name,
  order_date,
  email,
  phone_number,
  shipping_address,
  note,
  total_money,
  payment_method,
  id,
  status,
  price,
  tracking_number,
  payment_url,
}) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState(""); // Lưu trạng thái mới
  const [methodReturn, setMethodReturn] = useState("home"); // Lưu phương thức return

  // Đóng pop-up chi tiết
  const handleCloseDetailModal = () => setShowDetailModal(false);

  // Mở pop-up chi tiết
  const handleShowDetailModal = () => setShowDetailModal(true);

  // Đóng pop-up cập nhật
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setNewStatus("");
    setMethodReturn("");
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'cancelled':
        return 'Đã hủy';
      case 'confirmed':
        return 'Xác nhận';
      case 'received':
        return 'Đã nhận';
      default:
        return 'Trạng thái không xác định'; // Trường hợp nếu status không phải pending hoặc cancelled
    }
  };

  // Mở pop-up cập nhật
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = async (id) => {
    if (!newStatus || (newStatus === "return" && !methodReturn)) {
      alert("Please select a status and method return if applicable.");
      return;
    }
    console.log("Payload Sent:", {
      orderId: id,
      status: newStatus,
      methodReturn: newStatus === "return" ? methodReturn : "undefined",
    });

    try {
      const response = await api.put(`/orders/customer/handle`, {
        orderId: id,
      status: newStatus,
      methodReturn: newStatus === "return" ? methodReturn : "undefined",
    });

      console.log(response);
      if (response === "Order handled successfully") {
        console.log(`Order ${id} status updated to ${newStatus}`);
        alert(`Order status updated to ${newStatus}`);
        handleCloseUpdateModal(); // Đóng pop-up sau khi cập nhật
      } else {
        console.error("Failed to update order status");
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("An error occurred while updating the status");
    } finally {
      setLoading(false);
    }
  };

  const handleClickPay = () => {
    if (payment_url && payment_method !== null && payment_url !== "") {
      window.open(payment_url, "_blank", "noopener,noreferrer");
    } else {
      console.log(payment_url);
    }
  };

  return (
    <article className={styles.OrderItem}>
      <div className={styles.orderDetails}>
    <div className={styles.mainDetail}>
      <div className={styles.orderInfo}>
        <h3 className={styles.orderTitle}>{tracking_number}</h3>
        <div className={styles.orderSpecs}>
          <p className={styles.specText}>
            ID: <span className={styles.specValue}>{id}</span>
          </p>
          <p className={styles.specText}>
            Trạng thái: <span className={styles.specValue}>{getStatusMessage(status)}</span>
          </p>
        </div>
      </div>
      <p className={styles.price}>{}</p>
    </div>
  </div>

  {/* Cụm nút ở bên phải */}
  <div className={styles.actionButtons}>
    <button className={styles.detailButton} onClick={handleShowDetailModal}>
      Xem chi tiết
    </button>
    {status === "pending" && (
      <button className={styles.detailButton} onClick={handleClickPay}>
        Thanh toán
      </button>
    )}
    {status !== "cancelled" && status !== "return" && (
      <button className={styles.detailButton} onClick={handleShowUpdateModal}>
        Cập nhật trạng thái
      </button>
    )}
  </div>

      {/* Pop-up Chi Tiết */}
      {showDetailModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chi tiết đơn hàng</h3>
            <p><strong>ID đơn hàng:</strong> {id}</p>
            <p><strong>Khách hàng:</strong> {full_name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Số điện thoại:</strong> {phone_number}</p>
            <p><strong>Địa chỉ:</strong> {shipping_address}</p>
            <p><strong>Ghi chú:</strong> {note}</p>
            <p><strong>Trạng thái:</strong> {status}</p>
            <p><strong>Tổng tiền:</strong> {total_money}</p>
            <p><strong>Phương thức thanh toán:</strong> {payment_method}</p>
            <p><strong>Mã vận chuyển:</strong>{tracking_number}</p>
            <p><strong>Ngày đặt hàng:</strong> {order_date}</p>
            <button
              onClick={handleCloseDetailModal}
              className={styles.closeButton}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Pop-up Cập Nhật Trạng Thái */}
      {showUpdateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Cập nhật trạng thái</h3>
            <p><strong>Mã đơn hàng:</strong> {id}</p>
            <div>
              <label>
                <strong>Trạng thái mới:</strong>
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Chọn trạng thái</option>
                <option value="cancelled">Hủy</option>
                <option value="return">Trả</option>
              </select>
            </div>
           
              <div>
                <label>
                  <strong>Phương thức trả:</strong>
                </label>
                <select
                  value={methodReturn}
                  onChange={(e) => setMethodReturn(e.target.value)}
                >
                  <option value="">Chọn phương thức</option>
                  <option value="home">Tại nhà</option>
                  <option value="store">Tại cửa hàng</option>
                </select>
              </div>

            <button
              onClick={() => handleUpdateStatus(id)}
              className={styles.updateButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Xác nhận"}
            </button>
            <button
              onClick={handleCloseUpdateModal}
              className={styles.closeButton}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default OrderCard;
