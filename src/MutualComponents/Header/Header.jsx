import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // Axios instance
import styles from "./Header.module.css";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // Gợi ý tìm kiếm
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái dropdown
  const [userRole, setUserRole] = useState(null); // Vai trò người dùng
  const dropdownRef = useRef(null); // Ref cho menu dropdown
  const navigate = useNavigate();

  // Lấy role từ localStorage khi component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setUserRole(storedRole || null);
  }, []);

  // Fetch gợi ý tìm kiếm khi người dùng nhập liệu
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await api.get(`/products/search`, {
            params: { query: searchQuery },
          });
          setSuggestions(response.data.products || []);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    // Thêm debounce để giảm tần suất gọi API
    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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

  // Xử lý đăng xuất
  const handleSignOut = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    setUserRole(null);
    navigate("/");
  };

  // Điều hướng theo danh mục
  const handleCategoryNavigation = (type) => {
    switch (type) {
      case "onsale":
        navigate(`/category?filter=onsale`);
        break;
      case "new":
        navigate(`/category?filter=new`);
        break;
      default:
        navigate(`/category`);
    }
  };

  // Xử lý khi click icon user
  const handleUserAction = () => {
    if (userRole === "ADMIN") {
      navigate("/admin");
    } else if (userRole === "CUSTOMER") {
      navigate("/user");
    } else {
      setIsDropdownOpen((prevState) => !prevState);
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
            <li>
              <button onClick={() => handleCategoryNavigation("shop")} className={styles.navLink}>Shop</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNavigation("onsale")} className={styles.navLink}>On Sale</button>
            </li>
            <li>
              <button onClick={() => handleCategoryNavigation("new")} className={styles.navLink}>New Arrivals</button>
            </li>
          </ul>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => navigate(`/product-info/${item.id}`)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <div className={styles.userActions}>
            <button onClick={handleUserAction} ref={dropdownRef}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2f89bc29975d179540a0a77d4a46123ef4301f3712d8e4aa60395a3d5ca0f65?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
                alt="User Account"
              />
            </button>
            <Link to="/cart">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/09c2e3728b2f0f7dddbac6f2c62c8e03db02aac0aa5ea5dcd0026fe3910c57f1?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
                alt="Cart"
              />
            </Link>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu} ref={dropdownRef}>
              {userRole ? (
                <>
                  <button onClick={handleSignOut}>Sign Out</button>
                  {userRole === "ADMIN" && <button onClick={() => navigate("/admin")}>Admin Dashboard</button>}
                  {userRole === "CUSTOMER" && <button onClick={() => navigate("/user")}>User Profile</button>}
                </>
              ) : (
                <>
                  <div className={styles.authButton}>
              <button onClick={handleSignIn} className={styles.dropdownItem}>Sign In</button>
              <button onClick={handleSignUp} className={styles.dropdownItem}>Sign Up</button>
              </div>
              <div className={styles.forget}>
              <button onClick={handleForgotPassword} >Forgot Password?</button>
              </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
