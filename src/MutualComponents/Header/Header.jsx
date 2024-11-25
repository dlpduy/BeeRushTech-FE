import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // Axios instance
import styles from "./Header.module.css";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Gợi ý tìm kiếm
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Ref cho menu dropdown
  const navigate = useNavigate();

  // Lấy danh sách gợi ý khi người dùng nhập vào thanh tìm kiếm
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await api.get(`/products?search=${encodeURIComponent(searchQuery)}`);
          setSuggestions(response.data.products || []);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Chuyển trạng thái dropdown
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false); // Đóng dropdown
  };

  const handleSignIn = () => {
    navigate("/signin");
    closeDropdown(); // Đóng dropdown khi chuyển hướng
  };

  const handleSignUp = () => {
    navigate("/signup");
    closeDropdown(); // Đóng dropdown khi chuyển hướng
  };

  const handleForgotPassword = () => {
    navigate("/resetpassword");
    closeDropdown(); // Đóng dropdown khi chuyển hướng
  };

  // Đóng dropdown khi nhấp ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryNavigation = (type) => {
    closeDropdown(); // Đóng dropdown trước khi chuyển hướng
    switch (type) {
      case "onsale":
        navigate(`/category?filter=onsale`);
        break;
      case "new":
        navigate(`/category?filter=new`);
        break;
      default:
        break;
    }
  };

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
              <button className={styles.navLink} aria-label="Shop">Shop</button>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navLink}
                aria-label="On Sale"
                onClick={() => handleCategoryNavigation("onsale")}
              >
                On Sale
              </button>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.navLink}
                aria-label="New Arrivals"
                onClick={() => handleCategoryNavigation("new")}
              >
                New Arrivals
              </button>
            </li>
            <li className={styles.navItem}>
              <Link to="/category" className={styles.navLink} aria-label="Brands">
                Brands
              </Link>
            </li>
          </ul>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff51d6d73b2602b73b1b063ab5578dbe4e06bf0658624a0ee1600630463f910d?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
              alt="Search Icon"
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
            {/* Hiển thị gợi ý tìm kiếm */}
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className={styles.suggestionItem}
                    onClick={() => navigate(`/product-info/${item.id}`)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <div className={styles.userActions}>
            <button
              className={styles.iconButton}
              aria-label="User account"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
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
              <button onClick={handleSignIn} className={styles.dropdownItem}>
                Sign In
              </button>
              <button onClick={handleSignUp} className={styles.dropdownItem}>
                Sign Up
              </button>
              </div>
              <button onClick={handleForgotPassword} className={styles.forget}>
                Forgot Password?
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
