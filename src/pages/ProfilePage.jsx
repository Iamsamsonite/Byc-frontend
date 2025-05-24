import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // adjust path as needed

const ProfilePage = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://byc-backend-hkgk.onrender.com/api/byc/orders/user/${user._id}`
      );
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err.response?.data || err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning';
      case 'Processing':
        return 'bg-info';
      case 'Shipped':
        return 'bg-primary';
      case 'Delivered':
        return 'bg-success';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  if (userLoading) return <p>Loading user data...</p>;

  return (
    <div className="container my-5">
      <h3 className="fw-bold">Hello, {user?.name}</h3>
      <p className="text-muted">{user?.email}</p>

      <hr className="my-4" />

      <h5 className="mb-3">Your Orders</h5>
      {loadingOrders ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Order #{order._id.slice(-6).toUpperCase()}</h6>
              <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            <small className="text-muted">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </small>
            <ul className="mt-2">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} — {item.quantity} × ₦{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="fw-bold mt-2">Total: ₦{order.totalAmount.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfilePage;
