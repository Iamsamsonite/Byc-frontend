// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Frame171 } from '../asset';

// const Blogtwo = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 3;

//   const totalPages = Math.ceil(blogs.length / blogsPerPage);
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   const goToPage = (pageNumber) => setCurrentPage(pageNumber);
//   const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/byc/blogs')
//       .then(response => {
//         setBlogs(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching blogs:', error);
//       });
//   }, []);

//   return (
//     <>
//       <nav aria-label="breadcrumb" className="container ms-2">
//         <ol className="breadcrumb">
//           <li className="breadcrumb-item"><a style={{ textDecoration: 'none' }} href="#">Home</a></li>
//           <li className="breadcrumb-item active" aria-current="page">Blogs</li>
//         </ol>
//       </nav>

//       <div className="container m-5 p-4">
//         <div className="col-md-12">
//           <h4 className='fw-bolder text-center mb-5 pb-3'>How important are shoes in your style?</h4>
//           <p style={{ fontSize: '14px', textAlign:'justify' }}>met minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
//                duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit non 
//                deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. 
//                Exercitation veniam consequat sunt nostrud amet..Amet minim mollit non deserunt ullamco est 
//                sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation
//                 veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor do 
//                 amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt 
//                 nostrud amet..Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
//                 officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim 
//                 mollit non deserunt ullamco est sit aliqua dolor do</p>

//           <img className='img-fluid mt-5' style={{ height: '400px', width: '1100px' }} src={Frame171} alt="Banner" />

//           <p className='my-5' style={{ fontSize: '14px', textAlign: 'justify' }}>
//           Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat
//                    duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit non 
//                    deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
//                     Exercitation veniam consequat sunt nostrud amet..Amet minim mollit non deserunt ullamco est sit 
//                     aliqua dolor do amet sint. Velit officia consequat duis enim velit Amet minim mollit non deserunt
//                     ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation
//                      veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet
//                       sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud 
//                       amet..Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia 
//                       consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit 
//                       non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit 
//                       mollit. Exercitation veniam consequat sunt nostrud amet..Amet minim mollit non deserunt ullamco est
//                        sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
//                         consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor doAmet 
//                         minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
//                          enim velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim mollit non deserunt
//                           ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. 
//                           Exercitation veniam consequat sunt nostrud amet..Amet minim mollit non deserunt ullamco est sit 
//                           aliqua dolor do amet sint. Velit officia consequat duis enim velit Amet minim mollit non deserunt 
//                           ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. 
//                           Exercitation veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua
//                            dolor do amet sint. Velit officia consequat duis brenim velit mollit. Exercitation veniam consequat 
//                            sunt nostrud amet..Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit 
//                            officia consequat duis enim  velit mollit. Exercitation veniam consequat sunt nostrud ametAmet minim
//                             mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit 
//                             mollit. Exercitation veniam consequat sunt nostrud amet..Amet minim mollit non deserunt ullamco est 
//                             sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation 
//                             veniam consequat sunt nostrud ametAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
//           </p>

//           <h4 className='fw-bolder text-center m-5 pb-3'>More Blog News</h4>

//           <div className="container m-5">
//             <div className="card-group">
//               <div className="row">
//                 {currentBlogs.map((blog) => (
//                   <div key={blog._id} className="col-md-4 my-3">
//                     <div className="card shadow-lg border-0">
//                       <img src={blog.blogImage[0] || 'default.jpg'} className="card-img-top" alt="Blog" />
//                       <div className="card-body mt-2">
//                         <div className='d-flex justify-content-between' style={{ backgroundColor: '#E0E0E0' }}>
//                           <img src={blog.authorImage[0] || 'default_author.jpg'} className="img-fluid" alt="Author" />
//                           <div className="d-flex align-items-center">
//                             <i className="bi bi-eye ms-1" style={{ fontSize: '16px' }}></i>
//                             <span>{blog.views}</span>
//                           </div>
//                           <div className="d-flex align-items-center pe-5">
//                             <i className="bi bi-heart ms-1" style={{ fontSize: '16px' }}></i>
//                             <span>{blog.likes}</span>
//                           </div>
//                         </div>
//                         <small className='gap-5 d-flex py-2'>
//                           <b>{blog.authorName}</b> <span>{blog.authorProfession}</span>
//                         </small>
//                         <h5 className="card-title mt-4">{blog.blogTitle}</h5>
//                         <p className="card-text fs-6 mt-4" style={{ fontSize: '12px' }}>
//                           {blog.blogDescription.slice(0, 100)}...
//                         </p>
//                       </div>
//                       <div className="card-footer">
//                         <a href={`/blog/${blog._id}`} className="btn border-dark rounded-0 text-decoration-none text-dark">
//                           Read more <i className="bi bi-arrow-right"></i>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className='text-center'>
//               <div className="btn-group rounded-0 shadow-sm gap-2 my-5" role="group">
//                 <button type="button" className="btn shadow-sm" onClick={goToPrev}>
//                   <i className="bi bi-arrow-left-short"></i>
//                 </button>
//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index}
//                     type="button"
//                     className={`btn shadow-sm ${currentPage === index + 1 ? 'border-warning' : ''}`}
//                     onClick={() => goToPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 <button type="button" className="btn shadow-sm" onClick={goToNext}>
//                   <i className="bi bi-arrow-right-short"></i>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Blogtwo;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Blogtwo = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  // Fetch single blog and other blogs
  useEffect(() => {
    // Fetch single blog
    axios
      .get(`http://localhost:4000/api/byc/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
      });

    // Fetch other blogs
    axios
      .get('http://localhost:4000/api/byc/blogs')
      .then((response) => {
        setOtherBlogs(response.data.filter((b) => b._id !== id));
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, [id]);

  // Pagination for other blogs
  const totalPages = Math.ceil(otherBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = otherBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (!blog) {
    return (
      <div className="container mt-5 text-center">
        <h5>Loading blog...</h5>
      </div>
    );
  }

  return (
    <>
      <nav aria-label="breadcrumb" className="container ms-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/blog" style={{ textDecoration: 'none' }}>
              Blogs
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {blog.blogTitle}
          </li>
        </ol>
      </nav>

      <div className="container m-5 p-4">
        <div className="col-md-12">
          <h4 className="fw-bolder text-center mb-5 pb-3">{blog.blogTitle}</h4>
          <p style={{ fontSize: '14px', textAlign: 'justify' }}>{blog.blogDescription}</p>
          {blog.blogImage.map((image, index) => (
            <img
              key={index}
              className="img-fluid mt-5"
              style={{ height: '500px', width: '100%' }}
              src={image || 'default.jpg'}
              alt={`${blog.blogTitle} ${index + 1}`}
            />
          ))}
          <div className="d-flex align-items-center gap-3 mt-4">
            <img
              src={blog.authorImage[0] || 'default_author.jpg'}
              className="img-fluid"
              style={{ width: '40px', height: '40px' }}
              alt="Author"
            />
            <div>
              <strong style={{ fontSize: '12px' }}>{blog.authorName}</strong>
              <br />
              <small style={{ fontSize: '11px' }}>{blog.authorProfession}</small>
            </div>
            <div className="d-flex align-items-center ms-3">
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

          <h4 className="fw-bolder text-center m-5 pb-3">More Blog News</h4>

          <div className="container m-5">
            <div className="card-group">
              <div className="row">
                {currentBlogs.map((otherBlog) => (
                  <div key={otherBlog._id} className="col-md-4 my-3">
                    <div className="card shadow-lg border-0">
                      <img
                        src={otherBlog.blogImage[0] || 'default.jpg'}
                        className="card-img-top"
                        alt={otherBlog.blogTitle}
                      />
                      <div className="card-body mt-2">
                        <div
                          className="d-flex justify-content-between"
                          style={{ backgroundColor: '#E0E0E0' }}
                        >
                          <img
                            src={otherBlog.authorImage[0] || 'default_author.jpg'}
                            className="img-fluid"
                            alt="Author"
                          />
                          <div className="d-flex align-items-center">
                            <i
                              className="bi bi-eye ms-1"
                              style={{ fontSize: '16px' }}
                            ></i>
                            <span>{otherBlog.views}</span>
                          </div>
                          <div className="d-flex align-items-center pe-5">
                            <i
                              className="bi bi-heart ms-1"
                              style={{ fontSize: '16px' }}
                            ></i>
                            <span>{otherBlog.likes}</span>
                          </div>
                        </div>
                        <small className="gap-5 d-flex py-2">
                          <b>{otherBlog.authorName}</b>{' '}
                          <span>{otherBlog.authorProfession}</span>
                        </small>
                        <h5 className="card-title mt-4">{otherBlog.blogTitle}</h5>
                        <p
                          className="card-text fs-6 mt-4"
                          style={{ fontSize: '12px' }}
                        >
                          {otherBlog.blogDescription.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="card-footer">
                        <Link
                          to={`/blog/${otherBlog._id}`}
                          className="btn border-dark rounded-0 text-decoration-none text-dark"
                        >
                          Read more <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="text-center">
              <div className="btn-group rounded-0 shadow-sm gap-2 my-5" role="group">
                <button
                  type="button"
                  className="btn shadow-sm"
                  onClick={goToPrev}
                >
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
                <button
                  type="button"
                  className="btn shadow-sm"
                  onClick={goToNext}
                >
                  <i className="bi bi-arrow-right-short"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogtwo;