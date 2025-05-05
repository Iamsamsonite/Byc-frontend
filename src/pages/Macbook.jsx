import React from 'react'
import { Arrowright, Filter, Singlet, Sort } from '../asset'
import SortDropdown from '../component/SortDropdown'
import ToggleButton from '../component/ToggleButton'





const Macbook = () => {
  return (
    <>


    <div>
         <div style={{margin:'30px'}}>
                                    <small style={{fontSize:'10px'}} >Home <img  style={{width:'20px'}} src={Arrowright} alt="" /> Men <img  style={{width:'20px'}} src={Arrowright} alt="" />Boxers</small>
                            </div>

    <div className="container mt-5 pt-3 mb-5  border">
                        <div className=" row pt-3 border-bottom">
                                <div className=" col-md-2">
                                <p style={{fontSize:'10px'}}> <b>Camisole</b></p>
                            </div>   
                            <div className="col-md-9"></div> 
                            <div className="col md 1">
                            <p className='text-danger' style={{fontSize:'10px', width:'60px'}}> <SortDropdown/>   </p>
                            
                                </div>        
                            </div>

                            <div className=" row pt-3 border-bottom">
                            <div className="col-md-1">
                                <p style={{fontSize:'8px'}}>6 products found</p></div> 
                                <div className="col-md-10"></div> 
                                <div className="col md 1">
                                <p className='text-danger' style={{fontSize:'10px', width:'60px'}}> <ToggleButton/>  </p>
                                
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
 

                             
                         
                    </div>



    </div>
      
    </>
  )
}

export default Macbook
