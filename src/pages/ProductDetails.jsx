import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Arrowright } from '../asset';
import Sing from '../component/Sing';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext'; // Add UserContext
import { WishlistContext } from '../context/WishlistContext';
import { RecentViewsContext } from '../context/RecentViewsContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Use react-toastify
import ProductReviews from '../component/ProductReviews';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5 text-center">
          <h5 className="text-danger">Something went wrong: {this.state.error?.message}</h5>
          <p>Please try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToRecentViews } = useContext(RecentViewsContext);
  const { user, isAuthenticated, loading: authLoading } = useContext(UserContext); // Add UserContext

  useEffect(() => {
    console.log('ProductDetails auth state:', { isAuthenticated, user, authLoading });
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error('Invalid product ID');
        }

        const API_URL = process.env.REACT_APP_API_URL || 'https://byc-backend-hkgk.onrender.com';
        const url = `${API_URL}/api/byc/products/${id}`;
        console.log('Fetching product with ID:', id, 'URL:', url);

        const productResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        });
        console.log('Product API Response:', JSON.stringify(productResponse.data, null, 2));
        console.log('Raw colors:', productResponse.data.colors);
        console.log('Colors type:', Array.isArray(productResponse.data.colors) ? 'Array' : typeof productResponse.data.colors);

        if (!productResponse.data) {
          throw new Error('No product data returned');
        }

        const normalizedProduct = {
          ...productResponse.data,
          productImages: (productResponse.data.productImage || []).map(url => url.trim()),
          _id: productResponse.data._id || id,
          colors: Array.isArray(productResponse.data.colors)
            ? productResponse.data.colors.map(color => ({
                name: color.name,
                code: color.code,
              }))
            : [],
        };
        console.log('Normalized product:', JSON.stringify(normalizedProduct, null, 2));
        console.log('Normalized colors:', normalizedProduct.colors);
        setProduct(normalizedProduct);
        addToRecentViews(normalizedProduct);
      } catch (err) {
        console.error('Error fetching product:', err.response?.data || err.message);
        let errorMessage = 'Failed to load product details. Please try again later.';
        if (err.response?.status === 404) {
          errorMessage = 'Product not found. It may have been removed or the ID is invalid.';
        } else if (err.code === 'ECONNREFUSED') {
          errorMessage = 'Backend server is not running. Please start the server.';
        } else if (err.code === 'ERR_NETWORK') {
          errorMessage = 'Network error. Please check your connection.';
        }
        setError(errorMessage);
        toast.error(errorMessage, { autoClose: 4000 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, addToRecentViews]);

  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Home', path: '/' },
      {
        label: product?.category?.name || 'Category',
        path: `/products?category=${encodeURIComponent(product?.category?.name || 'All Products')}`,
      },
      { label: product?.productName || 'Product', path: null },
    ];
    return items;
  };

  const getCarouselImages = () => {
    if (!product || !product.productImages?.length) {
      return [{
        url: 'https://via.placeholder.com/300?text=No+Image',
        productId: product?._id || null,
      }];
    }

    const images = product.productImages.map(url => ({
      url,
      productId: product._id,
    }));

    console.log('Carousel Images:', images);
    return images;
  };

  const carouselImages = getCarouselImages();

  const handlePrevImage = () => {
    if (carouselImages.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
      );
      console.log('Navigated to previous image, index:', currentImageIndex);
    }
  };

  const handleNextImage = () => {
    if (carouselImages.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
      console.log('Navigated to next image, index:', currentImageIndex);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    console.log('Thumbnail clicked, index:', index);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    console.log('handleAddToCart triggered', { isAuthenticated, authLoading });
    if (authLoading) {
      console.log('Auth still loading, cannot add to cart yet');
      setValidationError('Please wait, verifying your session...');
      toast.warn('Verifying session, please wait...', { autoClose: 4000 });
      return;
    }
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      setValidationError('Please log in to add items to cart');
      toast.error('Please log in to add to cart', { autoClose: 4000 });
      navigate('/account');
      return;
    }
  
    let hasError = false;
    if (!selectedSize || !selectedColor) {
      console.warn('Validation failed: Size or color missing');
      setValidationError('Color and size are required');
      toast.error('Please select a color and size', { autoClose: 4000 });
      hasError = true;
    } else {
      setValidationError('');
    }
  
    if (hasError) {
      console.log('Validation errors, exiting handleAddToCart');
      return;
    }
  
    if (!product) {
      console.error('Cannot add to cart: product is null');
      setValidationError('Product data is not available');
      toast.error('Product data is not available', { autoClose: 4000 });
      return;
    }
  
    const cartItem = {
      id: product._id,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages?.[0] || 'https://via.placeholder.com/150?text=No+Image',
      quantity,
      selectedSize,
      selectedColor,
      productNumber: product.productNumber || 'N/A',
    };
  
    console.log('Adding to cart:', cartItem);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://byc-backend-hkgk.onrender.com/api/byc/cart/add',
        {
          productId: product._id,
          quantity,
          selectedSize,
          selectedColor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToCart(cartItem); // Update CartContext
      console.log('Cart item added successfully');
      toast.success('Added to cart successfully!', { autoClose: 4000 });
      navigate('/carttwo');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        console.log('Unauthorized, redirecting to login');
        toast.error('Session expired. Please log in again.', { autoClose: 4000 });
        navigate('/account');
      } else {
        setValidationError('Failed to add to cart. Please try again.');
        toast.error('Failed to add to cart. Please try again.', { autoClose: 4000 });
      }
    }
  };

  const handleWishlistToggle = () => {
    if (!product) {
      console.error('Cannot toggle wishlist: product is null');
      toast.error('Product data is not available', { autoClose: 4000 });
      return;
    }
    const productId = product._id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.success('Removed from wishlist', { autoClose: 4000 });
    } else {
      addToWishlist({ id: productId, productName: product.productName });
      toast.success('Added to wishlist', { autoClose: 4000 });
    }
  };

  if (authLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Verifying session...</h5>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Loading product details...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h5 className="text-danger">{error}</h5>
        <p>Please try again later.</p>
      </div>
    );
  }

  const totalPrice = product?.productPrice * quantity || 0;

  const DecreasingBars = ({
    width = 181,
    height = 115,
    barHeight = 11,
    barColor = '#fd7e14',
    borderColor = '#0d6efd',
    borderWidth = 1,
    borderRadius = 36,
    barSpacing = 20,
    bars = 5,
    className = '',
    style = {},
  }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {Array.from({ length: bars }).map((_, index) => (
          <div
            key={index}
            style={{
              width: width - index * barSpacing,
              height: barHeight,
              backgroundColor: barColor,
              border: `${borderWidth}px solid ${borderColor}`,
              borderRadius,
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="container mt-5">
        <nav className="m-5" aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ fontSize: '10px' }}>
            {getBreadcrumbItems().map((item, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${item.path ? '' : 'active'}`}
                aria-current={item.path ? undefined : 'page'}
              >
                {item.path ? (
                  <Link to={item.path} className="text-decoration-none text-dark">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
                {index < getBreadcrumbItems().length - 1 && (
                  <img
                    src={Arrowright}
                    alt="arrow"
                    style={{ width: '20px', verticalAlign: 'middle', margin: '0 5px' }}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="container border rounded">
          <div className="row m-4">
            <div className="col-md-5">
              {carouselImages.length > 0 ? (
                <>
                  <img
                    src={carouselImages[currentImageIndex].url || 'https://via.placeholder.com/300?text=No+Image'}
                    className="img-fluid"
                    alt="Product"
                    style={{ height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => {
                      console.warn('Main image failed to load:', e.target.src);
                      e.target.src = 'https://via.placeholder.com/300?text=Image+Error';
                    }}
                  />

                  <div className="d-flex align-items-center mt-3">
                    <button
                      onClick={handlePrevImage}
                      className="btn btn-sm btn-outline-secondary me-2"
                      disabled={carouselImages.length <= 1}
                    >
                      <i className="bi bi-arrow-left-short"></i>
                    </button>

                    <div className="d-flex overflow-auto">
                      {carouselImages.map((item, index) => (
                        <img
                          key={index}
                          src={item.url}
                          alt={`Thumbnail ${index}`}
                          className={`img-thumbnail me-2 ${
                            index === currentImageIndex ? 'border border-primary' : ''
                          }`}
                          style={{ width: '75px', height: '75px', objectFit: 'cover', cursor: 'pointer' }}
                          onClick={() => handleThumbnailClick(index)}
                          onError={(e) => {
                            console.warn('Thumbnail failed to load:', item.url);
                            e.target.src = 'https://via.placeholder.com/60?text=Thumbnail+Error';
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextImage}
                      className="btn btn-sm btn-outline-secondary ms-2"
                      disabled={carouselImages.length <= 1}
                    >
                      <i className="bi bi-arrow-right-short"></i>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p>No images available</p>
                  <img
                    src="https://via.placeholder.com/300?text=No+Image"
                    alt="Default"
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            <div className="col-md-7">
              <div className="border-bottom pb-3">
                <h3 style={{ fontWeight: 'bold' }}>{product?.productName || 'N/A'}</h3>
                <h4>{product?.productNumber || 'N/A'}</h4>
                <p className="fs-6">{product?.productDescription || 'No description available'}</p>
                <div style={{ color: '#FB8200' }}>
                  {product?.averageRating ? (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${
                            i < Math.floor(product.averageRating)
                              ? 'bi-star-fill'
                              : i < product.averageRating
                              ? 'bi-star-half'
                              : 'bi-star'
                          }`}
                          style={{ color: '#FB8200' }}
                        ></i>
                      ))}
                      <span className="fw-bold text-dark pl-2">{product.averageRating.toFixed(2)}</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <i className="bi bi-star"></i>
                      <span className="fw-bold text-dark pl-2">No rating</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <h5>₦{totalPrice.toFixed(2)}</h5>
              </div>

              <div className="d-flex mt-3">
                <div>
                  <h5 style={{ fontSize: '14px' }}>Available Sizes</h5>
                  {product?.sizes?.length > 0 ? (
                    product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`btn btn-outline-danger me-2 ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedSize(size);
                          console.log('Selected size:', size);
                        }}
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <p>No sizes available</p>
                  )}
                </div>

                <div className="ms-4">
                  <h5 style={{ fontSize: '14px' }}>Available Colors</h5>
                  {product?.colors?.length > 0 ? (
                    product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`btn btn-outline-none me-2 ${
                          selectedColor === color.name ? 'active' : ''
                        }`}
                        style={{ backgroundColor: color.code, width: '30px', height: '30px', borderRadius: '20px' }}
                        onClick={() => {
                          setSelectedColor(color.name);
                          console.log('Selected color:', color.name);
                        }}
                      ></button>
                    ))
                  ) : (
                    <p>No colors available</p>
                  )}
                </div>
              </div>

              {validationError && (
                <p className="text-danger mt-2" style={{ fontSize: '12px' }}>
                  {validationError}
                </p>
              )}

              <div className="mt-4 d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary me-2 bg-danger text-white"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-outline-secondary ms-2 bg-danger text-white"
                  onClick={increaseQuantity}
                >
                  +
                </button>

                <div className="ms-4">
                  <button
                    className="btn btn-sm border-danger text-danger"
                    onClick={handleWishlistToggle}
                  >
                    <i
                      className={`bi ${isInWishlist(product?._id) ? 'bi-heart-fill' : 'bi-heart'} me-1 text-danger`}
                      style={{ fontSize: '16px' }}
                    ></i>
                    {isInWishlist(product?._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <button
                  className="btn btn-danger btn-sm w-50 h-10"
                  onClick={() => {
                    console.log('Add to Cart button clicked');
                    handleAddToCart();
                  }}
                >
                  <i className="bi bi-cart3"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 border">
          <div className="m-4 border-bottom pb-2">
            <p style={{ fontSize: '10px' }}>PRODUCT RATINGS ({product?.ratingsCount || 0})</p>
          </div>

          <div className="row">
            <div className="col-sm-3 me-5">
              <button
                className="mb-3 btn border-o p-3 text-center"
                style={{ background: '#F8F5F5', width: '200px', height: '210px', fontSize: '25px' }}
              >
                <b>{product?.averageRating || 0}</b>/5.0
                <p className="fs-5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        i < Math.floor(product?.averageRating || 0) ? 'bi-star-fill' : 'bi-star'
                      }`}
                      style={{ color: '#FB8200' }}
                    ></i>
                  ))}
                </p>
              </button>
            </div>

            <div className="col-sm-3 ms-2 ps-5">
              {[5, 4, 3, 2, 1].map((rating) => (
                <p key={rating}>
                  <i className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>{' '}
                  <b className="ms-2 fs-5">{rating}</b>
                </p>
              ))}
            </div>

            <div className="col-sm-2 mt-3">
              <DecreasingBars bars={5} height={190} />
            </div>
          </div>
        </div>

        <div className="container mt-5 border">
          <div className="border-bottom m-4 pb-2">
            <h6 className="fw-bold">Product Description</h6>
          </div>
          <div className="m-4">
            <p style={{ fontSize: '12px' }}>{product?.productDescription || 'No description'}</p>
          </div>
        </div>

        <ProductReviews />
        <Sing />
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetails;