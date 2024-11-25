import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./Product/component/ProductCard";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";
import api from "../api"; // Axios instance
import styles from "./Category.module.css";

const Category = () => {
    const [products, setProducts] = useState([]);
    const [defaultProducts, setDefaultProducts] = useState([]); // Sản phẩm mặc định
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang
    const [searchParams] = useSearchParams(); // Lấy tham số từ URL

    useEffect(() => {
        const fetchDefaultProducts = async () => {
            try {
                const response = await api.get("/products"); // Lấy toàn bộ sản phẩm mặc định
                setDefaultProducts(response.data.data || []);
            } catch (err) {
                console.error("Error fetching default products:", err);
                setDefaultProducts([]);
            }
        };

        fetchDefaultProducts();
    }, []); // Chỉ gọi một lần khi trang được tải

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Bắt đầu trạng thái tải
                setError(false); // Xóa trạng thái lỗi

                // Thêm tiêu chí lọc từ URL vào filterCriteria
                const filtersFromURL = {};
                if (searchParams.get("filter") === "onsale") {
                    filtersFromURL.onsale = true; // Lọc sản phẩm giảm giá
                } else if (searchParams.get("filter") === "new") {
                    filtersFromURL.new = true; // Lọc sản phẩm mới
                }

                const response = await api.get("/products", {
                    params: { ...filterCriteria, ...filtersFromURL },
                });

                const fetchedProducts = response.data.data || [];
                // Nếu không có sản phẩm nào, hiển thị mặc định
                setProducts(fetchedProducts.length > 0 ? fetchedProducts : defaultProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(true);
                setProducts(defaultProducts); // Sử dụng sản phẩm mặc định khi có lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filterCriteria, searchParams, defaultProducts]);

    // Phân trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Điều hướng phân trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading...</div>;

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
                        {error ? (
                            <p>Failed to fetch products. Showing default products.</p>
                        ) : currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))
                        ) : (
                            <p>No products found. Showing default products instead.</p>
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
