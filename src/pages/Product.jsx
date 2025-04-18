import React from 'react'
import { Arrowright, Boxer, Boxer1, Boxer2, Boxer3, Filter, Singlet, Sort } from '../asset'
import Sing from '../component/Sing'

const Product = () => {
  return (
    <>
            <div>

            <nav aria-label="breadcrumb " className='container ms-2'>
  <ol className="breadcrumb">
    <li className="breadcrumb-item">  <a style={{textDecoration:'none'}} href="#">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">All products</li>
  </ol>
              </nav>

                    <div className="container mt-5 pt-3 mb-5  border">
                        <div className=" row pt-3 border-bottom">
                                <div className=" col-md-2">
                                <p style={{fontSize:'10px'}}> <b>All Products</b></p>
                            </div>   
                            <div className="col-md-9"></div> 
                            <div className="col md 1">
                            <p className='text-danger' style={{fontSize:'10px'}}>  <b><img style={{height:'20px'}} src={Sort} className='img-fluid' alt="" /></b>  </p>
                            
                                </div>        
                            </div>

                            <div className=" row pt-3 border-bottom">
                                  
                                <div className="col-md-11"></div> 
                                <div className="col md 1">
                                <p className='text-danger' style={{fontSize:'10px'}}>  <b><img style={{height:'20px'}} src={Filter} className='img-fluid'  alt="" /></b>  </p>
                                
                                    </div>        
                            </div>

                            <div className="row gap-3">

                                <div className="col md-1"></div>   
                                <div className="col-md-2 my-3 shadow-sm pb-2 singlet">

                                        <img src={Singlet} className='img-fluid' alt="" />
                                        <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                        <p style={{ fontSize:"8px"}}>BYC-2598ABC</p>
                                        <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole / <br/>Tank Top - whte</p>
                                        <p><b>₦1,900.00</b></p> 
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                        <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                                                
                                </div>

                                 <div className="col-md-2 my-3 shadow-sm singlet">
                                                            <img src={Singlet} className='img-fluid' alt="" />
                                                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                                            <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                                            <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                                            <p><b>₦2,800.00</b></p> 
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                                            <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                                            <img src={Singlet} className='img-fluid' alt="" />
                                                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                                            <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                                            <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                                            <p><b>₦1,900.00</b></p> 
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                                            <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                                            <img src={Singlet} className='img-fluid' alt="" />
                                                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                                            <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                                            <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                                            <p><b>₦1,900.00</b></p> 
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                                            <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                                            <img src={Singlet} className='img-fluid' alt="" />
                                                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                                            <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                                            <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                                            <p><b>₦1,900.00</b></p> 
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                            <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                                            <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>
                                <div className="col md-1"></div>   
                                
                            </div>

                            <div className="row gap-3">

                                <div className="col md-1"></div>   
                                <div className="col-md-2 my-3 shadow-sm pb-2 singlet">
                                    <img src={Singlet} className='img-fluid' alt="" />
                                    <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                    <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                    <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                    <p><b>₦2,800.00</b></p> 
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                    <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>                            
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                    <img src={Singlet} className='img-fluid' alt="" />
                                    <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                    <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                    <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                    <p><b>₦2,800.00</b></p> 
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                    <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                    <img src={Singlet} className='img-fluid' alt="" />
                                    <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                    <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                    <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                    <p><b>₦1,900.00</b></p> 
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                    <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                    <img src={Singlet} className='img-fluid' alt="" />
                                    <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                    <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                    <p style={{color:'#787885', fontSize:'9px'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                    <p><b>₦1,900.00</b></p> 
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                    <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                    <img src={Singlet} className='img-fluid' alt="" />
                                    <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                    <p style={{ fontSize:"8px"}}>BYC-501LMS</p>
                                    <p style={{color:'#787885', fontSize:'9px', color:'#787885'}}>Long Cotton Adjustable Strap Camisole <br />Tank Top - Black</p>
                                    <p><b>₦1,900.00</b></p> 
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                    <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                    <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>
                                <div className="col md-1"></div>   

                            </div>

                            <div className="row gap-3">

                                <div className="col md-1"></div>   
                                <div className="col-md-2 my-3 shadow-sm pb-2 singlet">

                                        <img src={Boxer} className='img-fluid' alt="" />
                                        <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>BOXERS</h5>
                                        <p style={{ fontSize:"8px"}}>BYC-1161</p>
                                        <p style={{color:'#787885', fontSize:'9px'}}> Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                        <p><b>₦1,800.00</b></p> 
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                        <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                                                
                                </div>

                                 <div className="col-md-2 my-3 shadow-sm singlet">
                                        <img src={Boxer1} className='img-fluid' alt="" />
                                        <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>BOXERS</h5>
                                        <p style={{ fontSize:"8px"}}>BYC-1201</p>
                                        <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                        <p><b>₦1,800.00</b></p> 
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                        <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                        <img src={Boxer2} className='img-fluid' alt="" />
                                        <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>BOXERS</h5>
                                        <p style={{ fontSize:"8px"}}>KBY-3204</p>
                                        <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                        <p><b>₦10,000.00</b></p> 
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                        <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>       
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                        <img src={Boxer3} className='img-fluid' alt="" />
                                        <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                        <p style={{ fontSize:"8px"}}>KBY-3204</p>
                                        <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                        <p><b>₦12,000.00</b></p> 
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                        <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div>
                                </div>

                                <div className="col-md-2 my-3 shadow-sm singlet">
                                        <img src={Boxer2} className='img-fluid' alt="" />
                                        <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>CAMISOLE</h5>
                                        <p style={{ fontSize:"8px"}}>KBY-3204</p>
                                        <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
                                        <p><b>₦10,000.00</b></p> 
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                                        <div className="d-flex pb-3">
                            <button className="btn btn-sm border-danger mt-3 d-none bot"> <a className='text-decoration-none' href="Wishlist"><i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i> <span  className='text-danger'  style={{fontSize:"10px"}} >  Wishlist</span></a> </button>
                            <button className="btn btn-sm border-danger btn-danger ms-1 mt-3 d-none bot"><i className="bi bi-cart3 text-white"></i> <span className='text-white'style={{fontSize:'10px'}} >Buy Now</span></button>
                            </div> 
                                </div>
                                <div className="col md-1"></div>   
                                
                            </div>
                         
                    </div>



                    
                    <div className='text-center mb-5 pb-5'>
                        <div className="btn-group rounded-0 shadow-sm gap-2 my-5 " role="group">
                        <button type="button" className="btn shadow-sm "><i className="bi bi-arrow-left-short"></i></button>
                        <button type="button" className="btn shadow-sm">1</button>
                        <button type="button" className="btn shadow-sm ">2</button>
                        <button type="button" className="btn shadow-sm  ">3</button>
                        <button type="button" className="btn shadow-sm"><i className="bi bi-arrow-right-short"></i></button>

                        </div>
                    </div>
                    
                    


                   

                  
            <Sing />  

            </div>

            
      
    </>
  )
}

export default Product
