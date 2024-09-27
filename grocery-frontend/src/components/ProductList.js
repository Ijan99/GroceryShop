import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import AddProductModal from './AddProductModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="card my-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4>Product List</h4>
        <Button variant="primary" onClick={handleShowModal}>
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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      <AddProductModal show={showModal} handleClose={handleCloseModal} refreshProducts={fetchProducts} />
    </div>
  );
};

export default ProductList;
