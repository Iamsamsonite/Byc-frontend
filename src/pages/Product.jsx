 import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SortByDrop from '../component/SortByDrop';
import ToggleButton from '../component/ToggleButton';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import Sing from '../component/Sing';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToRecentViews } = useContext(RecentViewsContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const itemsPerPageLarge = 15; // For large screens
  const itemsPerPageSmall = 2; // For small screens

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setCurrentPage(1); // Reset page on resize to avoid index issues
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams(location.search);
        const category = query.get('category') || '';
        const API_URL = process.env.REACT_APP_API_URL || 'https://byc-backend-hkgk.onrender.com';
        const url = category
          ? `${API_URL}/api/byc/products?category=${encodeURIComponent(category)}`
          : `${API_URL}/api/byc/products`;
        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        });
        const validProducts = response.data
          .filter((product) => product && (product.id || product._id) && product.productName)
          .map((product) => ({
            id: product.id || product._id,
            productName: product.productName || 'Unknown Product',
            productDescription: product.productDescription || 'No description',
            productPrice: product.productPrice || 0,
            productImage:
              Array.isArray(product.productImage) && product.productImage.length > 0
                ? product.productImage[0]
                : product.productImage || 'https://via.placeholder.com/300?text=No+Image',
            ratings: product.ratings ?? 4.02,
            sizes: product.sizes || ['S', 'M', 'L', 'XL'],
            colors: product.colors || [],
            category: product.category || { name: 'Uncategorized' },
            productStock: product.productStock || 0,
            productNumber: product.productNumber || 'N/A',
          }));
        setProducts(validProducts);
        setCurrentPage(1); // Reset page on new data
      } catch (error) {
        let errorMessage = 'Failed to load products. Please try again later.';
        if (error.code === 'ECONNREFUSED') {
          errorMessage = 'Backend server is not running. Please start the server.';
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`;
        } else if (error.code === 'ERR_NETWORK') {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`);
    addToRecentViews(product);
  };

  const handleWishlistToggle = (product) => {
    const productId = product.id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ id: productId, productName: product.productName });
    }
  };

  // Pagination logic
  const getPaginationParams = () => {
    if (isSmallScreen) {
      const indexOfLastItem = currentPage * itemsPerPageSmall;
      const indexOfFirstItem = indexOfLastItem - itemsPerPageSmall;
      return {
        currentProducts: products.slice(indexOfFirstItem, indexOfLastItem),
        totalPages: Math.ceil(products.length / itemsPerPageSmall),
        paginate: products.length > itemsPerPageSmall,
      };
    }
    const indexOfLastItem = currentPage * itemsPerPageLarge;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageLarge;
    return {
      currentProducts: products.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(products.length / itemsPerPageLarge),
      paginate: products.length > itemsPerPageLarge,
    };
  };

  const { currentProducts, totalPages, paginate } = getPaginationParams();

  // Sorting logic
  const handleSortChange = (option) => {
    const sortedProducts = [...products];
    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
    } else if (option === 'name-asc') {
      sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (option === 'name-desc') {
      sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
    }
    setProducts(sortedProducts);
    setCurrentPage(1); // Reset to first page after sorting
  };

  const renderGridView = () => (
    <div className="row" style={{ gap: '1rem 0', padding: '1rem 0' }}>
      {currentProducts.map((product, index) => (
        <div
          key={index}
          className={isSmallScreen ? "col-6" : "col-6 col-md-4 col-lg-3"}
          style={{
            padding: '10px',
            boxSizing: 'border-box'
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
              flexDirection: 'column'
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
            <img
              src={product.productImage}
              alt={product.productName}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }}
              loading="lazy"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=No+Image')}
            />
            <div style={{ padding: '10px', flexGrow: '1' }}>
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0 5px' }}>
                {product.productName}
              </h5>
              <p style={{ fontSize: '14px', color: '#333', margin: '0 0 5px' }}>
                {product.productNumber || 'N/A'}
              </p>
              <p style={{ fontSize: '12px', margin: '0 0 5px' }}>
                {product.productDescription.substring(0, 50)}...
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 5px' }}>
                ₦{product.productPrice.toFixed(2)}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {[...Array(Math.floor(product.ratings || 4))].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                ))}
                {product.ratings % 1 !== 0 && (
                  <i className="bi bi-star-half" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                )}
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
                  {product.ratings}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }} className="bot d-none">
                <button
                  className="btn btn-sm border-danger"
                  style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                    className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                    style={{ fontSize: '10px' }}
                  ></i>
                  {isInWishlist(product.id) ? 'Remove' : 'Wishlist'}
                </button>
                <button
                  className="btn btn-sm border-danger btn-danger"
                  style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                  onClick={() => handleBuyNow(product)}
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
  );

  const renderListView = () => (
    <div className="list-group">
      {currentProducts.map((product, index) => (
        <div key={index} className="list-group-item">
          <div
            className="d-flex align-items-center singlet shadow-sm"
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.querySelector('.bot').classList.remove('d-none');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelector('.bot').classList.add('d-none');
            }}
          >
            <img
              src={product.productImage}
              alt={product.productName}
              style={{
                width: isSmallScreen ? '150px' : '200px',
                height: isSmallScreen ? '150px' : '200px',
                objectFit: 'cover',
                marginRight: '20px'
              }}
              loading="lazy"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=No+Image')}
            />
            <div style={{ flex: '1' }}>
              <h5 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px' }}>
                {product.productName}
              </h5>
              <p style={{ fontSize: '14px', color: '#333', margin: '0 0 5px' }}>
                {product.productNumber || 'N/A'}
              </p>
              <p style={{ fontSize: '12px', margin: '0 0 5px' }}>
                {product.productDescription.substring(0, 100)}...
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 5px' }}>
                ₦{product.productPrice.toFixed(2)}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {[...Array(Math.floor(product.ratings || 4))].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                ))}
                {product.ratings % 1 !== 0 && (
                  <i className="bi bi-star-half" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                )}
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
                  {product.ratings}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }} className="bot d-none">
                <button
                  className="btn btn-sm border-danger"
                  style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                    className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                    style={{ fontSize: '10px' }}
                  ></i>
                  {isInWishlist(product.id) ? 'Remove' : 'Wishlist'}
                </button>
                <button
                  className="btn btn-sm border-danger btn-danger"
                  style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                  onClick={() => handleBuyNow(product)}
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
  );

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '2rem auto', textAlign: 'center', padding: '2rem' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Loading products...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '2rem auto', textAlign: 'center', padding: '2rem' }}>
        <h5 className="text-danger">{error}</h5>
        <p>Please check if the backend server is running and try again.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px', boxSizing: 'border-box', border: '1px solid #dee2e6' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 0',
            borderBottom: '1px solid #dee2e6',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ flex: '0 0 auto' }}>
            <b style={{ fontSize: '14px' }}>All Products</b>
          </div>
          <div style={{ flex: '1 1 auto' }}></div>
          <div style={{ flex: '0 0 auto', position: 'relative', zIndex: 1000 }}>
            <SortByDrop onSortChange={handleSortChange} isSmallScreen={isSmallScreen} />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 0',
            borderBottom: '1px solid #dee2e6',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ flex: '0 0 auto' }}>
            <p style={{ fontSize: '14px' }}>{products.length} Products Found</p>
          </div>
          <div style={{ flex: '1 1 auto' }}></div>
          <div style={{ flex: '0 0 auto' }}>
            <ToggleButton activeView={viewMode} onToggle={setViewMode} />
          </div>
        </div>

        {viewMode === 'grid' ? renderGridView() : renderListView()}

        {paginate && totalPages > 1 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap'
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
                  fontSize: isSmallScreen ? '12px' : '14px'
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
                    fontSize: isSmallScreen ? '12px' : '14px'
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
                  fontSize: isSmallScreen ? '12px' : '14px'
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
      </div>
      <Sing />
    </>
  );
};

export default Products;