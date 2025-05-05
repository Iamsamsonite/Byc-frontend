import React, { useState, useEffect } from 'react'
import { Group41, Group42, Group34, Group84, Frame167, Frame168, Frame166, Arrowleft, Pant1, Pant2, Pant3, Arrowright, Frame169, Frame169a, Frame169b, Authorview, Arrow } from '../asset'
import { newArrivals, bycCollection } from '../asset';
import axios from 'axios';
 




const Home = () => {

        const [currentIndex, setCurrentIndex] = useState(0);
        const [fadeState, setFadeState] = useState('fade-in');

        const [showAll, setShowAll] = useState(false); // State to toggle showing all products

        const handleViewAll = () => {
            setShowAll((prev) => !prev); // Toggle between showing all or first 3 items
          };
        
          
          const [blogs, setBlogs] = useState([]);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          const [visibleBlogs, setVisibleBlogs] = useState(3); // Number of blogs to display
          
        const [isViewMore, setIsViewMore] = useState(false); // Track if View More button is clicked

        
          const handleViewMore = () => {
            setVisibleBlogs(blogs.length); 
            setIsViewMore(true); // Show all blogs
          };

          const handleViewLess = () => {
            setVisibleBlogs(3); 
            setIsViewMore(false); // Show only the first 3 blogs
          }

          
        const sentences = [
          "yourself",
          "Men",
          "Women",
          "Kids",
          ];
        
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

        useEffect(() => {
            // Fetching the blogs from the API
            axios.get('http://localhost:4000/api/byc/blogs') // Update the URL as per your backend setup
              .then(response => {
                setBlogs(response.data);  // Assuming response contains blog data
              })
              .catch(error => {
                console.error('Error fetching blogs:', error);
              });
          }, []);
        
        

      
  return (
    <>
      
           


      
      
      
      
      
      
      <div>

      <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active ms-5"  aria-current="page">Home</li>
            </ol>
        </nav>





            <div className='body mt-5 text-center'>
                <p>Your body desearve comfort</p>
                <div className="my-4 flex items-center justify-center " style={{fontWeight:'bolder'}}>
                        <h2 
                        className={`text-4xl font-bold transition-opacity duration-500 `}
                        >
                         Get the best for <span> {sentences[currentIndex]}</span> 
                        </h2>
                </div>
      
      <div>
        {sentences.map((_, index) => (
          <div 
            key={index}
            className={`  ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>


                <button className='btn btn-outline-dark border-black me-2'
                ><a href="product" className='text-decoration-none text-dark'>Shop now</a></button>
                <button className='btn btn-outline-dark border border-black'
                ><a href="about" className='text-decoration-none text-dark'>Learn more</a></button>
                <div className='mt-5'>
                    <img style={{width:'70%'}} src={Group84} alt="" />
                </div>
            </div>

            <div className='home2 my-5 text-center'>
                <h4>Checkout BYC new arrival</h4>
            </div>
            <div className='container'>

            <div className="container mt-5">
      
      <div className="row">
        {(showAll ? newArrivals : newArrivals.slice(0, 3)).map((product, index) => (
          <div key={index} className="col-lg-4 my-3">
            <div className="card shadow-sm">
              <img src={product.productImage} className="card-img-top" style={{ width: '100%', height: 'auto' }} alt={product.productName} />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "View All" Button */}
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

                <div className="container mt-5">
                <div className="container mt-5">
      {/* First Section: Text and "Explore" Button */}
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
             <a href="product" className='text-decoration-none text-dark'>Explore</a> 
            </button>
          </div>
        </div>

          {/* Image Section */}
          <div className="col-lg-4 m-3">
          <img src={Frame166} className="img-fluid" alt="BYC Collection" />
        </div>
      
        

      {/* Second Section: Display Images from bycCollection */}
      <div className="row col-lg-12 justify-content-center">
        {/* Map through first few items (or all based on state) */}
        {(showAll ? bycCollection : bycCollection.slice(0, 2)).map((product, index) => (
          <div key={index} className="col-lg-4 m-3">
            <img src={product.productImage} className="img-fluid" alt={`BYC Image ${index + 1}`} />
          </div>
        ))}
      </div>

           </div>             

                    {/* "View All" Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-secondary btn-md border border-1 border-black"
          onClick={handleViewAll}
        >
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>
    </div>

                    {/* <div className='text-center my-5'>
                        <button className="btn btn-outline-secondary btn-md border border-1 border-black  ">View all</button>
                    </div> */}
                </div>

                <div className='text-center fw-bolder mt-5' >
                    <h4>Shop by categories</h4>
                </div>
                <div className="col-md-12 fs-1">
                    <div className='text-center mt-3'>
                        <button className="btn border-light text-grey-multed ">For Women</button>
                        <button className="btn border-dark border-2 border-start-0 border-end-0 border-top-0 rounded-0 fw-light">For Men</button>
                        <button className="btn border-light  ">For Kids</button>
                    </div>
                    <div className='text-center mt-2'>
                        <button className="btn border-light btn-outline-danger rounded-0 ">T-Shirt</button>
                        <button className="btn border-light btn-outline-danger rounded-0 ">Singlet</button>
                        <button className="btn border btn-outline-grey btn-danger rounded-0 ">Pants</button>
                        <button className="btn border-light btn-outline-danger rounded-0">Boxers</button>

                    </div>
                </div>

                <div className="container my-5">
                    <div className="row col-12">
                        <div className="col-1"></div>
                        <div className="bi col-1 pt-5 mt-5"><i className="bi bi-caret-left"></i></div>
                        <div className='col-3'>
                            <img src={Pant1} className='img-fluid' alt="" />
                            <div><span> <b>WOMEN PANT</b> BYC-501LMS</span></div>
                            <p>#2,800.00</p>
                        </div>

                        <div className='col-3'>
                            <img src={Pant2} className='img-fluid' alt="" />
                            <div><span> <b>WOMEN PANT</b> BYC-501LMS</span></div>
                
                            <p>#2,800.00</p>
                        </div>

                        <div className='col-3'>
                            <img src={Pant3} className='img-fluid' alt="" />
                            <div><span> <b>WOMEN PANT</b> BYC-501LMS</span></div>

                            <p>#2,800.00</p>
                            </div>

                        <div className="bi col-1 pt-5 mt-5"><i className="bi bi-caret-right"></i> </div>

                    </div>

                        {/* <div className='text-center mt-4'>
                            <button className="btn btn-outline-secondary btn-md border border-1 border-black  ">View all</button>

                        </div> */}
                        <div className="text-center mt-4">
        <button
          className="btn btn-outline-secondary btn-md border border-1 border-black"
          onClick={handleViewAll}
        >
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>
    </div>
                        
                

                <div className='text-center fw-bold'>
                    <h4>BYC AFRICA Blog News</h4>
                </div>

                <div className="container m-5">
      <div className="card-group">
        <div className="row">
          {blogs.slice(0, visibleBlogs).map((blog) => (
            <div key={blog.id} className="col-md-4 my-3">
              <div className="card shadow-lg border-0">
                <img 
                  src={blog.blogImage[0] || 'default_image.jpg'} 
                  className="card-img-top" 
                  alt="Blog Image" 
                />
                <div className="card-body mt-2">
                  <div className='d-flex justify-content-between' style={{ backgroundColor: '#E0E0E0' }}>
                    <img 
                      src={blog.authorImage[0] || 'default_author_image.jpg'} 
                      className="img-fluid" 
                      alt="Author" 
                    />
                    <div className="d-flex align-items-center">
                      <i className="bi bi-eye ms-1" style={{ fontSize: '16px' }}></i>
                      <span>{blog.views}</span>
                    </div>
                    <div className="d-flex align-items-center pe-5">
                      <i className="bi bi-heart ms-1" style={{ fontSize: '16px', paddingLeft:'2px' }}></i>
                      <span>{blog.likes}</span>
                    </div>
                  </div>

                  <small className='gap-5  d-flex py-2'>
                    <b>{blog.authorName}</b> <span>{blog.authorProfession}</span>
                  </small>

                  <h5 className="card-title mt-4">{blog.blogTitle}</h5>
                  <p className="card-text fs-6 mt-4" style={{fontSize:'12px'}}>{blog.blogDescription}</p>
                </div>
                <div className="card-footer">
                  <button className="btn border-dark rounded-0">
                    <a href='blog' className="text-decoration-none text-dark">
                      Read more <i className="bi bi-arrow-right"></i>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

          
            </div>
            </div> 
           {/* Show View More / View Less button */}
      {/* Toggle View More/View Less */}
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
      
    
    </>
  )
}

export default Home
