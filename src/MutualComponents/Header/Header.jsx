import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // Axios instance
import styles from "./Header.module.css";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
  const [suggestions, setSuggestions] = useState([]); // Gợi ý tìm kiếm
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Ref cho menu dropdown
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Giả sử bạn lưu token trong localStorage
        if (token) {
          const response = await api.get("/auth/role", { headers: { Authorization: `Bearer ${token}` } });
          setUserRole(response.data.role); // Lấy role từ API
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null); // Nếu có lỗi, coi như chưa đăng nhập
      }
    };

    fetchUserRole(); // Gọi API khi component mount
  }, []);
  // Lấy danh sách gợi ý khi người dùng nhập vào thanh tìm kiếm
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim()) {
        try {
          // Gọi API tìm kiếm sản phẩm
          const response = await api.get(`/products/search`, {
            params: { query: searchQuery }, // Thêm query vào tham số
          });
          setSuggestions(response.data.products || []);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]); // Nếu có lỗi, xóa gợi ý
        }
      } else {
        setSuggestions([]); // Nếu không có từ khóa tìm kiếm, xóa gợi ý
      }
    };

    fetchSuggestions(); // Gọi API mỗi khi searchQuery thay đổi
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Điều hướng tới trang tìm kiếm kết quả
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
  const handleSignOut = () => {
    // Xóa token khỏi localStorage hoặc làm bất kỳ thao tác nào liên quan đến đăng xuất
    localStorage.removeItem("authToken"); // Giả sử bạn lưu token trong localStorage
    setUserRole(null); // Reset vai trò người dùng
    navigate("/"); // Điều hướng về trang chủ hoặc trang khác sau khi đăng xuất
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
      case "shop":
        navigate(`/category`);
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
              <button 
                className={styles.navLink} 
                aria-label="Shop"
                onClick={() => handleCategoryNavigation("shop")}
              >
                Shop
              </button>
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
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật searchQuery
            />
            {/* Hiển thị gợi ý tìm kiếm */}
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className={styles.suggestionItem}
                    onClick={() => navigate(`/product-info/${item.id}`)} // Điều hướng tới sản phẩm khi nhấp
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
    {/* Nếu người dùng đã đăng nhập */}
    {userRole ? (
      <>
        {userRole === "admin" ? (
          // Nếu người dùng là admin
          <button onClick={() => navigate("/admin")} className={styles.dropdownItem}>
            Admin Dashboard
          </button>
        ) : (
          // Nếu người dùng là customer
          <button onClick={() => navigate("/user")} className={styles.dropdownItem}>
            User Profile
          </button>
        )}
        <button onClick={handleSignOut} className={styles.dropdownItem}>
          Sign Out
        </button>
      </>
    ) : (
      // Nếu người dùng chưa đăng nhập
      <div className={styles.authButton}>
        <button onClick={handleSignIn} className={styles.dropdownItem}>
          Sign In
        </button>
        <button onClick={handleSignUp} className={styles.dropdownItem}>
          Sign Up
        </button>
      </div>
    )}
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
