import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderSummary.module.css';

const OrderSummary = ({ subtotal, discount, deliveryFee, total, isCheckout }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isCheckout) {
      alert('Payment processed successfully!');
    } else {
      // Navigate to checkout page if not already at checkout
      navigate('/cart/checkout');
    }
  };

  return (
    <section className={styles.summary}>
      <h2 className={styles.title}>{isCheckout ? 'Payment Methods' : 'Order Summary'}</h2>
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.value}>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Discount (-20%)</span>
          <span className={styles.discount}>-${discount.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Delivery Fee</span>
          <span className={styles.value}>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.row}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>${total.toFixed(2)}</span>
        </div>
      </div>
      <button className={styles.checkoutButton} onClick={handleAction}>
        {isCheckout ? 'Pay' : 'Go to Checkout'}
      </button>
    </section>
  );
};

export default OrderSummary;
