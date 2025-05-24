 import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { Arrowright } from '../asset';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const Wishlist = () => {
  const { wishlist = { items: [] }, setWishlist, removeFromWishlist, wishlistCount = 0 } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated, authLoading } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const itemsPerPageLarge = wishlist.items.length; // Show all on large screens (no pagination)
  const itemsPerPageSmall = 2; // 2 items per page after initial 10 on small screens
  const smallScreenInitialProducts = 10; // Show 10 products before paginating on small screens

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setCurrentPage(1); // Reset page on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch wishlist
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
        const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/wishlist', {
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
      setCurrentPage(1); // Reset to page 1 after removal
    } catch (err) {
      console.error('Wishlist: Error removing:', err);
      toast.error('Failed to remove item from wishlist', { autoClose: 4000 });
    }
  };

  // Pagination logic
  const getPaginationParams = () => {
    if (isSmallScreen) {
      if (wishlist.items.length <= smallScreenInitialProducts) {
        return {
          currentProducts: wishlist.items,
          totalPages: 1,
          paginate: false,
        };
      }
      const indexOfLastItem = (currentPage - 1) * itemsPerPageSmall + smallScreenInitialProducts;
      const indexOfFirstItem = indexOfLastItem - itemsPerPageSmall;
      const totalPages = Math.ceil((wishlist.items.length - smallScreenInitialProducts) / itemsPerPageSmall) + 1;
      return {
        currentProducts: currentPage === 1 ? wishlist.items.slice(0, smallScreenInitialProducts) : wishlist.items.slice(indexOfFirstItem, indexOfLastItem),
        totalPages,
        paginate: true,
      };
    }
    return {
      currentProducts: wishlist.items,
      totalPages: 1,
      paginate: false, // No pagination on large screens
    };
  };

  const { currentProducts, totalPages, paginate } = getPaginationParams();

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

      <Container style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px', boxSizing: 'border-box', border: '1px solid #dee2e6' }}>
        <div
          style={{
            padding: '1rem 0',
            borderBottom: '1px solid #dee2e6',
          }}
        >
          <b>Wishlist ({wishlistCount} item{wishlistCount !== 1 ? 's' : ''})</b>
        </div>

        {wishlist.items?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h5>Your Wishlist is Empty</h5>
            <p style={{ fontSize: '12px', color: '#787885' }}>
              Add some products to your wishlist!
            </p>
            <Link to="/products" className="btn btn-danger btn-sm">
              Shop Now
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: '1rem',
              padding: '1rem 0',
            }}
          >
            {currentProducts.map((product) => (
              <div
                key={product.product?._id || product._id}
                style={{
                  flex: isSmallScreen ? '1 1 45%' : '1 1 23%',
                  maxWidth: isSmallScreen ? '45%' : '23%',
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  className="singlet shadow-sm"
                  style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
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
                >
                  <Link to={`/product/${product.product?._id || product._id}`}>
                    <img
                      src={product.productImage || 'https://via.placeholder.com/300?text=No+Image'}
                      alt={product.productName || 'Product'}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                      }}
                      loading="lazy"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Error')}
                    />
                  </Link>
                  <div style={{ padding: '10px', flexGrow: 1 }}>
                    <h5 style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0 5px' }}>
                      {product.productName || 'Unknown Product'}
                    </h5>
                    <p style={{ fontSize: '12px', color: '#333', margin: '0 0 5px' }}>
                      {product.productCode || 'N/A'}
                    </p>
                    <p style={{ fontSize: '12px', margin: '0 0 5px' }}>
                      {product.productDescription?.length > 50
                        ? `${product.productDescription.slice(0, 50)}...`
                        : product.productDescription || 'No description'}
                    </p>
                    <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 5px' }}>
                      ₦{(parseFloat(product.productPrice) || 0).toFixed(2)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      {[...Array(Math.floor(parseFloat(product.ratings) || 0))].map((_, i) => (
                        <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                      ))}
                      {parseFloat(product.ratings) % 1 !== 0 && (
                        <i className="bi bi-star-half" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                      )}
                      <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
                        {product.ratings || '0'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }} className="hover-button d-none">
                      <button
                        className="btn btn-sm border-danger hover-button"
                        style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                        onClick={() => handleRemove(product.product?._id || product._id)}
                      >
                        <i className="bi bi-heart-fill me-1 text-danger" style={{ fontSize: '10px' }}></i>
                        Remove
                      </button>
                      <button
                        className="btn btn-sm border-danger btn-danger hover-button"
                        style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart3 me-1" style={{ fontSize: '10px' }}></i>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {paginate && totalPages > 1 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
              role="group"
            >
              <button
                style={{
                  padding: '8px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px',
                  backgroundColor: currentPage === 1 ? '#f8f9fa' : '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: isSmallScreen ? '12px' : '14px',
                }}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <i className="bi bi-arrow-left-short"></i>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  style={{
                    padding: '8px 12px',
                    border: currentPage === index + 1 ? '2px solid #ffc107' : '1px solid #dee2e6',
                    borderRadius: '4px',
                    backgroundColor: currentPage === index + 1 ? '#fff3cd' : '#fff',
                    cursor: 'pointer',
                    fontSize: isSmallScreen ? '12px' : '14px',
                  }}
                  onClick={() => setCurrentPage(index + 1)}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                style={{
                  padding: '8px 12px',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px',
                  backgroundColor: currentPage === totalPages ? '#f8f9fa' : '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: isSmallScreen ? '12px' : '14px',
                }}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <i className="bi bi-arrow-right-short"></i>
              </button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Wishlist;