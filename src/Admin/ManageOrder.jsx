import React, { useEffect, useState } from 'react';
import api from '../api'; // Giả sử bạn có một api.js để gọi API
import styles from './Orders.module.css';
import Loading from '../MutualComponents/Loading/Loading';

const Orders = () => {
  const [orders, setOrders] = useState([]); // Lưu tất cả các đơn hàng
  const [filteredOrders, setFilteredOrders] = useState([]); // Đơn hàng sau khi lọc
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [ordersPerPage, setOrdersPerPage] = useState(10); // Số lượng đơn hàng trên mỗi trang
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng được chọn để xem chi tiết
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [statusFilter, setStatusFilter] = useState(''); // Lọc theo trạng thái
  const [searchQuery, setSearchQuery] = useState(''); // Lọc theo tên khách hàng
  const [error, setError] = useState(null);

  // Hàm gọi API để lấy danh sách đơn hàng
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders/admin/getAll');
      if (response.statusCode === 200) {
        setOrders(response.data); // Lưu tất cả các đơn hàng vào state
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lọc đơn hàng
  const filterOrders = () => {
    let filtered = orders;

    // Lọc theo trạng thái đơn hàng
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Lọc theo tên khách hàng
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      // Gọi API PUT để cập nhật trạng thái
      const response = await api.put(`/orders/admin/handle`, {
        orderId: orderId,
        status: status,
      });

      if (response.statusCode === 200) {
        // Cập nhật trạng thái đơn hàng sau khi cập nhật thành công
        const updatedOrders = orders.map(order => 
          order.id === orderId ? { ...order, status: status } : order
        );
        setOrders(updatedOrders);

        if (status === "received") {
          // Nếu trạng thái là "received", tính giờ thuê (giả sử bạn có logic tính giờ thuê)
          // Ví dụ: Cập nhật thời gian thuê bắt đầu
          const currentTime = new Date();
          console.log(`Tính giờ thuê bắt đầu từ: ${currentTime}`);
          // Thực hiện các hành động tính giờ thuê ở đây nếu cần
        }
      } else {
        setError('Cập nhật trạng thái đơn hàng thất bại.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      setError('Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Hàm xem chi tiết đơn hàng
  const viewOrderDetails = (order) => {
    setSelectedOrder(order); // Chọn đơn hàng để hiển thị chi tiết
    setShowModal(true); // Mở modal chi tiết
  };

  // Hàm đóng modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null); // Đặt lại trạng thái đơn hàng đã chọn
  };

  useEffect(() => {
    fetchOrders(); // Gọi API khi component được mount
  }, []);

  useEffect(() => {
    filterOrders(); // Lọc đơn hàng mỗi khi thay đổi các bộ lọc
  }, [orders, statusFilter, searchQuery]);

  // Tính toán các đơn hàng cần hiển thị cho trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className={styles.ordersContainer}>
      {loading ? (
        <div><Loading/></div>
      ) : (
        <div>
          {/* Bộ lọc và tìm kiếm */}
          <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="">All Statuses</option>
            <option value="received">Received</option>
            <option value="pending">Pending</option>
            <option value="confirm">Confirmed</option>
          </select>
          </div>

          {/* Danh sách đơn hàng */}
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Money</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.full_name}</td>
                  <td>{order.email}</td>
                  <td>{order.order_date}</td>
                  <td>{order.status}</td>
                  <td>{order.total_money}</td>
                  <td>
                    <button onClick={() => viewOrderDetails(order)}>View Details</button>
                    <button 
                      className={styles.updateButton} 
                      onClick={() => handleUpdateOrderStatus(order.id, order.status)}
                      disabled={loading}
                      >
                        {loading ? 'Updating Status' : 'Update Status'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
          </div>
        </div>
      )}

      {/* Modal xem chi tiết đơn hàng */}
      {showModal && selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.full_name}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone_number}</p>
            <p><strong>Address:</strong> {selectedOrder.shipping_address}</p>
            <p><strong>Note:</strong> {selectedOrder.note}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total Amount:</strong> {selectedOrder.total_money}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.payment_method}</p>
            <p><strong>Tracking Number:</strong>{selectedOrder.tracking_number}</p>
            <p><strong>Order Date:</strong> {selectedOrder.order_date}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
