import React, { useEffect, useState } from 'react';
import api from '../api'; // Giả sử bạn có một api.js để gọi API
import styles from './Orders.module.css';
import Loading from '../MutualComponents/Loading/Loading';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders/admin/getAll');
      if (response.statusCode === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
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
      const response = await api.put(`/orders/admin/handle`, {
        orderId: orderId,
        status: status,
      });
      console.log(response);
      if (response === "Order handled successfully") {
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, status: status } : order
        );
        setOrders(updatedOrders);
      } else {
        setError('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('An error occurred while updating status.');
    } finally {
      setLoading(false);
      setShowStatusModal(false);
      setSelectedOrder(null);
    }
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter, searchQuery]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className={styles.ordersContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">Các trạng thái</option>
              <option value="received">Đã nhận</option>
              <option value="pending">Đang chờ</option>
              <option value="confirmed">Đã xác nhận</option>
            </select>
          </div>

          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái</th>
                <th>Tổng giá tiền</th>
                <th>Hành động</th>
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
                    <button onClick={() => viewOrderDetails(order)}>Xem chi tiết</button>
                    <button onClick={() => openStatusModal(order)}>Cập nhật trạng thái</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
          </div>

          {showStatusModal && selectedOrder && (
  <div className={styles.modal}>
    <div className={styles.modalContent}>
      <h3>Cập nhật trạng thái đơn hàng</h3>
      <p><strong>Mã đơn hàng:</strong> {selectedOrder.id}</p>
      <p><strong>Khách hàng:</strong> {selectedOrder.full_name}</p>

      {/* Hiển thị nút dựa trên trạng thái hiện tại */}
      {selectedOrder.status === 'received'}

      {selectedOrder.status === 'confirmed'&& (
        <>
          <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'received')}>
            Nhận
          </button>
        </>
      )}
        
      { selectedOrder.status === 'paid' && (
        <>
          <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'confirmed')}>
            Xác nhận
          </button>
          <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'received')}>
            Nhận
          </button>
        </>
      )}

      {selectedOrder.status === 'pending'  && (
        <>
          <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'confirmed')}>
            Xác nhận
          </button>
          <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'received')}>
            Nhận
          </button>
        </>
      )}

      <button onClick={closeStatusModal}>Hủy</button>
    </div>
  </div>
)}


          {showModal && selectedOrder && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h3>Chi tiết đơn hàng</h3>
                <p><strong>Mã đơn hàng:</strong> {selectedOrder.id}</p>
                <p><strong>Khách hàng:</strong> {selectedOrder.full_name}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Số điện thoại:</strong> {selectedOrder.phone_number}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.shipping_address}</p>
                <p><strong>Ghi chú:</strong> {selectedOrder.note}</p>
                <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
                <p><strong>Tổng tiền:</strong> {selectedOrder.total_money}</p>
                <p><strong>Phương thức thanh toán:</strong> {selectedOrder.payment_method}</p>
                <p><strong>Mã vận chuyển:</strong>{selectedOrder.tracking_number}</p>
                <p><strong>Ngày đặt hàng:</strong> {selectedOrder.order_date}</p>
                <button onClick={closeModal}>Đóng</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
