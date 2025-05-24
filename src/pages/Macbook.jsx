 import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../component/ToggleButton';
import SortByDrop from '../component/SortByDrop';
import Sing from '../component/Sing';
import { allProducts } from '../asset';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { WishlistContext } from '../context/WishlistContext';

// Normalize allProducts
const normalizedProducts = allProducts.map((product, index) => ({
  ...product,
  _id: product._id || `static-${index}`,
  productName: product.productName || 'Unknown Product',
  productPrice: parseFloat(
    product.productPrice?.replace('₦', '').replace(',', '') || '0'
  ),
  productImage: Array.isArray(product.productImage)
    ? product.productImage
    : [product.productImage || 'https://via.placeholder.com/150?text=No+Image'],
  productCode: product.productCode || product.productNumber || 'N/A',
  productDescription: product.productDescription || 'No description',
  ratings: typeof product.ratings === 'number' ? product.ratings : 4.5,
  popularity: product.popularity || 0,
  createdAt: product.createdAt || new Date().toISOString(),
}));

const Macbook = () => {
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();
  const { addToRecentViews } = useContext(RecentViewsContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  // Handle sort option change
  const handleSortChange = (option) => {
    console.log('Macbook: Received sort option:', option);
    setSortOption(option);
  };

  const getSortedProducts = () => {
    let sorted = [...normalizedProducts];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.productPrice - b.productPrice);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        // No sorting for empty or unrecognized option
        break;
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();
  const productsToDisplay = sortedProducts.slice(0, 7); // Display only first 7 products

  const handleBuyNow = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate(`/product/${product._id}`);
    addToRecentViews(product);
  };

  const handleWishlistToggle = (product) => {
    const productId = product._id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ ...product, productId });
    }
  };

  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#fff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const renderGridView = () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'flex-start',
      }}
    >
      {productsToDisplay.map((product) => (
        <div
          key={product._id}
          style={{
            flex: '1 1 100%',
            maxWidth: '100%',
            padding: '5px',
            boxSizing: 'border-box',
            '@media (min-width: 576px)': { flex: '1 1 47%', maxWidth: '47%' },
            '@media (min-width: 768px)': { flex: '1 1 31%', maxWidth: '31%' },
          }}
        >
          <div
            className="singlet shadow-sm"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.remove('d-none'));
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.add('d-none'));
            }}
          >
            <img
              src={
                Array.isArray(product.productImage) && product.productImage.length > 0
                  ? product.productImage[0]
                  : 'https://via.placeholder.com/150?text=No+Image'
              }
              alt={product.productName}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                loading: 'lazy',
              }}
            />
            <div style={{ padding: '10px', flexGrow: 1 }}>
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0 5px' }}>
                {product.productName}
              </h5>
              <p style={{ fontSize: '12px', margin: '0 0 5px' }}>{product.productCode}</p>
              <p style={{ fontSize: '12px', color: '#787885', margin: '0 0 5px' }}>
                {product.productDescription.substring(0, 50)}...
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 5px' }}>
                ₦{product.productPrice.toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {[...Array(Math.floor(product.ratings))].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                ))}
                {product.ratings % 1 !== 0 && (
                  <i className="bi bi-star-half" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                )}
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
                  {product.ratings.toFixed(1)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }} className="bot d-none">
                <button
                  className="btn btn-sm border-danger"
                  style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                    className={`bi ${isInWishlist(product._id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                    style={{ fontSize: '10px' }}
                  ></i>
                  {isInWishlist(product._id) ? 'Remove' : 'Wishlist'}
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
    <div style={{ width: '100%' }}>
      {productsToDisplay.map((product) => (
        <div
          key={product._id}
          className="mb-3"
          style={{
            padding: '15px',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.remove('d-none'));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.add('d-none'));
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <div style={{ flex: '0 0 150px' }}>
              <img
                src={
                  Array.isArray(product.productImage) && product.productImage.length > 0
                    ? product.productImage[0]
                    : 'https://via.placeholder.com/150?text=No+Image'
                }
                alt={product.productName}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  loading: 'lazy',
                }}
              />
            </div>
            <div style={{ flex: '1', padding: '10px' }}>
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 0 5px' }}>
                {product.productName}
              </h5>
              <p style={{ fontSize: '12px', margin: '0 0 5px' }}>{product.productCode}</p>
              <p style={{ fontSize: '12px', color: '#787885', margin: '0 0 5px' }}>
                {product.productDescription.substring(0, 100)}...
              </p>
              <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 5px' }}>
                ₦{product.productPrice.toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {[...Array(Math.floor(product.ratings))].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                ))}
                {product.ratings % 1 !== 0 && (
                  <i className="bi bi-star-half" style={{ color: '#FB8200', fontSize: '12px' }}></i>
                )}
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
                  {product.ratings.toFixed(1)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }} className="bot d-none">
                <button
                  className="btn btn-sm border-danger"
                  style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                    className={`bi ${isInWishlist(product._id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                    style={{ fontSize: '10px' }}
                  ></i>
                  {isInWishlist(product._id) ? 'Remove' : 'Wishlist'}
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

  return (
    <>
      <nav className="container ms-2" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active">Women</li>
          <li className="breadcrumb-item active">Camisole</li>
        </ol>
      </nav>

      <div className="container mt-5 pt-1 mb-2 border">
        <div
          className="row border-bottom align-items-center"
          style={{ flexWrap: 'wrap', gap: '1rem' }}
        >
          <div className="col-md-2 col-12">
            <b style={{ fontSize: '14px' }}>Camisole</b>
          </div>
          <div className="col-md-8 col-12"></div>
          <div
            className="col-md-2 col-12 d-flex justify-content-end"
            style={{ minWidth: '150px' }}
          >
            <SortByDrop onSortChange={handleSortChange} />
          </div>
        </div>

        <div
          className="row my-3 border-bottom"
          style={{ flexWrap: 'wrap', gap: '1rem' }}
        >
          <div className="col-md-2 col-12">
            <p style={{ fontSize: '14px' }}>{productsToDisplay.length} Products Found</p>
          </div>
          <div className="col-md-8 col-12"></div>
          <div
            className="col-md-2 col-12 d-flex justify-content-end"
            style={{ minWidth: '150px' }}
          >
            <ToggleButton activeView={viewMode} onToggle={setViewMode} />
          </div>
        </div>

        {productsToDisplay.length > 0 ? (
          viewMode === 'grid' ? renderGridView() : renderListView()
        ) : (
          <p>No products found.</p>
        )}

        <Sing />
      </div>
    </>
  );
};

export default Macbook;