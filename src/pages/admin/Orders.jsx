 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Container, Table, Form, Button, Modal, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched orders:', res.data);
        // Sort orders by orderDate in descending order (latest first)
        const sortedOrders = [...(res.data || [])].sort((a, b) => 
          new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
        setError('');
      } catch (err) {
        console.error('Error fetching orders:', err);
        const errorMsg = err.response?.data?.message || 'Failed to load orders';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      console.log('Updating order:', { orderId, newStatus });
      const res = await axios.patch(
        `https://byc-backend-hkgk.onrender.com/api/byc/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('PATCH response:', res.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: res.data.status } : order
        )
      );
      toast.success(`Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update order';
      toast.error(errorMsg);
    }
  };

  const handleRowClick = (order) => {
    console.log('Selected order:', order);
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  if (loading) return <div className="text-center mt-5">Loading orders...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <Container className="mt-4">
      <style>
        {`
          .custom-modal .modal-dialog {
            max-width: 90%;
            width: 750px;
          }
          .cart-items-table th, .cart-items-table td {
            vertical-align: middle;
            text-align: center;
            padding: 8px;
            font-size: 14px;
            white-space: nowrap;
          }
          .cart-items-table img {
            border-radius: 4px;
          }
          .cart-items-table th {
            background-color: #f8f9fa;
          }
          .orders-table th, .orders-table td {
            vertical-align: middle;
            padding: 8px;
            font-size: 14px;
          }
          .orders-table .form-select {
            min-width: 120px;
          }
          @media (max-width: 768px) {
            .orders-table th, .orders-table td {
              font-size: 12px;
              padding: 6px;
            }
            .orders-table .form-select {
              font-size: 12px;
              padding: 4px;
            }
            .orders-table th:not(:nth-child(1)):not(:nth-child(3)):not(:nth-child(4)):not(:nth-child(6)),
            .orders-table td:not(:nth-child(1)):not(:nth-child(3)):not(:nth-child(4)):not(:nth-child(6)) {
              display: none;
            }
            .cart-items-table th, .cart-items-table td {
              font-size: 12px;
              padding: 6px;
            }
            .cart-items-table th:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(6)):not(:nth-child(8)),
            .cart-items-table td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(6)):not(:nth-child(8)) {
              display: none;
            }
            .cart-items-table img {
              width: 40px;
              height: 40px;
            }
          }
          @media (max-width: 576px) {
            .custom-modal .modal-dialog {
              width: 95%;
              margin: 10px auto;
            }
            .orders-table th, .orders-table td {
              font-size: 10px;
              padding: 4px;
            }
            .cart-items-table th, .cart-items-table td {
              font-size: 10px;
              padding: 4px;
            }
          }
        `}
      </style>

      <h3>Manage Orders</h3>
      <div className="table-responsive">
        <Table striped bordered hover className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No orders found</td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{order.orderId}</td>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    {order.user?.name || 'Unknown'} ({order.user?.emailAddress || 'N/A'})
                  </td>
                  <td>₦{(order.totalAmount || 0).toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Form.Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      size="sm"
                      className="w-auto"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </Form.Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Order Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {selectedOrder ? (
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p>
                <strong>User:</strong> {selectedOrder.user?.name || 'Unknown'} (
                {selectedOrder.user?.emailAddress || 'N/A'})
              </p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
              <p><strong>Subtotal:</strong> ₦{(selectedOrder.subtotal || 0).toLocaleString()}</p>
              <p><strong>Delivery Fee:</strong> ₦{(selectedOrder.deliveryFee || 0).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ₦{(selectedOrder.totalAmount || 0).toLocaleString()}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}</p>
              <p><strong>Payment Reference:</strong> {selectedOrder.paymentReference || 'N/A'}</p>
              <div>
                <strong>Shipping Address:</strong>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><strong>Full Name:</strong> {selectedOrder.shippingAddress?.fullName || 'N/A'}</li>
                  <li><strong>Company Name:</strong> {selectedOrder.shippingAddress?.companyName || 'N/A'}</li>
                  <li><strong>Country:</strong> {selectedOrder.shippingAddress?.country || 'N/A'}</li>
                  <li><strong>Town/City:</strong> {selectedOrder.shippingAddress?.townCity || 'N/A'}</li>
                  <li><strong>State:</strong> {selectedOrder.shippingAddress?.state || 'N/A'}</li>
                  <li><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone || 'N/A'}</li>
                  <li><strong>Email:</strong> {selectedOrder.shippingAddress?.email || 'N/A'}</li>
                </ul>
              </div>
              <div>
                <strong>Cart Items:</strong>
                {selectedOrder.cartItems?.length > 0 ? (
                  <div className="table-responsive">
                    <Table striped bordered hover size="sm" className="mt-2 cart-items-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.cartItems.map((item, index) => {
                          console.log('Cart item:', item);
                          return (
                            <tr key={index}>
                              <td>
                                {item.product && item.product.productImage?.[0] ? (
                                  <Image
                                    src={item.product.productImage[0]}
                                    alt={item.product.productName || item.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    onError={(e) => (e.target.src = 'https://via.placeholder.com/50')}
                                  />
                                ) : (
                                  'N/A'
                                )}
                              </td>
                              <td className="text-truncate" style={{ maxWidth: '100px' }}>
                                {item.product?.productName || item.name || 'Unknown'}
                              </td>
                              <td>{item.product?.category?.name || 'N/A'}</td>
                              <td>{item.selectedColor || 'N/A'}</td>
                              <td>{item.selectedSize || 'N/A'}</td>
                              <td>{item.quantity}</td>
                              <td>₦{(item.price || 0).toLocaleString()}</td>
                              <td>₦{(item.quantity * (item.price || 0)).toLocaleString()}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <p>No items</p>
                )}
              </div>
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Orders;