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
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(window.innerWidth < 576);

  const itemsPerPageLarge = 15; // For large screens
  const itemsPerPageSmall = 10; // For small and very small screens

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
            productDescription: product.productDescription || 'No description available',
            productPrice: typeof product.productPrice === 'number' ? product.productPrice : 0,
            productImage:
              Array.isArray(product.productImage) && product.productImage.length > 0
                ? product.productImage[0]
                : product.productImage || 'https://via.placeholder.com/300?text=No+Image',
            ratings: typeof product.ratings === 'number' ? product.ratings : 4.0,
            sizes: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'],
            colors: Array.isArray(product.colors) ? product.colors : [],
            category: product.category && typeof product.category === 'object' ? product.category : { name: 'Uncategorized' },
            productStock: typeof product.productStock === 'number' ? product.productStock : 0,
            productNumber: product.productNumber || 'N/A',
          }));
        if (validProducts.length === 0) {
          setError('No products found for this category.');
        }
        setProducts(validProducts);
        setCurrentPage(1);
      } catch (error) {
        console.error('Fetch products error:', error);
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
    if (!product || !product.id) return;
    navigate(`/product/${product.id}`);
    addToRecentViews(product);
  };

  const handleWishlistToggle = (product) => {
    if (!product || !product.id) return;
    const productId = product.id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ id: productId, productName: product.productName });
    }
  };

  // Pagination logic
  const getPaginationParams = () => {
    const totalItems = products.length;
    if (isSmallScreen) {
      const indexOfLastItem = Math.min(currentPage * itemsPerPageSmall, totalItems);
      const indexOfFirstItem = indexOfLastItem - itemsPerPageSmall;
      const totalPages = Math.ceil(totalItems / itemsPerPageSmall);
      return {
        currentProducts: products.slice(indexOfFirstItem, indexOfLastItem),
        totalPages: Math.max(1, totalPages),
        paginate: totalItems > itemsPerPageSmall,
      };
    }
    const indexOfLastItem = Math.min(currentPage * itemsPerPageLarge, totalItems);
    const indexOfFirstItem = indexOfLastItem - itemsPerPageLarge;
    const totalPages = Math.ceil(totalItems / itemsPerPageLarge);
    return {
      currentProducts: products.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.max(1, totalPages),
      paginate: totalItems > itemsPerPageLarge,
    };
  };

  const { currentProducts, totalPages, paginate } = getPaginationParams();

  // Sorting logic
  const handleSortChange = (option) => {
    console.log('Sorting by:', option);
    if (!option) return;
    const sortedProducts = [...products];
    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
    } else if (option === 'name-asc') {
      sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (option === 'name-desc') {
      sortedProducts.sort((a, b) => b.productName.localeCompare(b.productName));
    }
    setProducts(sortedProducts);
    setCurrentPage(1);
  };

  const renderGridView = () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: isVerySmallScreen ? '0.5rem' : '1rem',
        padding: '1rem 0',
      }}
    >
      {currentProducts.length === 0 ? (
        <p style={{ fontSize: isVerySmallScreen ? '12px' : '14px', color: '#787885', width: '100%', textAlign: 'center' }}>
          No products available.
        </p>
      ) : (
        currentProducts.map((product) => (
          <div
            key={product.id}
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
              <Link to={`/product/${product.id}`}>
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
                  loading="lazy"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Error')}
                />
              </Link>
              <div style={{ padding: isVerySmallScreen ? '8px' : '10px', flexGrow: '1' }}>
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
                  {product.productNumber}
                </p>
                <p
                  style={{
                    fontSize: isVerySmallScreen ? '10px' : '12px',
                    margin: '0 0 5px',
                  }}
                >
                  {product.productDescription.substring(0, 50)}...
                </p>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: isVerySmallScreen ? '12px' : '14px',
                    margin: '0 0 5px',
                  }}
                >
                  ₦{product.productPrice.toFixed(2)}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {[...Array(Math.floor(product.ratings))].map((_, i) => (
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
                    {product.ratings.toFixed(1)}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', gap: isVerySmallScreen ? '4px' : '8px' }}
                  className="bot d-none"
                >
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
                      className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                      style={{ fontSize: isVerySmallScreen ? '8px' : '10px' }}
                    ></i>
                    {isInWishlist(product.id) ? 'Remove' : 'Wishlist'}
                  </button>
                  <button
                    className="btn btn-sm border-danger btn-danger"
                    style={{
                      fontSize: isVerySmallScreen ? '8px' : '10px',
                      padding: isVerySmallScreen ? '4px 6px' : '4px 8px',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleBuyNow(product)}
                  >
                    <i
                      className="bi bi-cart3 me-1"
                      style={{ fontSize: isVerySmallScreen ? '8px' : '10px' }}
                    ></i>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderListView = () => (
    <div className="list-group" style={{ padding: '1rem 0' }}>
      {currentProducts.length === 0 ? (
        <p style={{ fontSize: isVerySmallScreen ? '12px' : '14px', color: '#787885', textAlign: 'center' }}>
          No products available.
        </p>
      ) : (
        currentProducts.map((product) => (
          <div
            key={product.id}
            className="list-group-item"
            style={{ padding: isVerySmallScreen ? '8px' : '10px', border: '1px solid #dee2e6', marginBottom: '10px', borderRadius: '4px' }}
          >
            <div
              className="d-flex align-items-center singlet shadow-sm"
              style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
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
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  style={{
                    width: isVerySmallScreen ? '100px' : isSmallScreen ? '120px' : '150px',
                    height: isVerySmallScreen ? '100px' : isSmallScreen ? '120px' : '150px',
                    objectFit: 'cover',
                    marginRight: isVerySmallScreen ? '10px' : '20px',
                    borderRadius: '4px',
                  }}
                  loading="lazy"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=Image+Error')}
                />
              </Link>
              <div style={{ flex: '1' }}>
                <h5
                  style={{
                    fontSize: isVerySmallScreen ? '14px' : '16px',
                    fontWeight: 'bold',
                    margin: '0 0 5px',
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
                  {product.productNumber}
                </p>
                <p
                  style={{
                    fontSize: isVerySmallScreen ? '10px' : '12px',
                    margin: '0 0 5px',
                  }}
                >
                  {product.productDescription.substring(0, 100)}...
                </p>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: isVerySmallScreen ? '12px' : '14px',
                    margin: '0 0 5px',
                  }}
                >
                  ₦{product.productPrice.toFixed(2)}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  {[...Array(Math.floor(product.ratings))].map((_, i) => (
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
                    {product.ratings.toFixed(1)}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', gap: isVerySmallScreen ? '4px' : '8px' }}
                  className="bot d-none"
                >
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
                      className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                      style={{ fontSize: isVerySmallScreen ? '8px' : '10px' }}
                    ></i>
                    {isInWishlist(product.id) ? 'Remove' : 'Wishlist'}
                  </button>
                  <button
                    className="btn btn-sm border-danger btn-danger"
                    style={{
                      fontSize: isVerySmallScreen ? '8px' : '10px',
                      padding: isVerySmallScreen ? '4px 6px' : '4px 8px',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleBuyNow(product)}
                  >
                    <i
                      className="bi bi-cart3 me-1"
                      style={{ fontSize: isVerySmallScreen ? '8px' : '10px' }}
                    ></i>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
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
        <p>Please try again or contact support if the issue persists.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px', boxSizing: 'border-box', border: '1px solid #dee2e6' }}>
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
          <b style={{ fontSize: isVerySmallScreen ? '12px' : '14px' }}>All Products</b>
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
          gap: '1rem',
        }}
      >
        <div style={{ flex: '0 0 auto' }}>
          <p style={{ fontSize: isVerySmallScreen ? '12px' : '14px' }}>
            {products.length} Products Found
          </p>
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
              gap: isVerySmallScreen ? '0.3rem' : '0.5rem',
              flexWrap: 'wrap',
            }}
            role="group"
          >
            <button
              style={{
                padding: isVerySmallScreen ? '6px 10px' : '8px 12px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                backgroundColor: currentPage === 1 ? '#f8f9fa' : '#fff',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: isVerySmallScreen ? '10px' : isSmallScreen ? '12px' : '14px',
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
                  padding: isVerySmallScreen ? '6px 10px' : '8px 12px',
                  border: currentPage === index + 1 ? '2px solid #ffc107' : '1px solid #dee2e6',
                  borderRadius: '4px',
                  backgroundColor: currentPage === index + 1 ? '#fff3cd' : '#fff',
                  cursor: 'pointer',
                  fontSize: isVerySmallScreen ? '10px' : isSmallScreen ? '12px' : '14px',
                }}
                onClick={() => setCurrentPage(index + 1)}
                aria-label={`Page ${index + 1}`}
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
      <Sing />
    </div>
  );
};

export default Products;