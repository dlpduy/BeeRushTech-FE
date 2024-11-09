import React, { useState, useEffect } from 'react';
import styles from './MP.module.css';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
    description: ''
  });

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
      console.error('Error fetching products:'+ error);
    }
  };

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (!filterField || !filterValue) return true;
    return String(product[filterField]).toLowerCase() === filterValue.toLowerCase();
  });

  const getUniqueFilterValues = (field) => {
    const values = products.map((product) => product[field]);
    return [...new Set(values)];
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const toggleAddMode = () => setIsAddMode(!isAddMode);
  const toggleDeleteMode = () => setIsDeleteMode(!isDeleteMode);

  const handleInputChange = (e, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e.target.value;
    setProducts(updatedProducts);
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addNewProduct = async () => {
    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer <JWT_TOKEN>`
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (data.statusCode === 201) {
        fetchProducts();
        setIsAddMode(false);
        setNewProduct({ id: '', name: '', price: '', image: '', description: '' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id) => {
    const productToUpdate = products.find(product => product.id === id);
    try {
      const response = await fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer <JWT_TOKEN>`
        },
        body: JSON.stringify(productToUpdate),
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        fetchProducts();
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteSelectedProducts = async () => {
    try {
      const deleteRequests = selectedProducts.map(id =>
        fetch(`/products/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer <JWT_TOKEN>`
          }
        })
      );
      await Promise.all(deleteRequests);
      fetchProducts();
      setSelectedProducts([]);
      setIsDeleteMode(false);
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.manageContainer}>
      <div className={styles.buttonContainer}>
        <select value={filterField} onChange={handleFilterFieldChange} className={styles.filterSelect}>
          <option value="">Filter</option>
          <option value="id">ID</option>
          <option value="name">Product Name</option>
          <option value="price">Price</option>
        </select>
        <select
          value={filterValue}
          onChange={handleFilterValueChange}
          className={styles.filterSelect}
          disabled={!filterField}
        >
          <option value="">Select Value</option>
          {filterField &&
            getUniqueFilterValues(filterField).map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
        </select>
        <button onClick={toggleAddMode} className={styles.addButton}>Add</button>
        <button onClick={toggleEditMode} className={styles.editButton}>Edit</button>
        <button onClick={toggleDeleteMode} className={styles.deleteButton}>Delete</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {isDeleteMode && <th>Select</th>}
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              {isDeleteMode && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
              )}
              <td>{product.id}</td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange(e, index, 'name')}
                    className={styles.inputField}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleInputChange(e, index, 'price')}
                    className={styles.inputField}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) => handleInputChange(e, index, 'description')}
                    className={styles.inputField}
                  />
                ) : (
                  product.description
                )}
              </td>
              {isEditMode && (
                <td>
                  <button onClick={() => updateProduct(product.id)} className={styles.saveButton}>Save</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isDeleteMode && (
        <button onClick={deleteSelectedProducts} className={styles.confirmDeleteButton}>Confirm Delete</button>
      )}

      {isAddMode && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Add Product</h3>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleNewProductChange}
              placeholder="Product Name"
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
              name="description"
              value={newProduct.description}
              onChange={handleNewProductChange}
              placeholder="Description"
              className={styles.popupInput}
            />
            <button onClick={addNewProduct} className={styles.saveButton}>Save</button>
            <button onClick={toggleAddMode} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
