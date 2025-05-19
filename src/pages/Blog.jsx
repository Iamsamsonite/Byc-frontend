 


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBlogId, setExpandedBlogId] = useState(null); // Track expanded blog
  const blogsPerPage = 3;

  // Fetch blogs from backend
  useEffect(() => {
    axios
      .get('https://byc-backend-hkgk.onrender.com/api/byc/blogs')
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error('Failed to fetch blogs:', error));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Toggle blog details
  const toggleBlogDetails = (blogId) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
  };

  return (
    <>
      <div className="text-center fw-bolder m-5">
        <h3>BYC AFRICA Blog News</h3>
      </div>

      <div className="container my-5">
        {currentBlogs.map((blog, index) => (
          <div className="row g-4 align-items-center my-5" key={blog._id}>
            {index % 2 === 0 ? (
              <>
                <div className="col-md-1"></div>
                <div className="col-md-5">
                  <img
                    src={blog.blogImage[0] || 'default.jpg'}
                    className="img-fluid"
                    alt={blog.blogTitle}
                  />
                  {expandedBlogId === blog._id &&
                    blog.blogImage.slice(1).map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        className="img-fluid mt-3"
                        alt={`${blog.blogTitle} ${imgIndex + 1}`}
                      />
                    ))}
                </div>
                <div className="col-md-5">
                  <h5 className="mb-3">{blog.blogTitle}</h5>
                  <p style={{ fontSize: '14px' }}>
                    {expandedBlogId === blog._id
                      ? blog.blogDescription
                      : `${blog.blogDescription.slice(0, 300)}...`}
                  </p>
                  <button
                    className="btn btn-outline-secondary border-2 border-black rounded-0 my-3"
                    onClick={() => toggleBlogDetails(blog._id)}
                  >
                    {expandedBlogId === blog._id ? 'Read Less' : 'Read More'}{' '}
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={blog.authorImage[0] || 'default_author.jpg'}
                      className="img-fluid"
                      style={{ width: '40px', height: '40px' }}
                      alt="Author"
                    />
                    <div className="d-flex align-items-center">
                      <i className="bi bi-eye ms-1" style={{ fontSize: '16px' }}></i>
                      <span>{blog.views}</span>
                    </div>
                    <div className="d-flex align-items-center pe-5">
                      <i
                        className="bi bi-heart ms-1"
                        style={{ fontSize: '16px', paddingLeft: '2px' }}
                      ></i>
                      <span>{blog.likes}</span>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-2">
                    <strong style={{ fontSize: '12px' }}>{blog.authorName}</strong>
                    <small style={{ fontSize: '11px' }}>{blog.authorProfession}</small>
                  </div>
                  {expandedBlogId === blog._id && (
                    <Link
                      to={`/blog/${blog._id}`}
                      className="btn btn-outline-primary mt-3 bg-danger text-white"
                    >
                      View Full Blog
                    </Link>
                  )}
                </div>
                <div className="col-md-1"></div>
              </>
            ) : (
              <>
                <div className="col-md-1"></div>
                <div className="col-md-5 order-md-2">
                  <img
                    src={blog.blogImage[0] || 'default.jpg'}
                    className="img-fluid"
                    alt={blog.blogTitle}
                  />
                  {expandedBlogId === blog._id &&
                    blog.blogImage.slice(1).map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        className="img-fluid mt-3"
                        alt={`${blog.blogTitle} ${imgIndex + 1}`}
                      />
                    ))}
                </div>
                <div className="col-md-5 order-md-1">
                  <h5 className="mb-3">{blog.blogTitle}</h5>
                  <p style={{ fontSize: '14px' }}>
                    {expandedBlogId === blog._id
                      ? blog.blogDescription
                      : `${blog.blogDescription.slice(0, 300)}...`}
                  </p>
                  <button
                    className="btn btn-outline-secondary border-2 border-black rounded-0 my-3"
                    onClick={() => toggleBlogDetails(blog._id)}
                  >
                    {expandedBlogId === blog._id ? 'Read Less' : 'Read More'}{' '}
                    <i className="bi bi-arrow-right"></i>
                  </button>
                  <div className="d-flex align-items-center gap-5">
                    <img
                      src={blog.authorImage[0] || 'default_author.jpg'}
                      className="img-fluid"
                      style={{ width: '40px', height: '40px' }}
                      alt="Author"
                    />
                    <div className="d-flex align-items-center">
                      <i className="bi bi-eye ms-1" style={{ fontSize: '16px' }}></i>
                      <span>{blog.views}</span>
                    </div>
                    <div className="d-flex align-items-center pe-5">
                      <i
                        className="bi bi-heart ms-1"
                        style={{ fontSize: '16px', paddingLeft: '2px' }}
                      ></i>
                      <span>{blog.likes}</span>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-2">
                    <strong style={{ fontSize: '12px' }}>{blog.authorName}</strong>
                    <small style={{ fontSize: '11px' }}>{blog.authorProfession}</small>
                  </div>
                  {expandedBlogId === blog._id && (
                    <Link
                      to={`/blog/${blog._id}`}
                      className="btn btn-outline-primary mt-3 bg-danger text-white"
                    >
                      View Full Blog
                    </Link>
                  )}
                </div>
                <div className="col-md-1"></div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="text-center">
          <div className="btn-group rounded-0 shadow-sm gap-2 my-5" role="group">
            <button type="button" className="btn shadow-sm" onClick={goToPrev}>
              <i className="bi bi-arrow-left-short"></i>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                type="button"
                className={`btn shadow-sm ${currentPage === index + 1 ? 'border-warning' : ''}`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button type="button" className="btn shadow-sm" onClick={goToNext}>
              <i className="bi bi-arrow-right-short"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;