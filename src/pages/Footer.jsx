import React from 'react'
import { Arrow, Email, HR, Payment, Phone, Social, Vector } from '../asset'

const Footer = () => {
  return (
    <>
        <footer className="footer p-5 mt-5">
  
    <div className="foot">
    
    <div className="row">
      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Company Info</h5>

        <ul className="list-unstyled mb-0" >
          <li>
            About us
          </li>
          <li>
            Affiliate
          </li>
          <li>
            Fashion Blogger
          </li>
        </ul>
      </div>
      

      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0 mb-2">Help & Support</h5>

        <ul className="list-unstyled mb-0">
          <li>
           Shipping Info
          </li>
          <li>
            Refund
          </li>
          <li>
              How to Order
          </li>
          <li>
               How to Track
          </li>
          <li>
              Size Guides
          </li>
        </ul>
      </div>
      

      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-2">Customer Care</h5>

        <ul className="list-unstyled mb-0 mb-2">
          <li>
             Contact Us
          </li>
          <li>
             Payment Method
          </li>
          <li>
            <img  style={{width:'150px'}} src={Payment} alt="" />
          </li>
           
        </ul>
      </div>
      

      
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0 mb-2" style={{fontSize:'12px', fontWeight:'500'}}>Signup For The Latest News</h5>

        <div className="form">
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="Enter Email" placeholder='Enter Email' className="form-control" />
            </div>

            <p style={{color:'white', fontSize:'12px'}}> <img style={{marginRight:'5px', width:'10px'}} src={Email} alt="" />
            bycafrica@gmail.com 
          </p>
          <p style={{color:'white', fontSize:'12px'}}> <img style={{marginRight:'5px', width:'10px'}} src={Phone} alt="" />+2348101375376 ; +2349053403403 </p>
        </div>
      </div>
      
    </div>

    <div className="text-center" >
        <img style={{width:'200px'}} src={Social} alt="" />
        <img src={HR} alt=""  className='img-fluid'/>
    </div>
  
    <div style={{color:'white', fontSize:'10px'}} className="text-center p-3">
     All rights Reserved  copyright bycafrica 2021.
     
     </div>
    
  </div>
  
   
  
</footer>
      
    </>
  )
}

export default Footer
