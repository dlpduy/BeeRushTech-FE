import React, { useEffect, useState } from 'react';
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from '../../MutualComponents/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Loading from '../../MutualComponents/Loading/Loading';
import OrderCard from './OrderCard';
import api from '../../api'; 
import styles from './User.module.css';

export const User = () => {
  const [user, setUser] = useState(null); 
  const [loadingUser, setLoadingUser] = useState(true); 
  const [orders, setOrders] = useState([]); 
  const [loadingOrders, setLoadingOrders] = useState(true); 
  const [editMode, setEditMode] = useState(false); 
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatedUser, setUpdatedUser] = useState({
    fullName: '',
    phoneNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(false); 
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");

  
  

  const filteredOrders = filterStatus === 'all'
  ? orders
  : orders.filter(order => order.status === filterStatus);

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.order_date);
    const dateB = new Date(b.order_date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/profile'); // Gọi API để lấy thông tin người dùng
        setUser(response.data); // Lưu thông tin người dùng
        setUpdatedUser({
          fullName: response.data.fullName || '',
          phoneNumber: response.data.phoneNumber || '',
          address: response.data.address || ''
        });
        setLoadingUser(false);
      } catch (error) {
        console.error('Error fetching user data', error);
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  // Xử lý thay đổi thông tin người dùng
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Cập nhật chỉ trường có tên tương ứng với 'name'
    setUpdatedUser(prevState => ({
      ...prevState, // Giữ lại các giá trị cũ
      [name]: value // Chỉ thay đổi giá trị của trường được chọn
    }));
  };

  const handleEdit = () => {
    setEditMode(true); // Mở chế độ chỉnh sửa
  };

  const handleCancelEdit = () => {
    setEditMode(false); // Hủy chế độ chỉnh sửa và quay lại
    setUpdatedUser({
      fullName: user.fullName || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || ''
    });
  };
  const handleSaveChanges = async () => {
    // Kiểm tra dữ liệu trước khi gửi
    if (!updatedUser.fullName.trim() || !updatedUser.phoneNumber.trim() || !updatedUser.address.trim()) {
      alert("All fields are required!");
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('Data being sent to API:', updatedUser);
      const response = await api.put('/user/profile', updatedUser);
  
      console.log('Response from API:', response.data);
      setUser(response.data); // Cập nhật thông tin người dùng từ phản hồi
      setLoading(false);
      setEditMode(false); // Tắt chế độ chỉnh sửa
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred while saving!");
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get('/orders'); // Gọi API để lấy danh sách đơn hàng
        console.log(response.data)
        setOrders(response.data); // Lưu danh sách đơn hàng
        const newOrders = response.data;
        console.log("Working with newOrders:", newOrders);
        setLoadingOrders(false); // Dừng loading sau khi lấy dữ liệu thành công
      } catch (error) {
        console.error('Error fetching orders', error);
        setLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, []);


  const handleOpenChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  // Hàm đóng pop-up thay đổi mật khẩu
  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match!");
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("You are not logged in. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put('/user/change-password', {
        oldPassword,
        newPassword,
        confirmPassword
      });

      if (response.statusCode === 200) {
        alert(response.message);
        handleCloseChangePassword(); // Đóng pop-up nếu thành công
      }
      setLoading(false);
    } catch (error) {
      console.error('Error changing password:', error);
      alert("An error occurred while changing the password.");
      setLoading(false);
    }
  };
  
  if (loadingUser || loadingOrders) {
    return <Loading />; // Hiển thị loading khi đang lấy dữ liệu
  }

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
      if (!token) {
        alert("You are not logged in. Please log in again.");
        return;
      }
  
      // Gọi API Logout
      const response = await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        }
      );
        console.log(response);
      if (response.statusCode === 200) {
        alert("Logout successful");
        localStorage.clear(); // Xóa token khỏi localStorage
        navigate("/"); // Điều hướng về trang đăng nhập
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.user}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Header />
          <div className={styles.divider} />

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <button className={styles.breadcrumbLink} aria-label="Home"> Khách hàng </button>
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5eb0a4928570b7fed31b03a3380bdd7847d7602a5565615f9e54341907dfa?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
              alt="" 
              className={styles.breadcrumbIcon} 
            />
            
          </nav>
        </div>

        {/* Main content */}
        <section className={styles.manageContent}>
          <div className={styles.manageLayout}>
            <aside className={styles.sidebar}>
              <h3 className={styles.pageTitle}>Thông tin</h3>

              {editMode ? (
          <div className={styles.editForm}>
            <div>
              <label>Họ và tên:</label>
              <input
                type="text"
                name="fullName"
                value={updatedUser.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={updatedUser.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={updatedUser.address}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleSaveChanges} disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <button onClick={handleCancelEdit}>Hủy</button>
          </div>
        ) : (
          <div className={styles.profileInfo}>
            <p><strong>Họ và tên:</strong> {user.fullName}</p>
            <p><strong>Số điện thoại:</strong> {user.phoneNumber}</p>
            <p><strong>Địa chỉ:</strong> {user.address}</p>
            <button onClick={handleEdit}>Chỉnh sửa thông tin</button>
            <div className={styles.profileActions}>
    <button onClick={handleLogout} className={styles.logoutButton}>
      {loading ? "Đang đăng xuất..." : "Đăng xuất"}
    </button>
  </div>
  <div className={styles.userContainer}>
        <button onClick={handleOpenChangePassword}>Đổi mật khẩu</button>

        {/* Pop-up đổi mật khẩu */}
        {showChangePasswordModal && (
          <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Đổi mật khẩu</h3>
            <div className={styles.inputGroup}>
              <label>
                Mật khẩu cũ:
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.inputGroup}>
              <label>
                Mật khẩu mới:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.inputGroup}>
              <label>
                Nhập lại mật khẩu mới:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </div>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <div className={styles.modalActions}>
              <button onClick={handleChangePassword} disabled={loading}>
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button onClick={handleCloseChangePassword}>Cancel</button>
            </div>
          </div>
        </div>
        
        )}
      </div>
          </div>
        )}

            </aside>

            <main className={styles.mainContent}>
                
              <div className={styles.manageInfo}>
              <div className={styles.filterContainer}>
    <label htmlFor="orderStatus">Lọc theo trạng thái:</label>
    <select
      id="orderStatus"
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      
    >
      <option value="all">Tất cả</option>
      <option value="pending">Đang chờ</option>
      <option value="completed">Hoàn thành</option>
      <option value="cancelled">Đã hủy</option>
    </select>
    <label htmlFor="sortOrder">Sắp xếp theo:</label>
                  <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    
                  >
                    <option value="asc">Thời gian: Lâu nhât</option>
                    <option value="desc">Thời gian: Gần nhất</option>
                  </select>
  </div>

  {/* Danh sách đơn hàng */}
  <div className={styles.ordersContainer}>
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <OrderCard key={order.id} {...order} />
                    ))
                  ) : (
                    <p>Bạn chưa có đơn hàng trong trạng thái này.</p>
                  )}
                </div>

              </div>
            </main>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};
