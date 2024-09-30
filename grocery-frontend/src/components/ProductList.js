import React, { useEffect, useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error('There was an error deleting the product:', error);
    }
  };

  return (
    <div className="card my-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4>Product List</h4>
        <Button variant="primary" onClick={handleShowAddModal}>
          Add Product
        </Button>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className={product.quantity <= product.low_stock_threshold ? 'table-danger' : ''}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  {product.quantity}{' '}
                  {product.quantity <= product.low_stock_threshold && (
                    <Badge bg="warning" text="dark">
                      Low Stock
                    </Badge>
                  )}
                </td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleShowEditModal(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        refreshProducts={fetchProducts}
      />

      {/* Edit Product Modal */}
      {currentProduct && (
        <EditProductModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          product={currentProduct}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductList;
