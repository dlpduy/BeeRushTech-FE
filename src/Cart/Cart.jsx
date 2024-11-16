import React, { useState } from 'react';
import { Header } from '../MutualComponents/Header/Header';
import { CartItem } from './components/CartItem/CartItem';
import { OrderSummary } from './components/OrderSummary/OrderSummary';
import NewsletterSection from '../MutualComponents/Newsletter/Newsletter';
import { Footer } from '../MutualComponents/Footer/Footer';
import styles from './Cart.module.css';

const initialCartItems = [
  {
    id: 1,
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    title: 'Gradient Graphic T-shirt',
    size: 'Large', 
    color: 'White',
    price: 145,
    quantity: 1
  },
  {
    id: 2,
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    title: 'Checkered Shirt',
    size: 'Medium',
    color: 'Red',
    price: 180,
    quantity: 1
  },
  {
    id: 3,
    image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d07bc4911a6420610641cd1d5c59b0319418027d239c31f5aa62a2bdb2e96ec1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    title: 'Skinny Fit Jeans',
    size: 'Large',
    color: 'Blue',
    price: 240,
    quantity: 1
  }
];

export const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <main className={styles.cart}>
      <Header />
      
      <div className={styles.container}>
      <div className={styles.divider}></div>
        <nav className={styles.breadcrumb}>
          <button className={styles.breadcrumbLink} aria-label="Home">Home</button>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5eb0a4928570b7fed31b03a3380bdd7847d7602a5565615f9e54341907dfa?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
            alt="" 
            className={styles.breadcrumbIcon} 
          />
          <span className={styles.breadcrumbCurrent}>Cart</span>
        </nav>
        
        <h1 className={styles.title}>Your cart</h1>
        
        <div className={styles.content}>
          <section className={styles.cartItems}>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                {...item}
                onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </section>
          
          <aside className={styles.sidebar}>
            <OrderSummary subtotal={subtotal} discount={discount} deliveryFee={deliveryFee} total={total} />
          </aside>
        </div>
        
        <NewsletterSection />
      </div>
      <Footer />
    </main>
  );
};
