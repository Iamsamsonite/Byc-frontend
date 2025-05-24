 import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user, loading: userLoading, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(window.innerWidth < 576);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const itemsPerPageLarge = 15; // 15 orders per page on large screens
  const itemsPerPageSmall = 8;  // 8 orders per page on small screens

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsVerySmallScreen(window.innerWidth < 576);
      setCurrentPage(1); // Reset page on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  // Fetch orders
  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    } else {
      setLoadingOrders(false);
    }
  }, [user, currentPage, isSmallScreen]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await axios.get(
        `https://byc-backend-hkgk.onrender.com/api/byc/orders/my-orders?page=${currentPage}&limit=${
          isSmallScreen ? itemsPerPageSmall : itemsPerPageLarge
        }`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          timeout: 5000,
        }
      );
      setOrders(res.data.orders || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch orders:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to load orders', { autoClose: 4000 });
    } finally {
      setLoadingOrders(false);
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', { autoClose: 4000 });
      return;
    }

    try {
      const res = await axios.put(
        'https://byc-backend-hkgk.onrender.com/api/byc/users/me',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          timeout: 5000,
        }
      );
      setUser(res.data.user); // Update user context with new data
      setIsEditing(false);
      toast.success('Profile updated successfully', { autoClose: 4000 });
    } catch (err) {
      console.error('Failed to update profile:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to update profile', { autoClose: 4000 });
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
    setFormErrors({}); // Clear errors when toggling
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'processing':
        return 'bg-info text-white';
      case 'shipped':
        return 'bg-primary text-white';
      case 'delivered':
        return 'bg-success text-white';
      case 'cancelled':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  // Pagination logic
  const getPaginationParams = () => {
    const totalItems = orders.length;
    const itemsPerPage = isSmallScreen ? itemsPerPageSmall : itemsPerPageLarge;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return {
      currentOrders: orders.slice(indexOfFirstItem, indexOfLastItem),
      paginate: totalPages > 1,
    };
  };

  const { currentOrders, paginate } = getPaginationParams();

  if (userLoading) {
    return (
      <Container className="my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading user data...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="my-5 text-center">
        <h3>Please log in to view your profile</h3>
        <a href="/account" className="btn btn-danger">Log In</a>
      </Container>
    );
  }

  return (
    <Container
      style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 15px',
        boxSizing: 'border-box',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
      }}
    >
      {/* Customer Details Section */}
      <h3
        className="fw-bold mb-3"
        style={{ fontSize: isVerySmallScreen ? '1.5rem' : '2rem' }}
      >
        Hello, {user.name}
      </h3>
      <div
        style={{
          backgroundColor: '#fff',
          padding: isVerySmallScreen ? '1rem' : '1.5rem',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          marginBottom: '2rem',
        }}
      >
        <h5
          style={{
            fontSize: isVerySmallScreen ? '1.2rem' : '1.5rem',
            marginBottom: '1rem',
          }}
        >
          Profile Details
        </h5>
        {isEditing ? (
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!formErrors.name}
                style={{ fontSize: isVerySmallScreen ? '0.9rem' : '1rem' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!formErrors.email}
                style={{ fontSize: isVerySmallScreen ? '0.9rem' : '1rem' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                isInvalid={!!formErrors.phone}
                style={{ fontSize: isVerySmallScreen ? '0.9rem' : '1rem' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={{ fontSize: isVerySmallScreen ? '0.9rem' : '1rem' }}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button
                variant="danger"
                size="sm"
                type="submit"
                style={{
                  fontSize: isVerySmallScreen ? '0.8rem' : '0.9rem',
                  padding: isVerySmallScreen ? '4px 8px' : '6px 12px',
                }}
              >
                Update
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleEditMode}
                style={{
                  fontSize: isVerySmallScreen ? '0.8rem' : '0.9rem',
                  padding: isVerySmallScreen ? '4px 8px' : '6px 12px',
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <p
              style={{
                fontSize: isVerySmallScreen ? '0.9rem' : '1rem',
                margin: 0,
              }}
            >
              <strong>Name:</strong> {user.name}
            </p>
            <p
              style={{
                fontSize: isVerySmallScreen ? '0.9rem' : '1rem',
                margin: 0,
              }}
            >
              <strong>Email:</strong> {user.email}
            </p>
            {user.phone && (
              <p
                style={{
                  fontSize: isVerySmallScreen ? '0.9rem' : '1rem',
                  margin: 0,
                }}
              >
                <strong>Phone:</strong> {user.phone}
              </p>
            )}
            {user.address && (
              <p
                style={{
                  fontSize: isVerySmallScreen ? '0.9rem' : '1rem',
                  margin: 0,
                }}
              >
                <strong>Address:</strong> {user.address}
              </p>
            )}
            <p
              style={{
                fontSize: isVerySmallScreen ? '0.9rem' : '1rem',
                margin: 0,
              }}
            >
              <strong>Member Since:</strong>{' '}
              {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <button
              className="btn btn-danger btn-sm mt-3"
              style={{
                fontSize: isVerySmallScreen ? '0.8rem' : '0.9rem',
                padding: isVerySmallScreen ? '4px 8px' : '6px 12px',
              }}
              onClick={toggleEditMode}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Orders Section */}
      <h5
        className="mb-4"
        style={{ fontSize: isVerySmallScreen ? '1.2rem' : '1.5rem' }}
      >
        Your Orders
      </h5>

      {loadingOrders ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center">
          <p style={{ fontSize: isVerySmallScreen ? '0.9rem' : '1rem' }}>
            No orders found.
          </p>
          <a href="/products" className="btn btn-danger btn-sm">
            Shop Now
          </a>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: isVerySmallScreen ? '0.5rem' : '1rem',
              padding: '1rem 0',
            }}
          >
            {currentOrders.map((order) => (
              <div
                key={order._id}
                style={{
                  flex: isSmallScreen ? '0 0 48%' : '0 0 24%',
                  maxWidth: isSmallScreen ? '48%' : '24%',
                  padding: isVerySmallScreen ? '5px' : '8px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  className="shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSmallScreen) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow =
                        '0 8px 16px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSmallScreen) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <div
                    style={{
                      padding: isVerySmallScreen ? '10px' : '15px',
                      flexGrow: 1,
                    }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center mb-2"
                      style={{ flexWrap: 'wrap', gap: '0.5rem' }}
                    >
                      <h6
                        className="mb-0 text-truncate"
                        style={{
                          fontSize: isVerySmallScreen ? '14px' : '16px',
                          fontWeight: 'bold',
                          maxWidth: '60%',
                        }}
                        title={`Order #${order.orderId || order._id.slice(-6).toUpperCase()}`}
                      >
                        Order #{order.orderId || order._id.slice(-6).toUpperCase()}
                      </h6>
                      <span
                        className={`badge ${getStatusBadgeClass(order.status)}`}
                        style={{
                          fontSize: isVerySmallScreen ? '10px' : '12px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <small
                      className="text-muted d-block mb-2"
                      style={{ fontSize: isVerySmallScreen ? '10px' : '12px' }}
                    >
                      Placed on:{' '}
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </small>
                    <div
                      style={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        paddingRight: '5px',
                        marginBottom: '10px',
                      }}
                    >
                      {order.cartItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="d-flex align-items-center mb-2"
                          style={{ gap: '10px' }}
                        >
                          <img
                            src={
                              item.productImage ||
                              'https://via.placeholder.com/50?text=No+Image'
                            }
                            alt={item.name}
                            style={{
                              width: isVerySmallScreen ? '40px' : '50px',
                              height: isVerySmallScreen ? '40px' : '50px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              flexShrink: 0,
                            }}
                            loading="lazy"
                            onError={(e) =>
                              (e.target.src =
                                'https://via.placeholder.com/50?text=Image+Error')
                            }
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span
                              className="text-truncate d-block"
                              style={{
                                fontSize: isVerySmallScreen ? '12px' : '14px',
                                maxWidth: '100%',
                              }}
                              title={item.name}
                            >
                              {item.name}
                            </span>
                            <small
                              style={{
                                fontSize: isVerySmallScreen ? '10px' : '12px',
                                color: '#787885',
                              }}
                            >
                              {item.quantity} × ₦{item.price.toLocaleString()}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p
                      className="fw-bold mb-0"
                      style={{
                        fontSize: isVerySmallScreen ? '12px' : '14px',
                        color: '#333',
                      }}
                    >
                      Total: ₦{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {paginate && totalPages > 1 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: isVerySmallScreen ? '0.3rem' : '0.5rem',
                  flexWrap: 'wrap',
                }}
                role="group"
                aria-label="Pagination controls"
              >
                <button
                  style={{
                    padding: isVerySmallScreen ? '6px 10px' : '8px 12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: currentPage === 1 ? '#f8f9fa' : '#fff',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: isVerySmallScreen ? '10px' : isSmallScreen ? '12px' : '14px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <i className="bi bi-arrow-left-short" style={{ fontSize: '16px' }}></i>
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    style={{
                      padding: isVerySmallScreen ? '6px 10px' : '8px 12px',
                      border:
                        currentPage === index + 1
                          ? '2px solid #ffc107'
                          : '1px solid #dee2e6',
                      borderRadius: '4px',
                      backgroundColor:
                        currentPage === index + 1 ? '#fff3cd' : '#fff',
                      cursor: 'pointer',
                      fontSize: isVerySmallScreen
                        ? '10px'
                        : isSmallScreen
                        ? '12px'
                        : '14px',
                    }}
                    onClick={() => setCurrentPage(index + 1)}
                    aria-label={`Page ${index + 1}`}
                    aria-current={currentPage === index + 1 ? 'page' : undefined}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  style={{
                    padding: isVerySmallScreen ? '6px 10px' : '8px 12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: currentPage === totalPages ? '#f8f9fa' : '#fff',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: isVerySmallScreen ? '10px' : isSmallScreen ? '12px' : '14px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <i
                    className="bi bi-arrow-right-short"
                    style={{ fontSize: '16px' }}
                  ></i>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ProfilePage;