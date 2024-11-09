import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderLog.module.css';

export const HeaderLog = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <h1 className={styles.brandName}>Bee RushTech</h1>
        </div>
        <nav className={styles.navigation}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <button className={styles.navLink} aria-label="Shop">
                Shop
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/da12b8eefe15ff5bc4f7a73f8781800b28d6f8ef9aebf5606225c547d050f871?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                  alt="" 
                  className={styles.navIcon} 
                />
              </button>
            </li>
            <li className={styles.navItem}>
              <button className={styles.navLink} aria-label="On Sale">On Sale</button>
            </li>
            <li className={styles.navItem}>
              <button className={styles.navLink} aria-label="New Arrivals">New Arrivals</button>
            </li>
            <li className={styles.navItem}>
              <button className={styles.navLink} aria-label="Brands">Brands</button>
            </li>
          </ul>
          <form className={styles.searchForm}>
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff51d6d73b2602b73b1b063ab5578dbe4e06bf0658624a0ee1600630463f910d?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
              alt="" 
              className={styles.searchIcon} 
            />
            <input
              type="search"
              placeholder="Search for products..."
              className={styles.searchInput}
              aria-label="Search for products"
            />
          </form>
          <div className={styles.userActions}>
            <button className={styles.iconButton} aria-label="User account">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2f89bc29975d179540a0a77d4a46123ef4301f3712d8e4aa60395a3d5ca0f65?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                alt="" 
                className={styles.actionIcon} 
              />
            </button>
            <Link to="/cart" className={styles.iconButton} aria-label="Shopping cart">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/09c2e3728b2f0f7dddbac6f2c62c8e03db02aac0aa5ea5dcd0026fe3910c57f1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                alt="Shopping Cart" 
                className={styles.actionIcon} 
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};



