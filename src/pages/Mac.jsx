 import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToggleButton from '../component/ToggleButton';
import SortByDrop from '../component/SortByDrop';
import axios from 'axios';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { WishlistContext } from '../context/WishlistContext';

const Mac = () => {
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToRecentViews } = useContext(RecentViewsContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  // Extract category from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  let selectedCategory = queryParams.get('category') || 'All Products';

  // Map subcategory to broad category
  const broadCategories = ['Men', 'Women', 'Children'];
  if (selectedCategory !== 'All Products' && !broadCategories.includes(selectedCategory)) {
    const lowerCaseCategory = decodeURIComponent(selectedCategory).toLowerCase();
    if (lowerCaseCategory.includes('men') || lowerCaseCategory.includes('male')) {
      selectedCategory = 'Men';
    } else if (lowerCaseCategory.includes('women') || lowerCaseCategory.includes('female')) {
      selectedCategory = 'Women';
    } else if (
      lowerCaseCategory.includes('children') ||
      lowerCaseCategory.includes('child') ||
      lowerCaseCategory.includes('kids')
    ) {
      selectedCategory = 'Children';
    } else {
      selectedCategory = 'All Products';
    }
  }

  // Fetch products
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://byc-backend-hkgk.onrender.com/api/byc/products')
      .then((response) => {
        const validProducts = response.data
          .filter(
            (product) =>
              product._id &&
              typeof product.productPrice === 'number' &&
              !isNaN(product.productPrice) &&
              product.productImage &&
              Array.isArray(product.productImage) &&
              product.productImage.length > 0 &&
              product.category &&
              typeof product.category === 'object' &&
              typeof product.category.name === 'string' &&
              product.category.name.trim() !== ''
          )
          .map((product) => ({
            ...product,
            productName: product.productName || 'Unknown Product',
            ratings: typeof product.ratings === 'number' ? product.ratings : 4.5,
            popularity: product.popularity || 0,
            createdAt: product.createdAt || new Date().toISOString(),
          }));
        console.log('Valid Products:', validProducts);
        console.log('Unique Categories:', [...new Set(validProducts.map((p) => p.category.name))]);
        setProducts(validProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Filter products
  const categoryMapping = {
    Male: 'Men',
    Female: 'Women',
    Kids: 'Children',
    Child: 'Children',
  };

  const filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter((p) => {
        const productCategory = categoryMapping[p.category.name] || p.category.name;
        return productCategory.toLowerCase() === selectedCategory.toLowerCase();
      });

  // Handle sort option change
  const handleSortChange = (option) => {
    console.log('Mac: Received sort option:', option);
    setSortOption(option);
  };

  // Sorting logic aligned with SortByDrop
  const getSortedProducts = () => {
    let sorted = [...filteredProducts];
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

  // Debugging logs
  console.log('URL:', location.search);
  console.log('Selected Category:', selectedCategory);
  console.log(
    'Filtered Products:',
    filteredProducts.map((p) => ({
      id: p._id,
      name: p.productName,
      category: p.category.name,
    }))
  );
  console.log('Sort Option:', sortOption);
  console.log('Sorted Products:', sortedProducts.map((p) => p.productName));

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [{ label: 'Home', path: '/' }];
    if (selectedCategory !== 'All Products') {
      items.push({
        label: selectedCategory,
        path: `/products?category=${encodeURIComponent(selectedCategory)}`,
      });
    } else {
      items.push({ label: 'All Products', path: '/products' });
    }
    return items;
  };

  const handleBuyNow = (product) => {
    if (!product._id) {
      console.error('Product ID is missing:', product);
      alert('Error: Product ID is missing. Please try again.');
      return;
    }
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
      {sortedProducts.map((product) => (
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
              <p style={{ fontSize: '12px', margin: '0 0 5px' }}>{product.productNumber || 'N/A'}</p>
              <p style={{ fontSize: '12px', color: '#787885', margin: '0 0 5px' }}>
                {product.productDescription?.substring(0, 50) || 'No description'}...
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
      {sortedProducts.map((product) => (
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
              <p style={{ fontSize: '12px', margin: '0 0 5px' }}>{product.productNumber || 'N/A'}</p>
              <p style={{ fontSize: '12px', color: '#787885', margin: '0 0 5px' }}>
                {product.productDescription?.substring(0, 100) || 'No description'}...
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
          {getBreadcrumbItems().map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${index === getBreadcrumbItems().length - 1 ? 'active' : ''}`}
            >
              {index === getBreadcrumbItems().length - 1 ? (
                item.label
              ) : (
                <a href={item.path}>{item.label}</a>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="container mt-5 pt-1 mb-2 border">
        <div
          className="row border-bottom align-items-center"
          style={{ flexWrap: 'wrap', gap: '1rem' }}
        >
          <div className="col-md-2 col-12">
            <b style={{ fontSize: '14px' }}>{selectedCategory}</b>
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
            <p style={{ fontSize: '14px' }}>{sortedProducts.length} Products Found</p>
          </div>
          <div className="col-md-8 col-12"></div>
          <div
            className="col-md-2 col-12 d-flex justify-content-end"
            style={{ minWidth: '150px' }}
          >
            <ToggleButton activeView={viewMode} onToggle={setViewMode} />
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : sortedProducts.length > 0 ? (
          viewMode === 'grid' ? renderGridView() : renderListView()
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </>
  );
};

export default Mac;