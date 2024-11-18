import React, { useState } from "react";
import { Header } from "../MutualComponents/Header/Header";
import { CartItem } from "./components/CartItem/CartItem";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import { Footer } from "../MutualComponents/Footer/Footer";
import Checkout from "./Checkout";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

const initialCartItems = [
  {
    id: 1,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8",
    title: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
  },
  {
    id: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8",
    title: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
  },
  {
    id: 3,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8",
    title: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
  },
];

export const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const location = useLocation();
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    navigate("/cart/checkout");
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
              <Checkout onPay={() => alert("Payment successful!")} />
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onQuantityChange={(newQuantity) =>
                    updateQuantity(item.id, newQuantity)
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))
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
