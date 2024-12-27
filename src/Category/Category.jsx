import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
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
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productsPerPage = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products", {
        params: {
          page: 0,
          limit: 10,
          ...Object.fromEntries(searchParams),
        },
      });
      if (response?.data) {
        const { products, total_pages } = response.data;
        setAllProducts(products || []);
        setFilteredProducts(products || []);
        setTotalPages(total_pages || 1);
      } else {
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
 
  const filterProducts = () => {
    const { priceRange = [0, Infinity], categories = [] } = filterCriteria;

    const filtered = allProducts.filter((product) => {
      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const inCategory =
        categories.length === 0 || categories.includes(product.category);
      return inPriceRange && inCategory;
    });

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
  };

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
      <Helmet>
        <title>Danh Mục Sản Phẩm - Thuê Máy Ảnh, Flycam, Thiết Bị Công Nghệ</title>
        <meta
          name="description"
          content="Tìm kiếm và thuê máy ảnh, flycam, thiết bị công nghệ chất lượng cao với giá tốt nhất tại Bee RushTech. Khám phá các sản phẩm đa dạng và dễ dàng đặt hàng ngay hôm nay!"
        />
        <meta
          name="keywords"
          content="thuê máy ảnh, thuê flycam, danh mục sản phẩm, thiết bị công nghệ, dịch vụ cho thuê"
        />
        <meta name="author" content="Bee RushTech" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Danh Mục Sản Phẩm - Bee RushTech" />
        <meta
          property="og:description"
          content="Khám phá danh mục sản phẩm đa dạng từ máy ảnh, flycam đến thiết bị công nghệ hiện đại. Đặt thuê ngay tại Bee RushTech!"
        />
      </Helmet>

      <Header />
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.productCount}>
            Showing {displayedProducts.length} of {filteredProducts.length} Products
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
              <p>No products found</p>
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
