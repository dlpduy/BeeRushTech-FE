import React, { useState, useEffect } from "react";
import styles from "./MP.module.css";
import api from "../api"; // Import file api.js

const ManageProduct = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Quản lý chế độ chỉnh sửa
  const [productToEdit, setProductToEdit] = useState(null); // Thông tin sản phẩm cần chỉnh sửa
  const [products, setProducts] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    import_price: "",
    thumbnail: "",
    description: "",
    brand: "",
    category_id: "",
    available: true,
    color: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Thêm state để chuyển trang
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Hàm lấy danh sách sản phẩm
  const fetchProducts = async (page) => {
    try {
      // Gửi yêu cầu GET đến API để lấy danh sách sản phẩm
      const response = await api.get("/products", { 
        params: { page:0, limit: 10 }
      });
  
      // Kiểm tra nếu response có dữ liệu hợp lệ
      if (response.data) {
        console.log(response.data)
        // Cập nhật danh sách sản phẩm và tổng số trang
        setProducts(response.data?.products || []);
        console.log(products);
        setTotalPages(response.data?.totalPage || 1); // Giả sử API trả về tổng số trang
      } else {
        console.warn("No data found in the response.");
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error("Error fetching products:", error.response?.data?.message || error.message);
      alert("Failed to fetch products. Please try again later.");
    }
  };
  
  const handleNewProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Xử lý trường 'available' là checkbox, cần lấy 'checked' thay vì 'value'
    if (type === "checkbox") {
      setNewProduct({
        ...newProduct,
        [name]: checked,
      });
    } else if (type === "number" || type === "text") {
      // Đảm bảo xử lý các trường số và văn bản đúng cách
      setNewProduct({
        ...newProduct,
        [name]: type === "number" ? Number(value) : value, // Sử dụng Number() cho input type="number"
      });
    }
  };

  // Thêm sản phẩm mới
  const addNewProduct = async () => {
    // In dữ liệu để kiểm tra
    console.log("Sending product:", newProduct);
    
    // Kiểm tra các trường hợp thiếu dữ liệu quan trọng
    if (!newProduct.name || !newProduct.price || !newProduct.import_price || !newProduct.thumbnail || !newProduct.description || !newProduct.brand || !newProduct.category_id || !newProduct.quantity) {
      setMessage("Please fill in all required fields!");
      return;
    }
    
    try {

  
      // Nếu category_id hợp lệ, gửi request tạo sản phẩm mới
      const response = await api.post("/products", newProduct);
      console.log(response.message);
      console.log(response);
      if (response.data) {
        fetchProducts(currentPage); // Reload products after adding
        setIsAddMode(false); // Close add mode
        setNewProduct({ // Reset form after submission
          name: "",
          price: "",
          import_price: "",
          thumbnail: "",
          description: "",
          brand: "",
          category_id: "",
          available: true,
          color: "",
          quantity: "",
        });
        setMessage("Product added successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error adding product.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };
  
  
  // Xóa sản phẩm
  // Hàm mở pop-up xác nhận xóa
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId); // Lưu id sản phẩm cần xóa
    setShowDeletePopup(true); // Hiển thị pop-up xác nhận xóa
  };

  // Hàm xóa sản phẩm khi người dùng xác nhận
  const deleteProduct = async () => {
    if (productToDelete) {
      try {
        await api.delete(`/products/${productToDelete}`);
        fetchProducts(currentPage);
        setMessage("Xóa sản phẩm thành công!");
      } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        setMessage(error.response?.data?.message || "Đã xảy ra lỗi khi xóa sản phẩm!");
      } finally {
        setTimeout(() => setMessage(""), 3000);
        setShowDeletePopup(false); // Đóng pop-up sau khi xóa thành công hoặc thất bại
      }
    }
  };

  // Hàm hủy xóa và đóng pop-up
  const cancelDelete = () => {
    setShowDeletePopup(false); // Đóng pop-up nếu người dùng chọn hủy
  };

  // Chuyển trang
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Nhóm các sản phẩm có cùng tên và tính tổng số lượng cho mỗi sản phẩm
  

  const handleEditProduct = (productId) => {
    const product = products.find((item) => item.id === productId); // Lấy thông tin sản phẩm cần chỉnh sửa
    setProductToEdit(product);
    setIsEditMode(true); // Mở pop-up khi chọn sản phẩm
  };

  // Hàm lưu thông tin sản phẩm sau khi chỉnh sửa
  const handleSaveChanges = async () => {
    if (!productToEdit) return;

    try {
      // Gửi yêu cầu PUT để cập nhật thông tin sản phẩm
      const response = await api.put(`/products/${productToEdit.id}`, productToEdit);
      setMessage("Cập nhật sản phẩm thành công!");
      setIsEditMode(false);
      fetchProducts(currentPage); // Tải lại danh sách sản phẩm
    } catch (error) {
      console.error("Error updating product:", error.message);
      setMessage("Đã xảy ra lỗi khi cập nhật sản phẩm!");
    } finally {
      setTimeout(() => setMessage(""), 3000); // Reset thông báo sau 3 giây
    }
  };

  // Hàm hủy chế độ chỉnh sửa
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setProductToEdit(null); // Reset thông tin sản phẩm cần chỉnh sửa
  };

  return (
    <div className={styles.manageContainer}>
      <p className={styles.totalProducts}>Tổng số sản phẩm: {products.length}</p>
      <button onClick={() => setIsAddMode(true)} className={styles.addButton}>
        Thêm sản phẩm
      </button>
      {message && <div className={styles.message}>{message}</div>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thương hiệu</th>
            <th>Loại</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name || "Unknown"}</td>
              <td>{isNaN(product.price) ? "N/A" : product.price}</td>
              <td>{product.brand || "Unknown"}</td>
              <td>{product.category?.name || "Unknown"}</td>
              <td>{isNaN(product.quantity) ? 0 : product.quantity}</td>
              <td>
              <button onClick={() => handleEditProduct(product.id)}>Sửa</button>
              <button onClick={() => handleDeleteClick(product.id)} > Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
        
        {isEditMode && productToEdit && (
        <div className={styles.popupOverlay}>
          <div className={styles.editForm}>
            <h2>Chỉnh sửa thông tin sản phẩm</h2>

            <label>
              Tên:
              <input
                type="text"
                value={productToEdit.name}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, name: e.target.value })
                }
              />
            </label>

            <label>
              Giá:
              <input
                type="number"
                value={productToEdit.price}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, price: e.target.value })
                }
              />
            </label>

            <label>
              Thương hiệu:
              <input
                type="text"
                value={productToEdit.brand}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, brand: e.target.value })
                }
              />
            </label>

            <label>
              Giá nhập:
              <input
                type="number"
                value={productToEdit.import_price}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, import_price: e.target.value })
                }
              />
            </label>

            <label>
              Loại ID:
              <input
                type="text"
                value={productToEdit.category_id}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, category_id: e.target.value })
                }
              />
            </label>

            <label>
              Mô tả:
              <textarea
                value={productToEdit.description}
                onChange={(e) =>
                  setProductToEdit({ ...productToEdit, description: e.target.value })
                }
              />
            </label>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleSaveChanges}>Lưu</button>
              <button onClick={handleCancelEdit}>Hủy</button>
            </div>
          </div>
        </div>
      )}


        {showDeletePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Bạn có chắc chắn muốn xóa sản phẩm không ?</h3>
            <button onClick={deleteProduct} className={styles.confirmButton}>
              Có
            </button>
            <button onClick={cancelDelete} className={styles.cancelButton}>
              Không
            </button>
          </div>
        </div>
      )}

      {/* Hiển thị thông báo */}
      {message && <div className={styles.message}>{message}</div>}
      
      </table>

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>
          Trang {currentPage} trong {totalPages}
        </span>
        <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>

      {isAddMode && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Thêm sản phẩm</h3>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Tên"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              placeholder="Giá"
            />
            <input
              type="number"
              name="import_price"
              value={newProduct.import_price}
              onChange={handleNewProductChange}
              placeholder="Giá nhập"
            />
            <input
              type="text"
              name="thumbnail"
              value={newProduct.thumbnail}
              onChange={handleNewProductChange}
              placeholder="Link hình ảnh"
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleNewProductChange}
              placeholder="Mô tả"
            />
            <input
              type="text"
              name="brand"
              value={newProduct.brand}
              onChange={handleNewProductChange}
              placeholder="Thương hiệu"
            />
            <input
              type="number"
              name="category_id"
              value={newProduct.category_id}
              onChange={handleNewProductChange}
              placeholder="Loại ID"
            />
            <input
              type="checkbox"
              name="available"
              checked={newProduct.available}
              onChange={handleNewProductChange}
            />
            Available
            <input
              type="text"
              name="color"
              value={newProduct.color}
              onChange={handleNewProductChange}
              placeholder="Màu sắc"
            />
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleNewProductChange}
              placeholder="Số lượng"
            />
            <button onClick={addNewProduct}>Thêm sản phẩm</button>
            <button onClick={() => setIsAddMode(false)}>Hủy</button>
          </div>
        </div>
      )}

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default ManageProduct;
