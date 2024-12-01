import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HeaderLog.module.css';

export const HeaderLog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignIn = () => {
    navigate('/signin');
    setIsDropdownOpen(false);
  };

  const handleSignUp = () => {
    navigate('/signup');
    setIsDropdownOpen(false);
  };

  const handleForgotPassword = () => {
    navigate('/resetpassword');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc09774b4dd341bcb6a90cb4b35b19922586f4028b83c62a4e7d616d3addb3e?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
              alt="Bee RushTech Logo" 
              className={styles.logo} 
            />
          </Link>
          <Link to="/" className={styles.brandName}>
            <h1>Bee RushTech</h1>
          </Link>
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
              <Link to="/category" className={styles.navLink} aria-label="New Arrivals">
                New Arrivals
              </Link>
            </li>
          </ul>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className={styles.userActions}>
            <button className={styles.iconButton} aria-label="User account" onClick={toggleDropdown}>
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2f89bc29975d179540a0a77d4a46123ef4301f3712d8e4aa60395a3d5ca0f65?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                alt="User Account" 
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
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className={styles.dropdownMenu}>
              <div className={styles.authButton}>
              <button onClick={handleSignIn} className={styles.dropdownItem}>Sign In</button>
              <button onClick={handleSignUp} className={styles.dropdownItem}>Sign Up</button>
              </div>
              <div className={styles.forget}>
              <button onClick={handleForgotPassword} >Forgot Password?</button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
