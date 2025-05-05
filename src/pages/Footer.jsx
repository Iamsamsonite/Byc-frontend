import React from 'react'
import { Arrow, Email, HR, Payment, Phone, Social, Vector } from '../asset'

const Footer = () => {
  return (
    <>
        <footer className="footer p-5 mt-5 bg-dark text-white">
  
    <div className="foot">
    
    <div className="row">
      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ps-5">
        <h5 className="text-uppercase " style={{fontSize:'12x'}}>Company Info</h5>

        <ul className="list-unstyled mb-0"style={{fontSize:'10px'}} >
          <li className="mb-2">
            About us
          </li>
          <li className="mb-2">
            Affiliate
          </li>
          <li className="mb-2">
            Fashion Blogger
          </li>
        </ul>
      </div>
      

      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0 mb-2" style={{fontSize:'12px'}}>Help & Support</h5>

        <ul className="list-unstyled mb-0" style={{fontSize:'10px'}}>
          <li className="mb-2">
           Shipping Info
          </li >
          <li className="mb-2">
            Refund
          </li>
          <li className="mb-2">
              How to Order
          </li>
          <li className="mb-2">
               How to Track
          </li>
          <li className="mb-2">
              Size Guides
          </li>
        </ul>
      </div>
      

      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-2" style={{fontSize:'12px'}}>Customer Care</h5>

        <ul className="list-unstyled mb-0 mb-2" style={{fontSize:'10px'}}>
          <li className="mb-2">
             Contact Us
          </li>
          <li className="mb-2">
             Payment Method
          </li>
          <li className="mb-2">
            <img  style={{width:'150px'}} src={Payment} alt="" />
          </li>
           
        </ul>
      </div>
      

      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0 mb-2" style={{fontSize:'10px', fontWeight:'500'}}>Signup For The Latest News</h5>

        <div className="form">
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="Enter Email" placeholder='Enter Email' className="form-control" />
            </div>

            <p style={{color:'white', fontSize:'10px'}}> <img style={{marginRight:'5px', width:'10px'}} src={Email} alt="" />
            bycafrica@gmail.com 
          </p>
          <p style={{color:'white', fontSize:'10px'}}> <img style={{marginRight:'5px', width:'10px'}} src={Phone} alt="" />+2348101375376 ; +2349053403403 </p>
        </div>
      </div>
      
    </div>

    <div className="text-center" >
        <img style={{width:'200px'}} src={Social} alt="" />
        <img src={HR} alt=""  className='img-fluid'/>
    </div>
  
    <div style={{color:'white', fontSize:'8px'}} className="text-center p-3">
     All rights Reserved  copyright bycafrica 2021.
     
     </div>
    
  </div>
  
   
  
</footer>
      
    </>
  )
}

export default Footer
