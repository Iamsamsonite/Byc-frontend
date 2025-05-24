 import React, { useState, useEffect } from 'react';
import { Group84, Frame166 } from '../asset';
import { newArrivals, bycCollection } from '../asset';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  const categories = ['Men', 'Women', 'Children'];
  const sentences = ['yourself', 'Men', 'Women', 'Kids'];

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
    // Fetch products for carousel
    axios
      .get('https://byc-backend-hkgk.onrender.com/api/byc/products')
      .then((response) => {
        console.log('Raw API Response:', response.data);
        const validProducts = response.data.filter(
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
        );
        console.log('Valid Products:', validProducts);
        const uniqueCategories = [...new Set(validProducts.map((p) => p.category.name))];
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

    // Fetch blogs
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
    setCarouselIndex((prev) => Math.max(prev - 2, 0));
  };

  const handleNext = () => {
    const filteredProducts = products.filter(
      (p) => p.category.name.toLowerCase() === activeCategory.toLowerCase()
    );
    setCarouselIndex((prev) => Math.min(prev + 2, Math.max(filteredProducts.length - 2, 0)));
  };

  // Filter products case-insensitively using category.name
  const filteredProducts = products.filter(
    (p) => p.category.name.toLowerCase() === activeCategory.toLowerCase()
  );
  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(carouselIndex, carouselIndex + 2);

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px', boxSizing: 'border-box' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ marginTop: '1rem' }}>
          <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ fontSize: '14px', '@media (max-width: 576px)': { fontSize: '12px' } }}>
              Home
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem 0' }}>
          <p style={{ fontSize: '18px', margin: '0 0 1rem', '@media (max-width: 576px)': { fontSize: '16px' } }}>
            Your body deserves comfort
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem 0' }}>
            <h2
              style={{
                fontSize: '2.25rem',
                fontWeight: 'bold',
                transition: 'opacity 0.5s',
                '@media (max-width: 768px)': { fontSize: '1.75rem' },
                '@media (max-width: 576px)': { fontSize: '1.5rem' }
              }}
            >
              Get the best for <span>{sentences[currentIndex]}</span>
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {sentences.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? '#2563eb' : '#d1d5db'
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '8px 16px',
                border: '2px solid #000',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                fontSize: '14px',
                cursor: 'pointer',
                '@media (max-width: 576px)': { fontSize: '12px' }
              }}
            >
              <Link to="/products" style={{ textDecoration: 'none', color: '#000' }}>
                Shop now
              </Link>
            </button>
            <button
              style={{
                padding: '8px 16px',
                border: '2px solid #000',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                fontSize: '14px',
                cursor: 'pointer',
                '@media (max-width: 576px)': { fontSize: '12px' }
              }}
            >
              <Link to="/about" style={{ textDecoration: 'none', color: '#000' }}>
                Learn more
              </Link>
            </button>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <img
              src={Group84}
              style={{
                width: '70%',
                maxWidth: '800px',
                height: 'auto',
                '@media (max-width: 768px)': { width: '90%' },
                '@media (max-width: 576px)': { width: '100%' }
              }}
              alt="Hero banner"
              loading="lazy"
            />
          </div>
        </div>

        {/* New Arrivals */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <h4 style={{ fontSize: '1.5rem', '@media (max-width: 576px)': { fontSize: '1.25rem' } }}>
            Checkout BYC new arrival
          </h4>
        </div>
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {(showAll ? newArrivals : newArrivals.slice(0, 3)).map((product, index) => (
              <div
                key={index}
                style={{
                  flex: '1 1 30%',
                  maxWidth: '30%',
                  '@media (max-width: 768px)': { flex: '1 1 45%', maxWidth: '45%' },
                  '@media (max-width: 576px)': { flex: '1 1 100%', maxWidth: '100%' }
                }}
              >
                <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
                  <img
                    src={product.productImage}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      '@media (max-width: 576px)': { height: '200px' }
                    }}
                    alt={product.productName}
                    loading="lazy"
                  />
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <h5 style={{ fontSize: '1.25rem', '@media (max-width: 576px)': { fontSize: '1rem' } }}>
                      {product.productName}
                    </h5>
                    <p style={{ fontSize: '14px', '@media (max-width: 576px)': { fontSize: '12px' } }}>
                      {product.productDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              style={{
                padding: '8px 16px',
                border: '1px solid #000',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                fontSize: '14px',
                cursor: 'pointer',
                '@media (max-width: 576px)': { fontSize: '12px' }
              }}
              onClick={handleViewAll}
            >
              {showAll ? 'View Less' : 'View All'}
            </button>
          </div>
        </div>

        {/* BYC Collection */}
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 15px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <div
              style={{
                flex: '1 1 45%',
                maxWidth: '45%',
                backgroundColor: '#F1F1F1',
                padding: '2rem',
                '@media (max-width: 768px)': { flex: '1 1 100%', maxWidth: '100%', padding: '1rem' }
              }}
            >
              <h5 style={{ color: '#616161', fontSize: '1.25rem', '@media (max-width: 576px)': { fontSize: '1rem' } }}>
                BYC Collection 2021
              </h5>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.75rem', '@media (max-width: 576px)': { fontSize: '1.5rem' } }}>
                BYC Collection
              </h3>
              <p style={{ fontSize: '12px', lineHeight: '1.5', '@media (max-width: 576px)': { fontSize: '11px' } }}>
                The best everyday option in a Super Saver range within a reasonable price. It is our responsibility to keep you 100 percent stylish. Be smart & trendy with us.
              </p>
              <button
                style={{
                  padding: '8px 16px',
                  border: '2px solid #000',
                  borderRadius: '0',
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  marginTop: '1rem',
                  cursor: 'pointer',
                  '@media (max-width: 576px)': { fontSize: '12px' }
                }}
              >
                <Link to="/product" style={{ textDecoration: 'none', color: '#000' }}>
                  Explore
                </Link>
              </button>
            </div>
            <div
              style={{
                flex: '1 1 45%',
                maxWidth: '45%',
                '@media (max-width: 768px)': { flex: '1 1 100%', maxWidth: '100%' }
              }}
            >
              <img
                src={Frame166}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                alt="BYC Collection"
                loading="lazy"
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            {(showAll ? bycCollection : bycCollection.slice(0, 2)).map((product, index) => (
              <div
                key={index}
                style={{
                  flex: '1 1 45%',
                  maxWidth: '45%',
                  '@media (max-width: 768px)': { flex: '1 1 100%', maxWidth: '100%' }
                }}
              >
                <img
                  src={product.productImage}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', '@media (max-width: 576px)': { height: '200px' } }}
                  alt={`BYC Image ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              style={{
                padding: '8px 16px',
                border: '1px solid #000',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                fontSize: '14px',
                cursor: 'pointer',
                '@media (max-width: 576px)': { fontSize: '12px' }
              }}
              onClick={handleViewAll}
            >
              {showAll ? 'View Less' : 'View All'}
            </button>
          </div>
        </div>

        {/* Shop by Categories */}
        <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '2rem 0' }}>
          <h4 style={{ fontSize: '1.5rem', '@media (max-width: 576px)': { fontSize: '1.25rem' } }}>
            Shop by Categories
          </h4>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                style={{
                  padding: '8px 16px',
                  border: activeCategory === category ? 'none' : '1px solid #000',
                  borderRadius: '4px',
                  backgroundColor: activeCategory === category ? '#dc2626' : 'transparent',
                  color: activeCategory === category ? '#fff' : '#000',
                  fontSize: '14px',
                  cursor: 'pointer',
                  '@media (max-width: 576px)': { fontSize: '12px' }
                }}
                onClick={() => handleCategorySelect(category)}
              >
                For {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Carousel */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '2rem auto', 
          padding: '0 15px', 
          boxSizing: 'border-box',
          '@media (max-width: 576px)': { padding: '0 10px' }
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ 
              flex: '0 0 50px', 
              textAlign: 'center', 
              '@media (max-width: 576px)': { flex: '0 0 40px' }
            }}>
              <i
                className="bi bi-caret-left"
                style={{ 
                  cursor: 'pointer', 
                  fontSize: '24px', 
                  '@media (max-width: 576px)': { fontSize: '20px' } 
                }}
                onClick={handlePrev}
                aria-label="Previous products"
              ></i>
            </div>
            {loading ? (
              <div style={{ flex: '1 1 100%', textAlign: 'center', padding: '2rem' }}>
                Loading products...
              </div>
            ) : error ? (
              <div style={{ flex: '1 1 100%', textAlign: 'center', color: 'red', padding: '2rem' }}>
                {error}
              </div>
            ) : displayedProducts.length > 0 ? (
              displayedProducts.slice(0, 2).map((product) => (
                <div
                  key={product._id}
                  style={{
                    flex: '1 1 45%',
                    maxWidth: '45%',
                    textAlign: 'center',
                    padding: '1rem',
                    '@media (max-width: 768px)': { flex: '1 1 100%', maxWidth: '100%' }
                  }}
                >
                  <Link to={`/products?category=${encodeURIComponent(product.subCategory)}`}>
                    <img
                      src={
                        Array.isArray(product.productImage) && product.productImage.length > 0
                          ? product.productImage[0]
                          : 'https://via.placeholder.com/300?text=No+Image'
                      }
                      style={{
                        width: '100%',
                        maxWidth: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto',
                        '@media (max-width: 768px)': { maxWidth: '180px', height: '180px' },
                        '@media (max-width: 576px)': { maxWidth: '160px', height: '160px' }
                      }}
                      alt={product.productName}
                      loading="lazy"
                    />
                  </Link>
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', '@media (max-width: 576px)': { fontSize: '14px' } }}>
                      {product.category.name} {product.productNumber}
                    </span>
                  </div>
                  <p style={{ 
                    margin: '0.5rem 0 0', 
                    fontSize: '16px', 
                    '@media (max-width: 576px)': { fontSize: '14px' } 
                  }}>
                    ₦{product.productPrice.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ flex: '1 1 100%', textAlign: 'center', padding: '2rem' }}>
                No products found for {activeCategory}
              </div>
            )}
            <div style={{ 
              flex: '0 0 50px', 
              textAlign: 'center', 
              '@media (max-width: 576px)': { flex: '0 0 40px' }
            }}>
              <i
                className="bi bi-caret-right"
                style={{ 
                  cursor: 'pointer', 
                  fontSize: '24px', 
                  '@media (max-width: 576px)': { fontSize: '20px' } 
                }}
                onClick={handleNext}
                aria-label="Next products"
              ></i>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button
              style={{
                padding: '8px 16px',
                border: '1px solid #000',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                fontSize: '14px',
                cursor: 'pointer',
                '@media (max-width: 576px)': { fontSize: '12px' }
              }}
              onClick={handleViewAll}
            >
              {showAll ? 'View Less' : 'View All'}
            </button>
          </div>
        </div>

        {/* Blog News */}
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '2rem', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.5rem', margin: 0, '@media (max-width: 576px)': { fontSize: '1.25rem' } }}>
            BYC AFRICA Blog News
          </h4>
        </div>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '2rem auto', 
          padding: '0 15px', 
          boxSizing: 'border-box',
          '@media (max-width: 576px)': { padding: '0 10px' }
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {blogs.slice(0, visibleBlogs).map((blog) => (
              <div 
                key={blog.id} 
                style={{ 
                  flex: '1 1 100%', 
                  maxWidth: '100%', 
                  '@media (min-width: 768px)': { flex: '1 1 33.333%', maxWidth: '33.333%' }
                }}
              >
                <div style={{ 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
                  border: 'none', 
                  height: '100%', 
                  transition: 'all 0.3s ease',
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: '#fff'
                }}>
                  <img
                    src={blog.blogImage[0] || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={blog.blogTitle}
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover',
                      '@media (max-width: 768px)': { height: '150px' },
                      '@media (max-width: 576px)': { height: '120px' }
                    }}
                    loading="lazy"
                  />
                  <div style={{ 
                    padding: '15px', 
                    flexGrow: 1,
                    '@media (max-width: 768px)': { padding: '10px' },
                    '@media (max-width: 576px)': { padding: '8px' }
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '10px', 
                      backgroundColor: '#E0E0E0'
                    }}>
                      <img
                        src={blog.authorImage[0] || 'https://via.placeholder.com/40?text=Author'}
                        alt={blog.authorName}
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          objectFit: 'cover', 
                          borderRadius: '50%' 
                        }}
                        loading="lazy"
                      />
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem',
                        '@media (max-width: 576px)': { fontSize: '12px' }
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <i className="bi bi-eye" style={{ fontSize: '16px', marginRight: '4px', '@media (max-width: 576px)': { fontSize: '14px' } }}></i>
                          <span>{blog.views}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <i className="bi bi-heart" style={{ fontSize: '16px', marginRight: '4px', '@media (max-width: 576px)': { fontSize: '14px' } }}></i>
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      padding: '8px 0',
                      '@media (max-width: 576px)': { fontSize: '10px' }
                    }}>
                      <small style={{ fontWeight: 'bold' }}>{blog.authorName}</small>
                      <small>{blog.authorProfession}</small>
                    </div>
                    <h5 style={{ 
                      fontSize: '1.25rem', 
                      marginTop: '12px',
                      '@media (max-width: 768px)': { fontSize: '1.1rem' },
                      '@media (max-width: 576px)': { fontSize: '1rem' }
                    }}>
                      {blog.blogTitle}
                    </h5>
                    <p style={{ 
                      fontSize: '14px', 
                      marginTop: '12px',
                      '@media (max-width: 768px)': { fontSize: '12px' },
                      '@media (max-width: 576px)': { fontSize: '11px' }
                    }}>
                      {blog.blogDescription}
                    </p>
                  </div>
                  <div style={{ 
                    padding: '0 15px 15px', 
                    backgroundColor: '#fff',
                    '@media (max-width: 768px)': { padding: '0 10px 10px' }
                  }}>
                    <Link 
                      to="/blog" 
                      style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '8px', 
                        border: '1px solid #000', 
                        borderRadius: '0', 
                        textDecoration: 'none', 
                        color: '#000', 
                        textAlign: 'center',
                        fontSize: '14px',
                        '@media (max-width: 768px)': { fontSize: '12px' },
                        '@media (max-width: 576px)': { fontSize: '11px' }
                      }}
                    >
                      Read more <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {blogs.length > 3 && (
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
              <button
                style={{ 
                  padding: '8px 16px', 
                  border: '1px solid #000', 
                  borderRadius: '4px', 
                  backgroundColor: 'transparent', 
                  fontSize: '14px',
                  cursor: 'pointer',
                  '@media (max-width: 768px)': { fontSize: '12px' },
                  '@media (max-width: 576px)': { fontSize: '11px' }
                }}
                onClick={isViewMore ? handleViewLess : handleViewMore}
              >
                {isViewMore ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;