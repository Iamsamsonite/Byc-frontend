 import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { WishlistContext } from '../context/WishlistContext';

const Sing = () => {
  const { recentViews, error } = useContext(RecentViewsContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [showAll, setShowAll] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(window.innerWidth < 576);

  // Handle window resize for responsive grid
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsVerySmallScreen(window.innerWidth < 576);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Limit products to show (e.g., 10 when not showing all)
  const productsToShow = showAll ? recentViews : recentViews.slice(0, 10);

  // Handle wishlist toggle
  const handleWishlistToggle = (product) => {
    const productId = product.productId;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ id: productId, productName: product.productName });
    }
  };

  if (recentViews.length === 0 && !error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '2rem auto', textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '14px', color: '#787885' }}>No recently viewed products.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '2rem auto', textAlign: 'center', padding: '2rem' }}>
        <h5 className="text-danger">{error}</h5>
        <p>Please try again or contact support if the issue persists.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '1rem',
        border: '1px solid #dee2e6',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          borderBottom: '1px solid #dee2e6',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ flex: '0 0 auto' }}>
          <p style={{ fontSize: isVerySmallScreen ? '12px' : '14px', fontWeight: 'bold', margin: 0 }}>
            Recently Viewed
          </p>
        </div>
        <div style={{ flex: '1 1 auto' }}></div>
        {recentViews.length > 10 && (
          <div style={{ flex: '0 0 auto' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#dc3545',
                fontSize: isVerySmallScreen ? '9px' : '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'See All'}{' '}
              <i className="bi bi-chevron-compact-right" style={{ marginLeft: '4px' }}></i>
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: isVerySmallScreen ? '0.5rem' : '1rem',
          justifyContent: 'flex-start',
          padding: '1rem 0',
        }}
      >
        {productsToShow.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#787885', width: '100%', textAlign: 'center' }}>
            No recently viewed products.
          </p>
        ) : (
          productsToShow.map((product) => (
            <div
              key={product.productId}
              style={{
                flex: isVerySmallScreen ? '1 1 100%' : isSmallScreen ? '1 1 47%' : '1 1 23%',
                maxWidth: isVerySmallScreen ? '100%' : isSmallScreen ? '47%' : '23%',
                padding: isVerySmallScreen ? '5px' : '10px',
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
                  border: '1px solid #dee2e6',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                  const bot = e.currentTarget.querySelector('.bot');
                  if (bot) bot.classList.remove('d-none');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  const bot = e.currentTarget.querySelector('.bot');
                  if (bot) bot.classList.add('d-none');
                }}
              >
                <Link to={`/product/${product.productId}`}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={{
                      width: '100%',
                      height: isVerySmallScreen ? '150px' : '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                    loading="lazy"
                  />
                </Link>
                <div style={{ padding: isVerySmallScreen ? '8px' : '10px', flexGrow: 1 }}>
                  <h5
                    style={{
                      fontWeight: 'bold',
                      fontSize: isVerySmallScreen ? '14px' : '16px',
                      margin: '10px 0 5px',
                    }}
                  >
                    {product.productName}
                  </h5>
                  <p
                    style={{
                      fontSize: isVerySmallScreen ? '12px' : '14px',
                      color: '#333',
                      margin: '0 0 5px',
                    }}
                  >
                    {product.productCode || 'N/A'}
                  </p>
                  <p
                    style={{
                      fontSize: isVerySmallScreen ? '10px' : '12px',
                      color: '#787885',
                      margin: '0 0 5px',
                    }}
                  >
                    {product.productDescription?.substring(0, 50) || 'No description'}...
                  </p>
                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: isVerySmallScreen ? '12px' : '14px',
                      margin: '0 0 5px',
                    }}
                  >
                    ₦{parseFloat(product.productPrice || 0).toFixed(2)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {[...Array(Math.floor(product.ratings || 4))].map((_, i) => (
                      <i
                        key={i}
                        className="bi bi-star-fill"
                        style={{
                          color: '#FB8200',
                          fontSize: isVerySmallScreen ? '10px' : '12px',
                        }}
                      ></i>
                    ))}
                    {product.ratings % 1 !== 0 && (
                      <i
                        className="bi bi-star-half"
                        style={{
                          color: '#FB8200',
                          fontSize: isVerySmallScreen ? '10px' : '12px',
                        }}
                      ></i>
                    )}
                    <span
                      style={{
                        fontSize: isVerySmallScreen ? '10px' : '12px',
                        fontWeight: 'bold',
                        marginLeft: '4px',
                      }}
                      >
                      {(product.ratings || 4.0).toFixed(1)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: isVerySmallScreen ? '4px' : '8px' }} className="bot d-none">
                    <button
                      className="btn btn-sm border-danger"
                      style={{
                        fontSize: isVerySmallScreen ? '8px' : '10px',
                        padding: isVerySmallScreen ? '4px 6px' : '4px 8px',
                        borderRadius: '4px',
                      }}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <i
                        className={`bi ${isInWishlist(product.productId) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                        style={{ fontSize: isVerySmallScreen ? '8px' : '10px' }}
                      ></i>
                      {isInWishlist(product.productId) ? 'Remove' : 'Wishlist'}
                    </button>
                    <Link
                      to={`/product/${product.productId}`}
                      className="btn btn-sm border-danger btn-danger"
                      style={{
                        fontSize: isVerySmallScreen ? '8px' : '10px',
                        padding: isVerySmallScreen ? '4px 6px' : '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      <i
                        className="bi bi-cart3 me-1"
                        style={{ fontSize: isVerySmallScreen ? '8px' : '10px' }}
                      ></i>
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sing;