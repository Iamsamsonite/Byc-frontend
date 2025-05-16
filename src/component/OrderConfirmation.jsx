import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order || JSON.parse(localStorage.getItem('order'));

  console.log('Order in OrderConfirmation:', order); // Debug log

  if (!order || !order.cartItems || !order.shippingAddress) {
    return (
      <Container className="mt-5 text-center">
        <h2>Order Confirmation</h2>
        <p>No order details available.</p>
        <Button variant="danger" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <h4>Order ID: {order.orderId || 'N/A'}</h4>
      <h5>Shipping Address</h5>
      <p>
        {order.shippingAddress.fullName || 'N/A'}<br />
        {order.shippingAddress.townCity || ''}, {order.shippingAddress.state || ''}<br />
        {order.shippingAddress.phone || 'N/A'}<br />
        {order.shippingAddress.email || 'N/A'}
      </p>
      <h5>Order Summary</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.cartItems.map((item, index) => {
            const itemName = item.name || (item.product && item.product.name) || 'Unknown Product';
            const itemPrice = typeof item.price === 'number' ? item.price : (item.product && typeof item.product.price === 'number' ? item.product.price : 0);
            return (
              <tr key={index}>
                <td>{itemName}</td>
                <td>{item.quantity || 0}</td>
                <td>₦{itemPrice.toFixed(2)}</td>
                <td>₦{(itemPrice * (item.quantity || 0)).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Subtotal: ₦{typeof order.subtotal === 'number' ? order.subtotal.toFixed(2) : 'N/A'}</p>
      <p>Delivery Fee: ₦{typeof order.deliveryFee === 'number' ? order.deliveryFee.toFixed(2) : 'N/A'}</p>
      <p>Total: ₦{typeof order.totalAmount === 'number' ? order.totalAmount.toFixed(2) : 'N/A'}</p>
      <p>Payment Method: {order.paymentMethod || 'N/A'}</p>
      <p>Status: {order.status || 'N/A'}</p>
      <Button variant="danger" onClick={() => navigate('/')}>
        Continue Shopping
      </Button>
    </Container>
  );
};

export default OrderConfirmation;