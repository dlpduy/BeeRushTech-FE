import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios"; // Thêm thư viện axios
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./Product/component/ProductCard";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";
import Loading from "../MutualComponents/Loading/Loading";
import styles from "./Category.module.css";

// Import mock data từ file JSON
import { mockProducts } from "../Category/mockData";

const Category = () => {
  const [products, setProducts] = useState([]); // Các sản phẩm hiển thị
  const [filterCriteria, setFilterCriteria] = useState({}); // Các tiêu chí lọc
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
  const [searchParams] = useSearchParams(); // Lấy tham số từ URL
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading

  // Lấy các sản phẩm từ backend hoặc mock data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Gọi API từ backend để lấy sản phẩm
        const response = await axios.get("/api/products"); // Thay URL với API endpoint thực tế
        setProducts(response.data); // Cập nhật sản phẩm từ API
      } catch (error) {
        console.error("Error fetching products:", error);
        // Nếu có lỗi, sử dụng mock data
        setProducts(mockProducts);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchProducts();
  }, []); // Chỉ chạy một lần khi component mount

  // Lọc sản phẩm theo các tiêu chí
  useEffect(() => {
    const applyFilters = () => {
      let filteredProducts = [...products];

      // Lọc sản phẩm theo URL params (nếu có)
      if (searchParams.get("filter") === "onsale") {
        filteredProducts = filteredProducts.filter((product) => product.onsale);
      } else if (searchParams.get("filter") === "new") {
        filteredProducts = filteredProducts.filter((product) => product.new);
      } else if (searchParams.get("filter") === "hotitem") {
        filteredProducts = filteredProducts.filter((product) => product.hotitem);
      }

      // Áp dụng các filter criteria (nếu có)
      if (filterCriteria.sort === "priceAsc") {
        filteredProducts.sort((a, b) => a.price - b.price); // Sắp xếp theo giá tăng dần
      } else if (filterCriteria.sort === "priceDesc") {
        filteredProducts.sort((a, b) => b.price - a.price); // Sắp xếp theo giá giảm dần
      }

      setProducts(filteredProducts);
    };

    applyFilters();
  }, [filterCriteria, searchParams, products]); // Re-run khi có thay đổi trong filterCriteria hoặc searchParams

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Điều hướng phân trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.category}>
      {/* Header */}
      <Header />

      <div className={styles.container}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.productCount}>
            Showing {currentProducts.length} of {products.length} Products
          </div>
          <div className={styles.sortOptions}>
            <label>Sort by:</label>
            <select
              onChange={(e) =>
                setFilterCriteria({ ...filterCriteria, sort: e.target.value })
              }
            >
              <option value="popular">Most Popular</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className={styles.content}>
          {/* Sidebar */}
          <aside className={styles.filter_container}>
            <FilterSidebar setFilterCriteria={setFilterCriteria} />
          </aside>

          {/* Product Listing */}
          <section className={styles.sidebar}>
            {loading ? (
              <Loading /> // Hiển thị loading khi đang tải sản phẩm
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </section>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                className={`${styles.paginationButton} ${
                  currentPage === index + 1 ? styles.active : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Category;
