import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { Arrowright } from '../asset';
import { toast } from 'react-toastify'; // Switch to react-toastify
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Wishlist = () => {
  const { wishlist = { items: [] }, setWishlist, removeFromWishlist, wishlistCount = 0 } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated, authLoading } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add navigate

  useEffect(() => {
    console.log('Wishlist.jsx auth state:', { isAuthenticated, authLoading });
    if (authLoading) {
      console.log('Wishlist: Auth still loading, waiting');
      return;
    }
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const res = await axios.get('http://localhost:4000/api/byc/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
        const data = res.data || { items: [] };
        console.log('Wishlist: Fetched wishlist:', data);
        setWishlist(data);
        setError('');
      } catch (err) {
        console.error('Wishlist: Error fetching wishlist:', err.response?.data || err.message);
        const errorMsg = err.response?.data?.message || 'Failed to load wishlist';
        setError(errorMsg);
        if (err.response?.status === 401) {
          toast.error('Session expired, please log in again', { autoClose: 4000 });
          navigate('/account');
        } else {
          toast.error(errorMsg, { autoClose: 4000 });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated, authLoading, setWishlist, navigate]);

  const handleAddToCart = (product) => {
    if (authLoading) {
      console.log('Wishlist: Auth still loading, cannot add to cart');
      toast.warn('Verifying session, please wait...', { autoClose: 4000 });
      return;
    }
    if (!isAuthenticated) {
      console.log('Wishlist: User not authenticated, redirecting to login');
      toast.error('Please log in to add to cart', { autoClose: 4000 });
      navigate('/account');
      return;
    }

    try {
      const cartItem = {
        ...product,
        id: product.product?._id || product._id,
        quantity: 1,
        selectedSize: product.sizes?.[0] || 'M',
        selectedColor: product.colors?.[0]?.name || 'Blue',
      };
      addToCart(cartItem);
      toast.success(`Added ${product.productName || 'item'} to cart!`, { autoClose: 4000 });
    } catch (err) {
      console.error('Wishlist: Error adding to cart:', err);
      toast.error('Failed to add to cart', { autoClose: 4000 });
    }
  };

  const handleRemove = async (itemId) => {
    if (authLoading) {
      console.log('Wishlist: Auth still loading, cannot remove');
      toast.warn('Verifying session, please wait...', { autoClose: 4000 });
      return;
    }
    if (!isAuthenticated) {
      console.log('Wishlist: User not authenticated, redirecting to login');
      toast.error('Please log in to remove from wishlist', { autoClose: 4000 });
      navigate('/account');
      return;
    }

    try {
      await removeFromWishlist(itemId);
      toast.success('Item removed from wishlist', { autoClose: 4000 });
    } catch (err) {
      console.error('Wishlist: Error removing:', err);
      toast.error('Failed to remove item from wishlist', { autoClose: 4000 });
    }
  };

  if (authLoading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Verifying session...</h5>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h5>Loading wishlist...</h5>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="mt-5 text-center">
        <h2>Your Wishlist</h2>
        <p>Please log in to view your wishlist.</p>
        <Link to="/account" className="btn btn-danger">Log In</Link>
      </Container>
    );
  }

  return (
    <>
      <div style={{ margin: '30px' }}>
        <small style={{ fontSize: '10px' }}>
          <Link to="/" style={{ color: '#787885', textDecoration: 'none' }}>
            Home
          </Link>{' '}
          <img style={{ width: '20px' }} src={Arrowright} alt="arrow" />{' '}
          <span>Wishlist</span>
        </small>
      </div>

      <Container className="mt-5 pt-3 mb-5 border">
        <div className="pt-3 border-bottom">
          <b>Wishlist ({wishlistCount} item{wishlistCount !== 1 ? 's' : ''})</b>
        </div>

        {wishlist.items?.length === 0 ? (
          <div className="text-center my-5">
            <h5>Your Wishlist is Empty</h5>
            <p style={{ fontSize: '12px', color: '#787885' }}>
              Add some products to your wishlist!
            </p>
            <Link to="/products" className="btn btn-danger btn-sm">
              Shop Now
            </Link>
          </div>
        ) : (
          <Row className="gap-3 mb-5">
            <Col md={1}></Col>
            {wishlist.items.map((product) => (
              <Col
                key={product.product?._id || product._id}
                md={2}
                className="my-3 shadow-sm pb-2 singlet"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                  const buttons = e.currentTarget.querySelectorAll('.hover-button');
                  buttons.forEach((button) => button.classList.remove('d-none'));
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  const buttons = e.currentTarget.querySelectorAll('.hover-button');
                  buttons.forEach((button) => button.classList.add('d-none'));
                }}
                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              >
                <Link to={`/product/${product.product?._id || product._id}`}>
                  <img
                    src={product.productImage || 'https://via.placeholder.com/300?text=No+Image'}
                    className="img-fluid"
                    alt={product.productName || 'Product'}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Error')}
                  />
                </Link>
                <h5 style={{ fontWeight: 'bold', fontSize: '12px', marginTop: '10px' }}>
                  {product.productName || 'Unknown Product'}
                </h5>
                <p style={{ fontSize: '8px' }}>{product.productCode || 'N/A'}</p>
                <p style={{ color: '#787885', fontSize: '9px' }}>
                  {product.productDescription?.length > 50
                    ? `${product.productDescription.slice(0, 50)}...`
                    : product.productDescription || 'No description'}
                </p>
                <p>
                  <b>₦{(parseFloat(product.productPrice) || 0).toFixed(2)}</b>
                </p>
                <div>
                  {[...Array(Math.floor(parseFloat(product.ratings) || 0))].map((_, i) => (
                    <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                  ))}
                  {parseFloat(product.ratings) % 1 !== 0 && (
                    <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                  )}
                  <span className="fw-bold pl-2" style={{ fontSize: '10px' }}>
                    {product.ratings || '0'}
                  </span>
                </div>
                <div className="d-flex pb-3">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-3 hover-button d-none"
                    onClick={() => handleRemove(product.product?._id || product._id)}
                  >
                    <i className="bi bi-heart-fill me-1 text-danger" style={{ fontSize: '10px' }}></i>
                    <span style={{ fontSize: '10px' }}>Remove</span>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-1 mt-3 hover-button d-none"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="bi bi-cart3" style={{ fontSize: '10px' }}></i>
                    <span style={{ fontSize: '10px' }}>Buy Now</span>
                  </Button>
                </div>
              </Col>
            ))}
            <Col md={1}></Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Wishlist;