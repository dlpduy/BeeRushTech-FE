import React, { useState } from 'react';
import styles from './MP.module.css';

const ManageUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', loyaltyLevel: 'Gold', rentedProduct: 'Product A', selected: false },
    { id: 2, name: 'User 2', email: 'user2@example.com', loyaltyLevel: 'Silver', rentedProduct: 'Product B', selected: false },
    { id: 3, name: 'User 3', email: 'user3@example.com', loyaltyLevel: 'Platinum', rentedProduct: 'Product C', selected: false },
    { id: 4, name: 'User 4', email: 'user4@example.com', loyaltyLevel: 'Gold', rentedProduct: 'Product D', selected: false },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleDeleteRows = () => {
    setUsers(users.filter((user) => !user.selected));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleInputChange = (e, index, field) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = e.target.value;
    setUsers(updatedUsers);
  };

  const handleCheckboxChange = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].selected = !updatedUsers[index].selected;
    setUsers(updatedUsers);
  };

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    if (!filterField || !filterValue) return true;
    return String(user[filterField]).toLowerCase() === filterValue.toLowerCase();
  });

  const getUniqueFilterValues = (field) => {
    const values = users.map(user => user[field]);
    return [...new Set(values)];
  };

  return (
    <div className={styles.manageContainer}>
      <div className={styles.buttonContainer}>
        <select value={filterField} onChange={handleFilterFieldChange} className={styles.filterSelect}>
          <option value="">Filter</option>
          <option value="id">ID</option>
          <option value="name">Username</option>
          <option value="email">Email</option>
          <option value="loyaltyLevel">Rank</option>
          <option value="rentedProduct">Rented</option>
        </select>
        <select value={filterValue} onChange={handleFilterValueChange} className={styles.filterSelect} disabled={!filterField}>
          <option value="">Chọn giá trị</option>
          {filterField && getUniqueFilterValues(filterField).map((value, index) => (
            <option key={index} value={value}>{value}</option>
          ))}
        </select>
        
        <div className={styles.buttonContainer}>
        <button onClick={toggleEditMode} className={styles.editButton}>Sửa</button>
        <button onClick={toggleDeleteMode} className={styles.deleteButton}>Xóa</button>
        </div>
     
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {isDeleteMode && <th>Chọn</th>}
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rank</th>
            <th>Rented</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              {isDeleteMode && (
                <td>
                  <input
                    type="checkbox"
                    checked={user.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              )}
              <td>{user.id}</td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleInputChange(e, index, 'name')}
                    className={styles.inputField}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, index, 'email')}
                    className={styles.inputField}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={user.loyaltyLevel}
                    onChange={(e) => handleInputChange(e, index, 'loyaltyLevel')}
                    className={styles.inputField}
                  />
                ) : (
                  user.loyaltyLevel
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={user.rentedProduct}
                    onChange={(e) => handleInputChange(e, index, 'rentedProduct')}
                    className={styles.inputField}
                  />
                ) : (
                  user.rentedProduct
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleteMode && (
        <button onClick={handleDeleteRows} className={styles.deleteButton}>
          Xóa các hàng đã chọn
        </button>
      )}
    </div>
  );
};

export default ManageUser;
