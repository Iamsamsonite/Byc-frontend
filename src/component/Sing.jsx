 import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { CartContext } from '../context/CartContext';

const Sing = () => {
  const { addToCart } = useContext(CartContext); // Kept for potential future use
  const { recentViews, error } = useContext(RecentViewsContext);
  const [showAll, setShowAll] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Handle window resize for responsive carousel
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (recentViews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '14px', color: '#787885' }}>No recent views available.</p>
      </div>
    );
  }

  const productsPerPage = isSmallScreen ? 2 : 4;
  const productsToShow = showAll
    ? recentViews
    : recentViews.slice(carouselIndex, carouselIndex + productsPerPage);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - productsPerPage, 0));
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      Math.min(prev + productsPerPage, Math.max(recentViews.length - productsPerPage, 0))
    );
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '1rem',
        border: '1px solid #dee2e6',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          borderBottom: '1px solid #dee2e6'
        }}
      >
        <div style={{ flex: '0 0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0 }}>
            Recently Viewed
          </p>
        </div>
        <div style={{ flex: '1 1 auto' }}></div>
        <div style={{ flex: '0 0 auto' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#dc3545',
              fontSize: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'See All'}{' '}
            <i className="bi bi-chevron-compact-right" style={{ marginLeft: '4px' }}></i>
          </button>
        </div>
      </div>

      {error && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <p style={{ color: '#dc3545', fontSize: '14px' }}>{error}</p>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          padding: '1rem 0',
          position: 'relative'
        }}
      >
        {!showAll && (
          <div
            style={{
              position: 'absolute',
              left: '-30px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1
            }}
          >
            <i
              className="bi bi-caret-left"
              style={{
                cursor: carouselIndex > 0 ? 'pointer' : 'not-allowed',
                fontSize: '24px',
                color: carouselIndex > 0 ? '#000' : '#ccc'
              }}
              onClick={carouselIndex > 0 ? handlePrev : null}
              aria-label="Previous products"
            ></i>
          </div>
        )}
        {productsToShow.length === 0 && !error ? (
          <p style={{ fontSize: '14px', color: '#787885', width: '100%', textAlign: 'center' }}>
            No recently viewed products.
          </p>
        ) : (
          productsToShow.map((product, index) => (
            <div
              key={product.productId || index}
              style={{
                flex: isSmallScreen ? '1 1 45%' : '1 1 23%',
                maxWidth: isSmallScreen ? '45%' : '23%',
                marginBottom: '1rem'
              }}
            >
              <div
                className="singlet"
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'scale(1.05)';
                  card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                  card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                  const buttons = card.querySelectorAll('.bot');
                  buttons.forEach((btn) => btn.classList.remove('d-none'));
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'scale(1)';
                  card.style.boxShadow = 'none';
                  const buttons = card.querySelectorAll('.bot');
                  buttons.forEach((btn) => btn.classList.add('d-none'));
                }}
                style={{
                  backgroundColor: '#FBFBFB',
                  borderRadius: '8px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Link to={`/product/${product.productId}`}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                    loading="lazy"
                  />
                </Link>
                <div style={{ padding: '10px', flexGrow: 1 }}>
                  <h5 style={{ fontWeight: 'bold', fontSize: '14px', margin: '10px 0 5px' }}>
                    {product.productName}
                  </h5>
                  <p style={{ fontSize: '12px', margin: '0 0 5px' }}>{product.productCode}</p>
                  <p style={{ color: '#787885', fontSize: '12px', margin: '0 0 5px' }}>
                    {product.productDescription?.substring(0, 50)}...
                  </p>
                  <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 5px' }}>
                    ₦{parseFloat(product.productPrice).toFixed(2)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {[...Array(Math.floor(product.ratings || 4))].map((_, i) => (
                      <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                    ))}
                    {product.ratings % 1 !== 0 && (
                      <i className="bi bi-star-half" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                    )}
                    <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
                      {product.ratings || 4.0}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-sm border-danger bot d-none"
                      style={{
                        fontSize: '10px',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      <Link
                        to="/wishlist"
                        style={{ textDecoration: 'none', color: '#dc3545', display: 'flex', alignItems: 'center' }}
                      >
                        <i className="bi bi-heart me-1" style={{ fontSize: '10px', color: '#dc3545' }}></i>
                        Wishlist
                      </Link>
                    </button>
                    <Link
                      to={`/product/${product.productId}`}
                      className="btn btn-sm border-danger btn-danger bot d-none"
                      style={{
                        fontSize: '10px',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      <i className="bi bi-cart3 me-1" style={{ fontSize: '10px' }}></i>
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {!showAll && (
          <div
            style={{
              position: 'absolute',
              right: '-30px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1
            }}
          >
            <i
              className="bi bi-caret-right"
              style={{
                cursor: carouselIndex + productsPerPage < recentViews.length ? 'pointer' : 'not-allowed',
                fontSize: '24px',
                color: carouselIndex + productsPerPage < recentViews.length ? '#000' : '#ccc'
              }}
              onClick={carouselIndex + productsPerPage < recentViews.length ? handleNext : null}
              aria-label="Next products"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sing;