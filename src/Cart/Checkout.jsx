import React from "react";
import styles from "./Cart.module.css";

const Checkout = ({ onPay }) => {
  const handlePay = () => {
    alert("Payment successful!");
    onPay();
  };
  
const paymentMethods = [
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/07b579bdf16d79432ceb4492b7c9eab8bf0e23ba0cb53bef1a92e3dc335fbe77?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'Visa'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f647c4c6f1e9113d1a89f0b9e2a1d9c6dd9169ad1e2991a0ff1efca51497b837?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'MasterCard'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/975a9846a987addae6fd2fc834a93542b096f7bd7b1c050b3f5b65e77ce75d15?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'PayPal'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/23f47b282720e699ac6dd8b954fcd817f414ad5602287b673bc5d61e7b210ae6?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'Apple Pay'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8392bceddda7d3a1813b9209d1db738a4eda28b381755cc11ed098949747454d?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'Google Pay'
  }
];

  return (
    <div className={styles.checkout}>
      <div className={styles.payments}>
          {paymentMethods.map((method, index) => (
            <img
              key={index}
              src={method.src}
              alt={method.alt}
              className={styles.paymentIcon}
            />
          ))}
        </div>
      <form className={styles.form}>
        <h3 className={styles.formTitle}>Enter your Card!</h3>
        
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          className={styles.input}
          required
        />
        
        <label htmlFor="validDate">Valid Date</label>
        <input
          id="validDate"
          type="text"
          placeholder="MM/YY"
          className={styles.input}
          required
        />
        
        <label htmlFor="cvv">CVV</label>
        <input
          id="cvv"
          type="text"
          placeholder="XXX"
          className={styles.input}
          required
        />
        
        <label htmlFor="cardName">Name on Card</label>
        <input
          id="cardName"
          type="text"
          placeholder="Enter your Name"
          className={styles.input}
          required
        />
      </form>
    </div>
  );
};

export default Checkout;
