import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotals = async () => {
      const productsData = await axios.get('/api/products');
      const customersData = await axios.get('/api/customers');
      const ordersData = await axios.get('/api/orders');

      setTotalProducts(productsData.data.length);
      setTotalCustomers(customersData.data.length);
      setTotalOrders(ordersData.data.length);
    };

    fetchTotals();
  }, []);

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Total Products</Card.Title>
            <Card.Text>{totalProducts}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Total Customers</Card.Title>
            <Card.Text>{totalCustomers}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Total Orders</Card.Title>
            <Card.Text>{totalOrders}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
