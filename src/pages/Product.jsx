 import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SortByDrop from '../component/SortByDrop';
import ToggleButton from '../component/ToggleButton';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext'; // eslint-disable-line no-unused-vars
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

  // Responsive items per page
  const isLargeScreen = window.innerWidth >= 992;
  const itemsPerPage = isLargeScreen ? 16 : 8;

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
        console.log('Fetched products:', response.data);

        const validProducts = response.data
          .filter((product) => product && (product.id || product._id) && product.productName)
          .map((product) => {
            const mappedProduct = {
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
            };
            console.log('Mapped product:', mappedProduct);
            return mappedProduct;
          });

        setProducts(validProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message, error);
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
      sortedProducts.sort((a, b) => b.productName.localeCompare(b.productName));
    }
    setProducts(sortedProducts);
  };

  const renderGridView = () => (
    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {currentProducts.map((product, index) => (
        <div key={index} className="col-lg-3 col-md-6 my-3 d-flex flex-column" style={{ padding: '10px' }}>
          <div
            className="singlet shadow-sm"
            style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease', height: '100%' }}
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
              className="img-fluid"
              alt={product.productName}
              style={{
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            />
            <div className="px-2" style={{ flexGrow: 1, paddingBottom: '10px' }}>
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>{product.productName}</h5>
              <p style={{ fontSize: '14px', color: '#333', margin: '5px 0' }}>
                {product.productNumber || 'N/A'}
              </p>
              <p style={{ fontSize: '12px' }}>{product.productDescription}</p>
              <p><b>₦{product.productPrice.toFixed(2)}</b></p>
              <div className="d-flex align-items-center">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                ))}
                <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                <span className="ms-2 fw-bold">{product.ratings}</span>
              </div>
              <div className="d-flex bot d-none" style={{ marginTop: '10px' }}>
                <button
                  className="btn btn-sm border-danger mt-3"
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                    className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                    style={{ fontSize: '10px' }}
                  ></i>
                  <span className="text-danger" style={{ fontSize: '10px' }}>
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
                <button
                  className="btn btn-sm border-danger btn-danger ms-1 mt-3"
                  onClick={() => handleBuyNow(product)}
                >
                  <i className="bi bi-cart3 text-white"></i>
                  <span className="text-white" style={{ fontSize: '10px' }}>Buy Now</span>
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
        <div key={index} className="list-group-item mb-3 ">
          <div
            className="d-flex singlet shadow-sm"
            style={{ 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
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
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                marginRight: '20px',
                borderRadius: '8px',
              }}
            />
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
              <h5 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>{product.productName}</h5>
              <p style={{ fontSize: '14px', color: '#333', margin: '5px 0' }}>
                {product.productNumber || 'N/A'}
              </p>
              <p style={{ fontSize: '12px', margin: '5px 0' }}>{product.productDescription}</p>
              <p style={{ fontWeight: 'bold', margin: '5px 0' }}>₦{product.productPrice.toFixed(2)}</p>
              <div className="d-flex align-items-center mb-3">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                ))}
                <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                <span className="ms-2 fw-bold">{product.ratings}</span>
                 <div className="d-flex bot d-none">
                <button
                  className="btn btn-sm border-danger mt-3"
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                    className={`bi ${isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                    style={{ fontSize: '10px' }}
                  ></i>
                  <span className="text-danger" style={{ fontSize: '10px' }}>
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
                <button
                  className="btn btn-sm border-danger btn-danger ms-1 mt-3"
                  onClick={() => handleBuyNow(product)}
                >
                  <i className="bi bi-cart3 text-white"></i>
                  <span className="text-white" style={{ fontSize: '10px' }}>Buy Now</span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Loading products...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
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
      <div className="container mt-5 border">
        <div className="row border-bottom align-items-center">
          <div className="col-md-2">
            <b style={{ fontSize: '14px' }}>All Products</b>
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-2 d-flex justify-content-end">
            <SortByDrop onSortChange={handleSortChange} />
          </div>
        </div>

        <div className="row my-3 border-bottom">
          <div className="col-md-2">
            <p style={{ fontSize: '14px' }}>{products.length} Products Found</p>
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-2 d-flex justify-content-end">
            <ToggleButton activeView={viewMode} onToggle={setViewMode} />
          </div>
        </div>

        {viewMode === 'grid' ? renderGridView() : renderListView()}

        {totalPages > 1 && (
          <div className="text-center">
            <div className="btn-group rounded-0 shadow-sm gap-2 my-5" role="group">
              <button
                type="button"
                className="btn shadow-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <i className="bi bi-arrow-left-short"></i>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn shadow-sm ${currentPage === index + 1 ? 'border-warning' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                type="button"
                className="btn shadow-sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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