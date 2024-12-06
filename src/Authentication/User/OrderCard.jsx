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

  // Mở pop-up cập nhật
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = async () => {
    if (!newStatus || (newStatus === "return" && !methodReturn)) {
      alert("Please select a status and method return if applicable.");
      return;
    }

    try {
      const response = await api.put(`/orders/customer/handle`, {
        orderId: id,
      status: newStatus,
      methodReturn: newStatus === "return" ? methodReturn : undefined,
    });

    console.log("Payload Sent:", {
      orderId: id,
      status: newStatus,
      methodReturn: newStatus === "return" ? methodReturn : undefined,
    });
      console.log(response);
      if (response === "successfully") {
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
                Status: <span className={styles.specValue}>{status}</span>
              </p>
            </div>
          </div>
          <p className={styles.price}>{price}</p>
        </div>
        <button className={styles.detailButton} onClick={handleShowDetailModal}>
          View Details
        </button>
        {status === "pending" && (
          <button className={styles.detailButton} onClick={handleClickPay}>
            Pay
          </button>
        )}
        {status !== "cancelled" && status !== "return" && (
          <button className={styles.detailButton} onClick={handleShowUpdateModal}>Update Status</button>
        )}
      </div>

      {/* Pop-up Chi Tiết */}
      {showDetailModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {id}</p>
            <p><strong>Customer:</strong> {full_name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone_number}</p>
            <p><strong>Address:</strong> {shipping_address}</p>
            <p><strong>Note:</strong> {note}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Total Amount:</strong> {total_money}</p>
            <p><strong>Payment Method:</strong> {payment_method}</p>
            <p><strong>Tracking Number:</strong>{tracking_number}</p>
            <p><strong>Order Date:</strong> {order_date}</p>
            <button
              onClick={handleCloseDetailModal}
              className={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pop-up Cập Nhật Trạng Thái */}
      {showUpdateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Update Order Status</h3>
            <p><strong>Order ID:</strong> {id}</p>
            <div>
              <label>
                <strong>New Status:</strong>
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="cancelled">Cancelled</option>
                <option value="return">Return</option>
              </select>
            </div>
            {newStatus === "return" && (
              <div>
                <label>
                  <strong>Method Return:</strong>
                </label>
                <select
                  value={methodReturn}
                  onChange={(e) => setMethodReturn(e.target.value)}
                >
                  <option value="">Select Method</option>
                  <option value="home">Home</option>
                  <option value="store">Store</option>
                </select>
              </div>
            )}
            <button
              onClick={handleUpdateStatus}
              className={styles.updateButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Submit"}
            </button>
            <button
              onClick={handleCloseUpdateModal}
              className={styles.closeButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default OrderCard;
