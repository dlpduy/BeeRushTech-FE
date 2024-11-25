import React, { useState, useEffect } from 'react';
import styles from './MP.module.css';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isAddMode, setIsAddMode] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    thumbnail: '',
    description: '',
    created_at: '',
    updated_at: '',
    category_id: '',
    available: false,
    color: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/products');
      const data = await response.json();
      if (data.statusCode === 200) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addNewProduct = async () => {
    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (data.statusCode === 201) {
        fetchProducts();
        setIsAddMode(false);
        setNewProduct({
          id: '',
          name: '',
          price: '',
          thumbnail: '',
          description: '',
          created_at: '',
          updated_at: '',
          category_id: '',
          available: false,
          color: '',
        });
        setMessage('Thêm sản phẩm thành công!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className={styles.manageContainer}>
      <div className={styles.controls}>
        <select value={filterField} onChange={(e) => setFilterField(e.target.value)} className={styles.filter}>
          <option value="">Filter By</option>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category_id">Category ID</option>
          <option value="available">Available</option>
          <option value="color">Color</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Enter filter value"
          className={styles.filter}
          disabled={!filterField}
        />
        <button onClick={() => setIsAddMode(true)} className={styles.addButton}>Add</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Category ID</th>
            <th>Available</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.thumbnail}</td>
              <td>{product.description}</td>
              <td>{product.created_at}</td>
              <td>{product.updated_at}</td>
              <td>{product.category_id}</td>
              <td>{product.available ? 'Yes' : 'No'}</td>
              <td>{product.color}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddMode && (
        <div className={styles.popup}>
        <div className={styles.popupContent}>
          <h3>Add Product</h3>
          <div className={styles.popupInputGroup}>
            <input
              type="text"
              name="id"
              value={newProduct.id}
              onChange={handleNewProductChange}
              placeholder="ID"
              className={styles.popupInput}
            />
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Name"
              className={styles.popupInput}
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleNewProductChange}
              placeholder="Price"
              className={styles.popupInput}
            />
            <input
              type="text"
              name="thumbnail"
              value={newProduct.thumbnail}
              onChange={handleNewProductChange}
              placeholder="Thumbnail URL"
              className={styles.popupInput}
            />
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleNewProductChange}
              placeholder="Description"
              className={styles.popupInput}
            />
            <input
              type="text"
              name="created_at"
              value={newProduct.created_at}
              onChange={handleNewProductChange}
              placeholder="Created At (YYYY-MM-DD)"
              className={styles.popupInput}
            />
            <input
              type="text"
              name="updated_at"
              value={newProduct.updated_at}
              onChange={handleNewProductChange}
              placeholder="Updated At (YYYY-MM-DD)"
              className={styles.popupInput}
            />
            <input
              type="number"
              name="category_id"
              value={newProduct.category_id}
              onChange={handleNewProductChange}
              placeholder="Category ID"
              className={styles.popupInput}
            />
          </div>
          <div>
            <label>
              Available:
              <input
                type="checkbox"
                name="available"
                checked={newProduct.available}
                onChange={handleNewProductChange}
              />
            </label>
          </div>
          <div className={styles.popupActions}>
            <button onClick={addNewProduct} className={styles.saveButton}>
              Add
            </button>
            <button onClick={() => setIsAddMode(false)} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      )}

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default ManageProduct;
