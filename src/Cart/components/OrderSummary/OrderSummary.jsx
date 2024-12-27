import React, { useState } from "react";
import styles from './OrderSummary.module.css';

const OrderSummary = ({ 
  cartItems, 
  userInfo, 
  onCheckout, 
  onQuantityChange, 
  onRemoveProduct 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('CREDIT');
  const [note, setNote] = useState('hàng dễ vỡ');
  const [shippingAddress, setShippingAddress] = useState(userInfo ? userInfo.address : '');
  const [successMessage, setSuccessMessage] = useState('');
  const [timeRenting, setTimeRenting] = useState(1); // Số giờ thuê chung (default = 1)

  // Tăng thời gian thuê
  const handleIncreaseTimeRenting = () => {
    setTimeRenting((prev) => prev + 1);
  };

  // Giảm thời gian thuê
  const handleDecreaseTimeRenting = () => {
    if (timeRenting > 1) {
      setTimeRenting((prev) => prev - 1);
    }
  };

  // Cập nhật thời gian thuê bằng input
  const handleTimeRentingChange = (event) => {
    const newTimeRenting = parseInt(event.target.value, 10);
    if (newTimeRenting >= 1) {
      setTimeRenting(newTimeRenting);
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Handle note change
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  // Handle shipping address change
  const handleShippingAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      onQuantityChange(productId, item.quantity + 1);
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
      onQuantityChange(productId, item.quantity - 1);
    }
  };

  // Handle quantity change via input
  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      onQuantityChange(productId, newQuantity);
    }
  };

  // Handle remove product
  const handleRemoveProduct = (productId) => {
    onRemoveProduct(productId);
    setSuccessMessage('Product removed from cart successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle checkout
  const handleCheckout = () => {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      time_renting: timeRenting, // Gán số giờ thuê chung
    }));
    onCheckout(updatedCartItems);
  };

  return (
    <section className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>

      {/* Customer Information */}
      <div className={styles.customerInfo}>
        <h3>Customer Information</h3>
        <div className={styles.infoRow}>
          <span className={styles.label}>Full Name:</span>
          <span className={styles.value}>{userInfo?.fullName || "N/A"}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{userInfo?.email || "N/A"}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>{userInfo?.phoneNumber || "N/A"}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>{userInfo?.address || "N/A"}</span>
        </div>
      </div>

      {/* Time Renting Input */}
      <div className={styles.timeRenting}>
        <h3>Time Renting (Hours)</h3>
        <div className={styles.quantityWrapper}>
          <button 
            className={styles.quantityButton} 
            onClick={handleDecreaseTimeRenting}
          >
            -
          </button>
          <input
            type="number"
            value={timeRenting}
            onChange={handleTimeRentingChange}
            className={styles.quantityInput}
            min="1"
          />
          <button 
            className={styles.quantityButton} 
            onClick={handleIncreaseTimeRenting}
          >
            +
          </button>
        </div>
      </div>

      {/* Order Details */}
      <div className={styles.orderDetails}>
        <h3>Order Details</h3>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span className={styles.tableHeaderItem}>Product</span>
            <span className={styles.tableHeaderItem}>Quantity</span>
            <span className={styles.tableHeaderItem}>Price</span>
            <span className={styles.tableHeaderItem}>Action</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.productId} className={styles.tableRow}>
              <span className={styles.tableItem}>{item.name}</span>
              <span className={styles.tableItem}>
                <div className={styles.quantityWrapper}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleDecreaseQuantity(item.productId)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId, e)}
                    className={styles.quantityInput}
                    min="1"
                  />
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleIncreaseQuantity(item.productId)}
                  >
                    +
                  </button>
                </div>
              </span>
              <span className={styles.tableItem}>{item.priceProduct.toFixed(2)} VND</span>
              <span className={styles.tableItem}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveProduct(item.productId)}
                >
                  Xóa
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {/* Payment Method Selection */}
      <div className={styles.paymentMethod}>
        <h3>Payment Method</h3>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="CREDIT"
              checked={paymentMethod === 'CREDIT'}
              onChange={handlePaymentMethodChange}
            />
            Credit
          </label>
          <label>
            <input
              type="radio"
              value="CASH"
              checked={paymentMethod === 'CASH'}
              onChange={handlePaymentMethodChange}
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* Shipping Address Input */}
      <div className={styles.shippingAddressInput}>
        <h3>Shipping Address</h3>
        <input
          type="text"
          value={shippingAddress}
          onChange={handleShippingAddressChange}
          placeholder="Enter shipping address"
          className={styles.input}
        />
      </div>

      {/* Note Input */}
      <div className={styles.noteInput}>
        <h3>Order Note</h3>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Enter any special instructions..."
          className={styles.textarea}
        />
      </div>

      {/* Checkout Button */}
      <button
        className={styles.checkoutButton}
        onClick={handleCheckout}
      >
        Place Order
      </button>
    </section>
  );
};

export default OrderSummary;
