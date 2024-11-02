import React from 'react';
import styles from './OrderSummary.module.css';

export const OrderSummary = ({ subtotal, discount, deliveryFee, total }) => {
  return (
    <section className={styles.summary}>
      <h2 className={styles.title}>Order Summary</h2>
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
      <button className={styles.checkoutButton}>Go to Checkout</button>
    </section>
  );
};
