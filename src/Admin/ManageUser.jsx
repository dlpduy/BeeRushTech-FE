import React, { useState } from 'react';
import styles from './MP.module.css';

const ManageUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', loyaltyLevel: 'Gold', rentedProduct: 'Product A', selected: false },
    { id: 2, name: 'User 2', email: 'user2@example.com', loyaltyLevel: 'Silver', rentedProduct: 'Product B', selected: false },
    { id: 3, name: 'User 3', email: 'user3@example.com', loyaltyLevel: 'Platinum', rentedProduct: 'Product C', selected: false },
    { id: 4, name: 'User 4', email: 'user4@example.com', loyaltyLevel: 'Gold', rentedProduct: 'Product D', selected: false },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].selected = !updatedUsers[index].selected;
    setUsers(updatedUsers);

    const selectedCount = updatedUsers.filter(user => user.selected).length;
    setEditingRow(selectedCount === 1 ? index : null);
  };

  const handleInputChange = (e, index, field) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = e.target.value;
    setUsers(updatedUsers);
  };

  const handleDeleteRows = () => {
    setShowConfirmPopup(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => !user.selected));
    setShowConfirmPopup(false);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 500);
  };

  const cancelDelete = () => {
    setShowConfirmPopup(false);
    setUsers(users.map(user => ({ ...user, selected: false })));
    setEditingRow(null);
  };

  return (
    <div className={styles.manageContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Chọn</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rank</th>
            <th>Rented</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={user.selected}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{user.id}</td>
              <td>
                {editingRow === index ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange(e, index, 'name')}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.loyaltyLevel}</td>
              <td>{user.rentedProduct}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút Xóa luôn hiển thị khi có ít nhất một hàng được chọn */}
      {users.some(user => user.selected) && (
        <div className={styles.buttonContainer}>
          <button onClick={handleDeleteRows} className={styles.deleteButton}>Xóa</button>
        </div>
      )}

      {/* Popup xác nhận xóa */}
      {showConfirmPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>Bạn có chắc chắn muốn xóa tất cả các hàng đã chọn?</p>
            <div className={styles.flex}>
            <button onClick={confirmDelete} className={styles.confirmButton}>Yes</button>
            <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Popup thành công sau khi xóa */}
      {showSuccessPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>Xóa thành công!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
