import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./Product/component/ProductCard";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";
import Loading from "../MutualComponents/Loading/Loading";
import styles from "./Category.module.css";


const Category = () => {
  const [allProducts, setAllProducts] = useState([]); // All products from API
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products to display
  const [filterCriteria, setFilterCriteria] = useState({}); // Filter criteria state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const [loading, setLoading] = useState(true); // Loading state
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productsPerPage = 10;

  // Fetch all products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products", {
        params: {
          page:0,
          limit: 9, // Fetch all products to enable client-side filtering
          ...Object.fromEntries(searchParams),
        },
      });
        console.log(response);
      if (response?.data) {
        const { products, total_pages } = response.data;
        setAllProducts(products || []);
        setFilteredProducts(products || []);
        setTotalPages(total_pages || 1);
      } else {
        console.error("Invalid response format", response);
        setAllProducts([]);
        setFilteredProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setAllProducts([]);
      setFilteredProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on price range and other criteria
  const filterProducts = () => {
    const { category, brand, priceRange } = filterCriteria;
  
    const filtered = allProducts.filter((product) => {
      const inCategory = !category || product.category.name === category;
      const inBrand = !brand || product.brand === brand;
      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return inCategory && inBrand && inPriceRange;
    });
  
    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
  };
  

  // Apply filters whenever criteria change
  useEffect(() => {
    filterProducts();
  }, [filterCriteria, allProducts]);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product-info/${productId}`);
  };

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [currentPage, filteredProducts]);

  return (
    <main className={styles.category}>
      <Header />
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.productCount}>
            Hiển thị {displayedProducts.length} trong {filteredProducts.length} sản phẩm
          </div>
        </div>

        <div className={styles.content}>
          <aside className={styles.filter_container}>
            <FilterSidebar
              allProducts={allProducts}
              setFilterCriteria={setFilterCriteria}
            />
          </aside>

          <section className={styles.sidebar}>
            {loading ? (
              <Loading />
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  brand={product.brand}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  thumbnail={product.thumbnail}
                  category={product.category.name}
                  rent_quantity={product.rented_quantity}
                  onClick={() => handleProductClick(product.id)}
                />
              ))
            ) : (
              <p>Không tìm thấy sản phẩm</p>
            )}
          </section>
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${styles.paginationButton} ${
                currentPage === index + 1 ? styles.active : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={styles.paginationButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <NewsletterSection />
      </div>
      <Footer />
    </main>
  );
};

export default Category;
