import React, { useState, useEffect } from 'react'
import { Group41, Group42, Group34, Group84, Frame167, Frame168, Frame166, Arrowleft, Pant1, Pant2, Pant3, Arrowright, Frame169, Frame169a, Frame169b, Authorview, Arrow } from '../asset'





const Home = () => {

        const [currentIndex, setCurrentIndex] = useState(0);
        const [fadeState, setFadeState] = useState('fade-in');
        
        
        const sentences = [
          "Get the best for yourself",
          "Get the best for Men",
          "Get the best for Women",
          "Get the best for Kids",
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
      
  return (
    <>
      
           


      
      
      
      
      
      
      <div>

      <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active ms-5"  aria-current="page">Home</li>
            </ol>
        </nav>





            <div className='body mt-5'>
                <p>Your body desearve comfort</p>
                <div className="fw-bolder my-4 flex items-center justify-center ">
                        <h2 
                        className={` ${
                            fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
                        }`}
                        >
                        {sentences[currentIndex]}
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


                <button className='btn btn-outline-dark border-black me-2'>Shop now</button>
                <button className='btn btn-outline-dark border border-black'>Learn more</button>
                <div className='mt-5'>
                    <img style={{width:'70%'}} src={Group84} alt="" />
                </div>
            </div>

            <div className='home2 my-5'>
                <h4>Checkout BYC new arrival</h4>
            </div>
            <div className='container'>
                <div className="row col-lg-12">
                    <div className=" col-lg-4">
                        <img src={Group42} style={{width:'350px'}} alt="" />
                        <h5>Mens Underwears</h5>
                        <p>Parturient Venenatis Etiam</p>
                    </div>
                    
                    <div className=" col-lg-4">
                        <img src={Group41} style={{width:'350px'}} alt=""/>
                        <h5>Womens Underwears</h5>
                        <p>Parturient Venenatis Etiam</p>
                    </div>
            
                    <div className=" col-lg-4">
                        <img src={Group34} style={{width:'350px'}} alt=""/>
                        <h5>Underwears</h5>
                        <p>Parturient Venenatis Etiam</p>
                    </div>
                    
                </div>
                        <div className='text-center mt-4'>
                            <button className="btn btn-outline-secondary btn-md border border-1 border-black  ">View all</button>

                        </div>
                </div>

                <div className="container mt-5">
                    <div className="row col-lg-12 justify-content-center">
                        <div className='col-lg-4 m-3 py-5' style={{backgroundColor:'#F1F1F1'}}>
                            <div className="ms-4">
                                <h5 style={{color:'#616161'}}>BYC Collection 2021</h5>
                                <h3 className='fw-bold'>BYC Collection</h3>
                                <p style={{fontSize:'11px'}}>The best everyday option in a Super Saver range within a <br /> reasonable price. It is our responsibility to keep you <br />
                                100 percent stylish. Be smart & trendy with us.</p>
                                <button className="btn my-4 btn-md border border-2 border-black rounded-0 ">Explore</button>
                            </div>

                        </div>

                        <div className="col-lg-4 m-3">
                        <img src={Frame166}  className='img-fluid' alt="" />
                        </div>
                    </div>

                    <div className="row col-lg-12 justify-content-center">
                        <div className='col-lg-4 m-3' >
                            <img src={Frame167} className='img-fluid' alt="" />
                        </div>

                        <div className="col-lg-4 m-3">
                        <img src={Frame168} className='img-fluid' alt="" />
                        </div>
                    </div>

                    <div className='text-center my-5'>
                        <button className="btn btn-outline-secondary btn-md border border-1 border-black  ">View all</button>
                    </div>
                </div>

                <div className='text-center fw-bolder' >
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

                        <div className='text-center mt-4'>
                            <button className="btn btn-outline-secondary btn-md border border-1 border-black  ">View all</button>

                        </div>
                        
                </div>

                <div className='text-center fw-bold'>
                    <h4>BYC AFRICA Blog News</h4>
                </div>

            <div className="container m-5">
                <div className="card-group">

                    <div className="card col-md-3 shadow-lg border-0">
                        <img src={Frame169} className="card-img-top" alt="..."/>
                        <div className="card-body mt-2">
                            <img src={Authorview} className="img-fluid" alt="" />
                            <small><b> Wade Warren.</b> <span className='ml-5'>Fashion Designer</span></small>
                            <h5 className="card-title mt-4">How important are clothes <br /> in your style?</h5>
                            <p className="card-text fs-6 mt-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet</p>
                        </div>
                        <div className="card-footer">
                            <button className='btn border-dark rounded-0'>Read more <i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                    
                    <div className="col-md-1"></div>
                    <div className="card col-md-3 shadow-lg border-0">
                        <img src={Frame169a} className="card-img-top" alt="..."/>
                        <div className="card-body mt-2">
                            <img src={Authorview} className="img-fluid" alt="" />
                            <small><b> Wade Warren.</b> <span className='ml-5'>Fashion Designer</span></small>
                            <h5 className="card-title mt-4">How important are pants <br /> in your style?</h5>
                            <p className="card-text mt-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet</p>
                        </div>
                        <div className="card-footer">
                            <button className='btn border-dark rounded-0'>Read more <i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="card col-md-3 shadow-lg border-0">
                        <img src={Frame169b} className="card-img-top" alt="..."/>
                        <div className="card-body mt-2">
                            <img src={Authorview} className="img-fluid" alt="" />
                            <small><b> Wade Warren.</b> <span className='ml-5'>Fashion Designer</span></small>
                            <h5 className="card-title mt-4">How important are shoes <br /> in your style?</h5>
                            <p className="card-text fs-6 mt-4">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet</p>
                        </div>
                        <div className="card-footer">
                            <button className='btn border-dark rounded-0'>Read more <i class="bi bi-arrow-right"></i></button>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
                         <div className='text-center m-5'>
                            <button className="btn btn-outline-secondary btn-md border border-1 border-black  ">View all</button>

                        </div>



      </div>
      
      
      
    </>
  )
}

export default Home
