import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Open order details modal
  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Close order details modal
  const handleCloseModal = () => setShowModal(false);

  // Generate PDF invoice
  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Order Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${selectedOrder._id}`, 20, 30);
    doc.text(`Customer: ${selectedOrder.customer_id.name}`, 20, 40);
    doc.text(`Order Date: ${new Date(selectedOrder.order_date).toLocaleDateString()}`, 20, 50);
    doc.text(`Total Amount: $${selectedOrder.total_amount}`, 20, 60);
    doc.text(`Payment Method: ${selectedOrder.payment_method}`, 20, 70);

    // Add table for items
    const tableColumn = ["Product", "Quantity", "Price"];
    const tableRows = selectedOrder.items.map(item => [
      item.product_id.name,
      item.quantity,
      `$${item.price}`
    ]);

    doc.autoTable({
      startY: 80,
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save(`invoice_${selectedOrder._id}.pdf`);
  };

  return (
    <div className="card my-3">
      <div className="card-header">
        <h4>Order History</h4>
      </div>
      <div className="card-body">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer_id.name}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>${order.total_amount}</td>
                <td>{order.payment_method}</td>
                <td>{order.payment_status}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowModal(order)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer_id.name}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ${selectedOrder.total_amount}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.payment_method}</p>
            <h5>Items:</h5>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.product_id._id}>
                    <td>{item.product_id.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={generateInvoice}>
              Download Invoice
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrderHistory;
