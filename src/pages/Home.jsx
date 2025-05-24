 import React, { useState, useEffect } from 'react';
import {
  Group41,
  Group42,
  Group34,
  Group84,
  Frame167,
  Frame168,
  Frame166,
  Arrowleft,
  Pant1,
  Pant2,
  Pant3,
  Arrowright,
  Frame169,
  Frame169a,
  Frame169b,
  Authorview,
  Arrow,
} from '../asset';
import { newArrivals, bycCollection } from '../asset';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Inline CSS for category images
const styles = {
  categoryImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '8px',
  },
  categoryImageLarge: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '8px',
  },
};

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');
  const [showAll, setShowAll] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  const [isViewMore, setIsViewMore] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Men');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [screenSize, setScreenSize] = useState({
    isLargeScreen: window.innerWidth >= 992,
    isSmallScreen: window.innerWidth >= 576 && window.innerWidth < 992,
    isSmallerScreen: window.innerWidth < 576,
  });

  const categories = ['Men', 'Women', 'Children'];
  const sentences = ['yourself', 'Men', 'Women', 'Kids'];
  const itemsPerView = screenSize.isLargeScreen ? 3 : screenSize.isSmallScreen ? 2 : 1;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isLargeScreen: window.innerWidth >= 992,
        isSmallScreen: window.innerWidth >= 576 && window.innerWidth < 992,
        isSmallerScreen: window.innerWidth < 576,
      });
      setCarouselIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hero text animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setFadeState('fade-in');
      }, 500);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch products and blogs
  useEffect(() => {
    axios
      .get('https://byc-backend-hkgk.onrender.com/api/byc/products')
      .then((response) => {
        console.log('Raw API Response:', response.data);
        const validProducts = response.data
          .filter(
            (product) =>
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
            _id: product._id || product.id,
            productName: product.productName || 'Unknown Product',
            productNumber: product.productNumber || 'N/A',
            productDescription: product.productDescription || 'No description',
            productPrice: product.productPrice || 0,
            ratings: typeof product.ratings === 'number' ? product.ratings : 4.0,
            subCategory: product.subCategory || product.category.name,
          }));
        console.log('Valid Products:', validProducts);
        const uniqueCategories = [
          ...new Set(validProducts.map((p) => p.category.name)),
        ];
        console.log('Available Categories:', uniqueCategories);
        setAvailableCategories(uniqueCategories);
        setProducts(validProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });

    axios
      .get('https://byc-backend-hkgk.onrender.com/api/byc/blogs')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleViewAll = () => {
    setShowAll((prev) => !prev);
    setCarouselIndex(0);
  };

  const handleViewMore = () => {
    setVisibleBlogs(blogs.length);
    setIsViewMore(true);
  };

  const handleViewLess = () => {
    setVisibleBlogs(3);
    setIsViewMore(false);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setCarouselIndex(0);
  };

  const handlePrev = () => {
    console.log('Prev clicked, current carouselIndex:', carouselIndex, 'filteredProducts length:', filteredProducts.length);
    setCarouselIndex((prev) => {
      const newIndex = prev - itemsPerView;
      if (newIndex < 0) {
        const currentCategoryIndex = categories.indexOf(activeCategory);
        const prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        setActiveCategory(categories[prevCategoryIndex]);
        const newFilteredProducts = products.filter(
          (p) => p.category.name.toLowerCase() === categories[prevCategoryIndex].toLowerCase()
        );
        return Math.max(0, newFilteredProducts.length - itemsPerView);
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    console.log('Next clicked, current carouselIndex:', carouselIndex, 'filteredProducts length:', filteredProducts.length);
    setCarouselIndex((prev) => {
      const newIndex = prev + itemsPerView;
      if (newIndex >= filteredProducts.length) {
        const currentCategoryIndex = categories.indexOf(activeCategory);
        const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        setActiveCategory(categories[nextCategoryIndex]);
        return 0;
      }
      return newIndex;
    });
  };

  const filteredProducts = products.filter(
    (p) => p.category.name.toLowerCase() === activeCategory.toLowerCase()
  );

  // Product Carousel
  const renderCarousel = () => (
    <div className="container my-5">
      <div
        style={{
          position: 'relative',
          padding: '1rem 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflow: 'hidden',
            gap: '1rem',
            transition: 'transform 0.3s ease',
          }}
        >
          {loading ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '1rem' }}>
              Loading products...
            </div>
          ) : error ? (
            <div style={{ width: '100%', textAlign: 'center', color: '#dc3545', padding: '1rem' }}>
              {error}
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.slice(carouselIndex, carouselIndex + itemsPerView).map((product) => (
              <div
                key={product._id}
                style={{
                  flex: `0 0 ${100 / itemsPerView}%`,
                  maxWidth: `${100 / itemsPerView}%`,
                  padding: '10px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  className="shadow-sm"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #dee2e6',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Link to={`/products?category=${encodeURIComponent(product.subCategory || product.category.name)}`}>
                    <img
                      src={
                        Array.isArray(product.productImage) &&
                        product.productImage.length > 0
                          ? product.productImage[0]
                          : 'https://via.placeholder.com/300?text=No+Image'
                      }
                      style={screenSize.isSmallerScreen ? styles.categoryImage : styles.categoryImageLarge}
                      alt={product.productName}
                      loading="lazy"
                    />
                  </Link>
                  <div style={{ padding: '10px', flexGrow: 1, textAlign: 'center' }}>
                    <h5
                      style={{
                        fontWeight: 'bold',
                        fontSize: screenSize.isSmallerScreen ? '14px' : '16px',
                        margin: '10px 0 5px',
                      }}
                    >
                      {product.productName}
                    </h5>
                    <p
                      style={{
                        fontSize: screenSize.isSmallerScreen ? '12px' : '14px',
                        color: '#333',
                        margin: '0 0 5px',
                      }}
                    >
                      <b>{product.category.name}</b> {product.productNumber}
                    </p>
                    <p
                      style={{
                        fontWeight: 'bold',
                        fontSize: screenSize.isSmallerScreen ? '12px' : '14px',
                        margin: '0 0 5px',
                      }}
                    >
                      ₦{product.productPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: '100%', textAlign: 'center', padding: '1rem' }}>
              No products found for {activeCategory}
            </div>
          )}
        </div>
        {!showAll && filteredProducts.length > itemsPerView && (
          <>
            <div
              style={{
                position: 'absolute',
                left: '-30px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            >
              <i
                className="bi bi-caret-left"
                style={{
                  cursor: carouselIndex > 0 || categories.indexOf(activeCategory) > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '24px',
                  color: carouselIndex > 0 || categories.indexOf(activeCategory) > 0 ? '#000' : '#ccc',
                }}
                onClick={handlePrev}
                aria-label="Previous products"
              ></i>
            </div>
            <div
              style={{
                position: 'absolute',
                right: '-30px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            >
              <i
                className="bi bi-caret-right"
                style={{
                  cursor: carouselIndex + itemsPerView < filteredProducts.length || categories.indexOf(activeCategory) < categories.length - 1 ? 'pointer' : 'not-allowed',
                  fontSize: '24px',
                  color: carouselIndex + itemsPerView < filteredProducts.length || categories.indexOf(activeCategory) < categories.length - 1 ? '#000' : '#ccc',
                }}
                onClick={handleNext}
                aria-label="Next products"
              ></i>
            </div>
          </>
        )}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-secondary btn-md border border-1 border-black"
          onClick={handleViewAll}
        >
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>
    </div>
  );

  // Replace the original carousel section in the return statement with renderCarousel()
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active ms-5" aria-current="page">
              Home
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="body mt-5 text-center">
          <p>Your body deserves comfort</p>
          <div
            className="my-4 flex items-center justify-center"
            style={{ fontWeight: 'bolder' }}
          >
            <h2 className={`text-4xl font-bold transition-opacity duration-500 ${fadeState}`}>
              Get the best for <span>{sentences[currentIndex]}</span>
            </h2>
          </div>
          <div>
            {sentences.map((_, index) => (
              <div
                key={index}
                className={`inline-block w-2 h-2 rounded-full mx-1 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button className="shop btn btn-outline-dark border-2 border-dark me-2">
            <Link to="/product" className="text-decoration-none text-black hover-text-white">
              Shop now
            </Link>
          </button>
          <button className="shop btn btn-outline-dark border border-2 border-dark">
            <Link to="/about" className="text-decoration-none text-black hover-text-white">
              Learn more
            </Link>
          </button>
          <div className="mt-5">
            <img style={{ width: '70%' }} src={Group84} alt="" />
          </div>
        </div>

        {/* New Arrivals */}
        <div className="home2 my-5 text-center">
          <h4>Checkout BYC new arrival</h4>
        </div>
        <div className="container">
          <div className="container mt-5">
            <div className="row">
              {(showAll ? newArrivals : newArrivals.slice(0, 3)).map((product, index) => (
                <div key={index} className="col-lg-4 my-3">
                  <div className="card shadow-sm">
                    <img
                      src={product.productImage}
                      className="card-img-top"
                      style={{ width: '100%', height: 'auto' }}
                      alt={product.productName}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text">{product.productDescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-secondary btn-md border border-1 border-black"
                onClick={handleViewAll}
              >
                {showAll ? 'View Less' : 'View All'}
              </button>
            </div>
          </div>
        </div>

        {/* BYC Collection */}
        <div className="container mt-5">
          <div className="container mt-5">
            <div className="row col-lg-12 justify-content-center">
              <div className="col-lg-4 m-3 py-5" style={{ backgroundColor: '#F1F1F1' }}>
                <div className="ms-4">
                  <h5 style={{ color: '#616161' }}>BYC Collection 2021</h5>
                  <h3 className="fw-bold">BYC Collection</h3>
                  <p style={{ fontSize: '11px' }}>
                    The best everyday option in a Super Saver range within a
                    <br />
                    reasonable price. It is our responsibility to keep you
                    <br />
                    100 percent stylish. Be smart & trendy with us.
                  </p>
                  <button className="btn my-4 btn-md border border-2 border-black rounded-0">
                    <a href="product" className="text-decoration-none text-dark">
                      Explore
                    </a>
                  </button>
                </div>
              </div>
              <div className="col-lg-4 m-3">
                <img src={Frame166} className="img-fluid" alt="BYC Collection" />
              </div>
            </div>
            <div className="row col-lg-12 justify-content-center">
              {(showAll ? bycCollection : bycCollection.slice(0, 2)).map((product, index) => (
                <div key={index} className="col-lg-4 m-3">
                  <img
                    src={product.productImage}
                    className="img-fluid"
                    alt={`BYC Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-secondary btn-md border border-1 border-black"
                onClick={handleViewAll}
              >
                {showAll ? 'View Less' : 'View All'}
              </button>
            </div>
          </div>
        </div>

        {/* Shop by Categories */}
        <div className="text-center fw-bolder mt-5">
          <h4>Shop by Categories</h4>
        </div>
        <div className="col-md-12 fs-1">
          <div className="text-center mt-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  activeCategory === category
                    ? 'btn-danger'
                    : 'border-light text-dark'
                } mx-2`}
                onClick={() => handleCategorySelect(category)}
              >
                For {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Carousel */}
        {renderCarousel()}

        {/* Blog News */}
        <div className="text-center fw-bold">
          <h4>BYC AFRICA Blog News</h4>
        </div>
        <div className="container my-5">
          <div className="row g-4">
            {blogs.slice(0, visibleBlogs).map((blog) => (
              <div
                key={blog.id}
                className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
              >
                <div className="card shadow-lg border-0 w-100 h-100 d-flex flex-column">
                  <img
                    src={blog.blogImage[0] || 'default_image.jpg'}
                    className="card-img-top"
                    alt="Blog"
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body mt-2 d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-center mb-2"
                      style={{ backgroundColor: '#E0E0E0', padding: '8px', borderRadius: '4px' }}
                    >
                      <img
                        src={blog.authorImage[0] || 'default_author_image.jpg'}
                        className="img-fluid rounded-circle"
                        alt="Author"
                        style={{ width: 40, height: 40, objectFit: 'cover' }}
                      />
                      <div className="d-flex align-items-center ms-2">
                        <i className="bi bi-eye me-1" style={{ fontSize: '16px' }}></i>
                        <span>{blog.views}</span>
                      </div>
                      <div className="d-flex align-items-center ms-3">
                        <i className="bi bi-heart me-1" style={{ fontSize: '16px' }}></i>
                        <span>{blog.likes}</span>
                      </div>
                    </div>
                    <small className="d-flex gap-2 py-2">
                      <b>{blog.authorName}</b>
                      <span>{blog.authorProfession}</span>
                    </small>
                    <h5 className="card-title mt-2">{blog.blogTitle}</h5>
                    <p className="card-text fs-6 mt-2" style={{ fontSize: '12px' }}>
                      {blog.blogDescription}
                    </p>
                    <div className="mt-auto">
                      <button className="btn border-dark rounded-0">
                        <a href="blog" className="text-decoration-none text-dark">
                          Read more <i className="bi bi-arrow-right"></i>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {blogs.length > 3 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-secondary btn-md border border-1 border-black"
              onClick={isViewMore ? handleViewLess : handleViewMore}
            >
              {isViewMore ? 'View less' : 'View more'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;