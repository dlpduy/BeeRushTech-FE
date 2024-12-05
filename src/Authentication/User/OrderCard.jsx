import React from "react";
import { useState } from "react";
import styles from "./OrderCard.module.css";

const OrderCard = ({ full_name, order_date, email, phone_number, shipping_address, note, total_money, payment_method, id, status, price, tracking_number }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  // Hàm đóng pop-up
  const handleCloseDetailModal = () => setShowDetailModal(false);
  // Hàm mở pop-up
  const handleShowDetailModal = () => setShowDetailModal(true);
  return (
    <article className={styles.OderItem}>
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
      </div>
      

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
            <button onClick={handleCloseDetailModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default OrderCard;
