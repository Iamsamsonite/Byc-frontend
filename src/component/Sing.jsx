import React from 'react'
import { Angleright, Stars, Singlet } from '../asset'
import { hover } from '@testing-library/user-event/dist/hover'

const Sing = () => {
  return (
    <>
        <div >
            
                <div className="container mt-5 pt-3 border">
                        <div className=" row pt-3 border-bottom">
                            <div className=" col-md-2">
                            <p style={{fontSize:'10px'}}> <b>Recently Viewed</b></p>
                           </div>   
                           <div className="col-md-9"></div> 
                           <div className="col md 1">
                           <p className='text-danger' style={{fontSize:'10px'}}>  <b>See all <i className=" bi bi-chevron-compact-right"></i></b>  </p>
                           
                            </div>        
                        </div>


                        <div className="row">
                        <div className="col md-1"></div>

                            <div className="col-md-2 my-3  singlet">
                            <img src={Singlet} className='img-fluid' alt="" />
                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>MEN BOXERS</h5>
                            <p style={{ fontSize:"8px"}}>BYC 1163</p>
                            <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
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

                            <div className="col-md-2 my-3 singlet">
                            <img src={Singlet} className='img-fluid' alt="" />
                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>MEN BOXERS</h5>
                            <p style={{ fontSize:"8px"}}>BYC 1163</p>
                            <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
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

                            <div className="col-md-2 my-3 singlet">
                            <img src={Singlet} className='img-fluid' alt="" />
                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>MEN BOXERS</h5>
                            <p style={{ fontSize:"8px"}}>BYC 1163</p>
                            <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
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

                            <div className="col-md-2 my-3 singlet">
                            <img src={Singlet} className='img-fluid' alt="" />
                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>MEN BOXERS</h5>
                            <p style={{ fontSize:"8px"}}>BYC 1163</p>
                            <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
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

                            <div className="col-md-2 my-3 singlet">
                            <img src={Singlet} className='img-fluid' alt="" />
                            <h5 style={{fontWeight:'bold', fontSize:"12px", marginTop:'10px'}}>MEN BOXERS</h5>
                            <p style={{ fontSize:"8px"}}>BYC 1163</p>
                            <p style={{color:'#787885', fontSize:'9px'}}>Fashionable Men's Underwear Boxer <br /> Cotton Underwear 3 In 1</p>
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

export default Sing
