import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToggleButton from '../component/ToggleButton';
import SortByDrop from '../component/SortByDrop';
import axios from 'axios';
import { RecentViewsContext } from '../context/RecentViewsContext';
import { WishlistContext } from '../context/WishlistContext';

const Mac = () => {
  const [cart, setCart] = useState([]); // Kept for potential future use
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('Most Sold');
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
      .get('http://localhost:4000/api/byc/products')
      .then((response) => {
        const validProducts = response.data.filter(
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
        );
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

  // Debugging logs
  console.log('URL:', location.search);
  console.log('Selected Category:', selectedCategory);
  console.log(
    'Filtered Products:',
    filteredProducts.map((p) => ({
      id: p._id,
      name: p.productName,
      category: p.category.name,
      subCategory: p.subCategory,
    }))
  );

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
    console.log('Navigating to:', `/product/${product._id}`);
    navigate(`/product/${product._id}`);
    addToRecentViews(product);
  };

  const handleWishlistToggle = (product) => {
    const productId = product.productId || product._id; // Use productId or fallback to _id
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ ...product, productId }); // Pass productId
    }
  };
  
  

  const getSortedProducts = () => {
    let sorted = [...filteredProducts];
    if (sortOption === 'price LowToHigh') {
      sorted.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOption === 'price HighToLow') {
      sorted.sort((a, b) => b.productPrice - a.productPrice);
    } else if (sortOption === 'Newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'Oldest') {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'Best Rated') {
      sorted.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
    } else if (sortOption === 'Most Popular') {
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();

  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#FBFBFB',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const renderGridView = () => (
    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {sortedProducts.map((product) => (
        <div key={product._id} className="col-md-3 my-3 d-flex flex-column" style={{ flex: '0 0 20%', padding: '10px' }}>
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
              className="img-fluid"
              alt={product.productName}
              style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            />
            <div className="px-2px">
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>{product.productName}</h5>
              <p style={{ fontSize: '12px' }}>{product.productNumber || 'N/A'}</p>
              <p style={{ color: '#787885', fontSize: '12px' }}>
                {product.productDescription || 'No description available'}
              </p>
              <p>
                <b>₦{product.productPrice.toLocaleString()}</b>
              </p>
            </div>
            <div>
              {[...Array(4)].map((_, i) => (
                <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
              ))}
              <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
              <span className="ms-2 fw-bold">{product.ratings || 4.5}</span>
            </div>
            <div className="d-flex pb-3">
              <button
                className="btn btn-sm border-danger mt-3 d-none bot"
                onClick={() => handleWishlistToggle(product)}
              >
                <i
                   className={`bi ${isInWishlist(product.productId || product._id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}

                  style={{ fontSize: '10px' }}
                ></i>
                 <span className="text-danger" style={{ fontSize: '10px' }}>
  {isInWishlist(product.productId || product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
</span>

              </button>
              <button
                className="btn btn-sm border-danger btn-danger d-none ms-1 mt-3 bot"
                onClick={() => handleBuyNow(product)}
              >
                <i className="bi bi-cart3 text-white"></i>
                <span className="text-white" style={{ fontSize: '10px' }}>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="list-group" style={{ width: '100%' }}>
      {sortedProducts.map((product) => (
        <div
          key={product._id}
          className="list-group-item d-flex flex-column mb-3"
          style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
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
          <div className="container d-flex">
            <div className="col-sm-3">
              <img
                src={
                  Array.isArray(product.productImage) && product.productImage.length > 0
                    ? product.productImage[0]
                    : 'https://via.placeholder.com/150?text=No+Image'
                }
                className="img-fluid"
                alt={product.productName}
                style={{ objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
              />
            </div>
            <div className="col-sm-4 ms-5">
              <div className="ms-3 w-50" style={{ ...cardStyle, flexGrow: 1 }}>
                <h5>{product.productName}</h5>
                <p>{product.productDescription || 'No description available'}</p>
                <p>
                  <b>₦{product.productPrice.toLocaleString()}</b>
                </p>
                <div className="d-flex align-items-center">
                  {[...Array(4)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                  ))}
                  <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                  <span className="ms-2 fw-bold">{product.ratings || 4.5}</span>
                </div>
              </div>
              <div className="d-flex gap-2 mt-2 ms-3">
                <button
                  className="btn btn-sm border-danger mt-2 bot d-none"
                  style={{ backgroundColor: '#fff', borderColor: '#BD3A3A', color: '#BD3A3A', fontSize: '12px' }}
                  onClick={() => handleWishlistToggle(product)}
                >
                  <i
                     className={`bi ${isInWishlist(product.productId || product._id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`} 

                    style={{ fontSize: '10px' }}
                  ></i>
                   <span className="text-danger" style={{ fontSize: '10px' }}>
  {isInWishlist(product.productId || product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
</span>
                </button>
                <button
                  className="btn btn-sm mt-2 bot d-none"
                  onClick={() => handleBuyNow(product)}
                  style={{ backgroundColor: '#BD3A3A', borderColor: '#BD3A3A', color: '#fff', fontSize: '12px' }}
                >
                  <i className="bi bi-cart3 me-1"></i> Buy Now
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
        <div className="row border-bottom align-items-center">
          <div className="col-md-2">
            <b style={{ fontSize: '14px' }}>{selectedCategory}</b>
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-2 d-flex justify-content-end">
            <SortByDrop onSortChange={setSortOption} />
          </div>
        </div>

        <div className="row my-3 border-bottom">
          <div className="col-md-2">
            <p style={{ fontSize: '14px' }}>{sortedProducts.length} Products Found</p>
          </div>
          <div className="col-md-8"></div>
          <div className="col-md-2 d-flex justify-content-end">
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