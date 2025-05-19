 


import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { CartContext } from '../context/CartContext';

const Sing = () => {

  const { addToCart } = useContext(CartContext); // Kept for potential future use
  const [showAll, setShowAll] = useState(false);
  const { recentViews, error, addToRecentViews } = useContext(RecentViewsContext);

  if (recentViews.length === 0) {
    return <p>No recent views available.</p>;
  }


  const productsToShow = showAll ? recentViews : recentViews.slice(0, 5);

  return (
    <div>
      <div className="container mt-5 pt-3 border">
        <div className="row pt-3 border-bottom">
          <div className="col-md-2">
            <p style={{ fontSize: '10px' }}>
              <b>Recently Viewed</b>
            </p>
          </div>
          <div className="col-md-9"></div>
          <div className="col-md-1">
            <button
              className="border-0 text-danger bg-white"
              style={{ fontSize: '9px', cursor: 'pointer' }}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'See All'} <i className="bi bi-chevron-compact-right"></i>
            </button>
          </div>
        </div>

        {error && (
          <div className="text-center my-3">
            <p className="text-danger" style={{ fontSize: '14px' }}>
              {error}
            </p>
          </div>
        )}

        {/* <div className="row g-3">
          {productsToShow.length === 0 && !error ? (
            <p style={{ fontSize: '14px', color: '#787885' }}>No recently viewed products.</p>
          ) : (
            productsToShow.map((product, index) => (
              <div
                key={product.productId || index}
                className="col-6 col-md px-2 mb-3"
                style={{ flex: '0 0 20%', maxWidth: '20%' }}
              >
                <div
                  className="singlet shadow-sm"
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
                  style={{ backgroundColor: '#FBFBFB', borderRadius: '8px' }}
                >
                  <Link to={`/product/${product.productId}`}>
                    <img
                      src={product.productImage}
                      className="img-fluid"
                      alt={product.productName}
                      style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', height: '150px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
                    />
                  </Link>
                  <div className="px-2">
                    <h5 style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>
                      {product.productName}
                    </h5>
                    <p style={{ fontSize: '12px' }}>{product.productCode}</p>
                    <p style={{ color: '#787885', fontSize: '12px' }}>
                      {product.productDescription?.substring(0, 50)}...
                    </p>
                    <p>
                      <b>₦{parseFloat(product.productPrice).toFixed(2)}</b>
                    </p>
                  </div>
                  <div>
                    {[...Array(Math.floor(product.ratings || 4))].map((_, i) => (
                      <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                    ))}
                    {product.ratings % 1 !== 0 && (
                      <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                    )}
                    <span className="ms-2 fw-bold" style={{ fontSize: '12px' }}>
                      {product.ratings || 4.0}
                    </span>
                  </div>
                  <div className="d-flex pb-3">
                    <button className="btn btn-sm border-danger mt-3 d-none bot">
                      <Link
                        to="/wishlist"
                        className="text-decoration-none"
                        style={{ fontSize: '10px', color: '#dc3545' }}
                      >
                        <i className="bi bi-heart me-1 text-danger" style={{ fontSize: '10px' }}></i>
                        Wishlist
                      </Link>
                    </button>
                    <Link
                      to={`/product/${product.productId}`}
                      className="btn btn-sm border-danger btn-danger d-none ms-1 mt-3 bot"
                      style={{ fontSize: '10px' }}
                    >
                      <i className="bi bi-cart3 text-white" style={{ fontSize: '10px' }}></i>
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div> */}

<div className="row g-3">
  {productsToShow.length === 0 && !error ? (
    <p style={{ fontSize: '14px', color: '#787885' }}>No recently viewed products.</p>
  ) : (
    productsToShow.map((product, index) => (
      <div
        key={product.productId || index}
        className="col-6 col-md px-2 mb-3"
        style={{ flex: '0 0 20%', maxWidth: '20%' }}
      >
        <div
          className="singlet shadow-sm"
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
          style={{ backgroundColor: '#FBFBFB', borderRadius: '8px' }}
        >
          <Link to={`/product/${product.productId}`}>
            <img
              src={product.productImage}
              className="img-fluid"
              alt={product.productName}
              style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', height: '150px', objectFit: 'cover' }}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=No+Image')}
            />
          </Link>
          <div className="px-2">
            <h5 style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>
              {product.productName}
            </h5>
            <p style={{ fontSize: '12px' }}>{product.productCode}</p>
            <p style={{ color: '#787885', fontSize: '12px' }}>
              {product.productDescription?.substring(0, 50)}...
            </p>
            <p>
              <b>₦{parseFloat(product.productPrice).toFixed(2)}</b>
            </p>
          </div>
          <div>
            {[...Array(Math.floor(product.ratings || 4))].map((_, i) => (
              <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
            ))}
            {product.ratings % 1 !== 0 && (
              <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
            )}
            <span className="ms-2 fw-bold" style={{ fontSize: '12px' }}>
              {product.ratings || 4.0}
            </span>
          </div>
          <div className="d-flex pb-3">
            <button className="btn btn-sm border-danger mt-3 d-none bot">
              <Link
                to="/wishlist"
                className="text-decoration-none"
                style={{ fontSize: '10px', color: '#dc3545' }}
              >
                <i className="bi bi-heart me-1 text-danger" style={{ fontSize: '10px' }}></i>
                Wishlist
              </Link>
            </button>
            <Link
              to={`/product/${product.productId}`}
              className="btn btn-sm border-danger btn-danger d-none ms-1 mt-3 bot"
              style={{ fontSize: '10px' }}
            >
              <i className="bi bi-cart3 text-white" style={{ fontSize: '10px' }}></i>
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    ))
  )}
</div>
      </div>
    </div>
  );
};

export default Sing;