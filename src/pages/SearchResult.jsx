 // C:/Users/HP/Desktop/desktop/bycfrontend/src/pages/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Container } from 'react-bootstrap';

const SearchResults = () => {
  const [results, setResults] = useState({ products: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

   

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://byc-backend-hkgk.onrender.com/api/byc/search?q=${encodeURIComponent(query)}`);
        console.log('Search API response:', response.data); // Debugging
    
        // Check if the response is an array or an object
        if (Array.isArray(response.data)) {
          setResults({ products: response.data, blogs: [] }); // Assume response is products
        } else {
          setResults({ products: response.data.products || [], blogs: response.data.blogs || [] });
        }
    
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Failed to fetch search results');
        setLoading(false);
      }
    };
    if (query) fetchResults();
    else setLoading(false);
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (!query) return <div>Please enter a search query.</div>;

  return (
    <Container className="mt-5">
      <h2>Search Results for "{query}"</h2>
      <h3>Products</h3>
{!Array.isArray(results.products) || results.products.length === 0 ? (
  <p>No products found.</p>
) : (
  <Row>
    {results.products.map((product) => (
      <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
        <Card>
          <Card.Img
            variant="top"
            src={product.productImage[0] || 'https://via.placeholder.com/150'}
            alt={product.productName}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>₦{product.productPrice}</Card.Text>
             <Link to={`/product/${product._id}`} className="btn btn-danger">
                 View Product
            </Link>

          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
)}

<h3>Blogs</h3>
{!Array.isArray(results.blogs) || results.blogs.length === 0 ? (
  <p>No blogs found.</p>
) : (
  <Row>
    {results.blogs.map((blog) => (
      <Col key={blog._id} sm={12} md={6} lg={4} className="mb-4">
        <Card>
          <Card.Img
            variant="top"
            src={blog.blogImage[0] || 'https://via.placeholder.com/150'}
            alt={blog.blogTitle}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{blog.blogTitle}</Card.Title>
            <Card.Text>{blog.blogDescription.substring(0, 100)}...</Card.Text>
            <Link to={`/blog/${blog._id}`} className="btn btn-danger">
              Read Blog
            </Link>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
)}

 
      <h3>Blogs</h3>
      {results.blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <Row>
          {results.blogs.map((blog) => (
            <Col key={blog._id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={blog.blogImage[0] || 'https://via.placeholder.com/150'}
                  alt={blog.blogTitle}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{blog.blogTitle}</Card.Title>
                  <Card.Text>{blog.blogDescription.substring(0, 100)}...</Card.Text>
                  <Link to={`/blog/${blog._id}`} className="btn btn-danger">
                    Read Blog
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;