import React, {useContext} from 'react'
// import { useState } from 'react';
import { Pay, Smallblue } from '../asset'
import { CartContext } from '../component/CartContext';


const Checkout = () => {

     const {quantity, totalPrice} = useContext(CartContext);

     console.log('Checkout Context:', { quantity, totalPrice }); // Debugging
            //  const [isInWishlist, setIsInWishlist] = useState(false);
        // const deliveryFee = 2000; // Assuming no delivery fee for simplicity
        // const 
              // Product details
    //     const product = {
    //     id: 'BYC 1166',
    //     name: '100% Cotton 12 Pieces Of Mens Boxer',
    //     price: 2800.00,
    //   }
    
//        // Handlers
//   const increaseQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };
  
//   const decreaseQuantity = () => {
//     if (quantity > 0) {
//       setQuantity(prev => prev - 1);
//     }
//   };
  
//   const toggleWishlist = () => {
//     setIsInWishlist(prev => !prev);
//   };
//   const removeItem = () => {
//     setQuantity(0);
//   };


    
      // Calculate total price based on quantity
//   const totalPrice = (product.price * quantity).toFixed(2);
  const deliveryFee = 2000; // Assuming no delivery fee for simplicity
    // const totalAmount = (totalPrice + deliveryFee).toFixed(2); // Total amount including delivery fee

    const totalAmount = (totalPrice + deliveryFee).toFixed(2); // Total amount including delivery fee

  return (
    <>
            <div className="container border rounded mt-5 ">
                <div className='border-bottom m-4 pb-2'>
                <h6 className='fw-bold'>Order Summary 1 item(s)</h6>
                </div>  

               <div className="row border-bottom pb-3">
                    <div className='col-sm-2 mb-5'>
                        <img style={{width:'150px'}} src={Smallblue} alt="" className='img-fluid' />
                    </div>

                    <div className='col-sm-4 border-end'> 
                        <h5 className='fw-bold'>MEN BOXERS</h5>
                        <h6 className='fw-bold'>BYC 1166</h6> 
                        <small className='display-7'>100% Cotton 12 Pieces Of Mens Boxer </small> 
                        <h6 className='mt-3 fw-bold'> 2,800.00
                        {/* {totalPrice.toFixed(2)}  */}

                        </h6>
                        <h6 className='mt-3'>Quatity: <span className='ms-2'>1 </span></h6>
                        <button 
                        className="btn btn-sm btn-danger border-danger mt-3 text-white" style={{width:'100px', height:'30px', fontSize:'12px'}}
                        
                        > <a className='text-decoration-none text-white' href="Cart">Modify Cart</a>
                        
                         
                        
                        </button>
                        

                    </div>

                    <div className='col-sm-1'></div>
                        <div className='col-sm-4'>
                        
                    <div className='mb-4'>
                        <p><small className='mb-2'>Subtotal <span style={{marginLeft:'200px'}}>₦2,800.00</span></small></p>
                        <p><small className='mb-2 border-bottom pb-3'>Delivery fee <span style={{marginLeft:'178px'}}>₦{deliveryFee.toFixed(2)}</span></small></p>
                        <h6 className='pt-4'><b>Total <span style={{marginLeft:'210px'}}>#{totalAmount}</span></b></h6>


                    </div>
                        </div>
               </div>

              
               <div className="container">
                    <div className="row">
                        <div className="col-sm-5 my-5">
                                <h6 className='fw-bold'>SHOPPING ADDRESS</h6>

                                        <div className="form">
                                        
                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputFullname1" className="form-label"  style={{fontSize:'12px'}}>Full Name</label>
                                                <input type="Fullname" className="form-control border-danger" placeholder="Joe Jamie" id="exampleInputFullname1" aria-describedby="FullnameHelp" />
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputCompanyname1" className="form-label"  style={{fontSize:'12px'}}>Company name (optional)</label>
                                                <input type="Companyname" className="form-control border-danger" placeholder="Joe Ltd" id="exampleInputCompanyname1" aria-describedby="CompanynameHelp" />
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputCountry" className="form-label"  style={{fontSize:'12px'}}>Country / Region</label>
                                                <input type="Country" className="form-control border-danger" placeholder="Nigeria" id="exampleInputCountry1" aria-describedby="CountryHelp" />
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputTown" className="form-label"  style={{fontSize:'12px'}}>Town / City</label>
                                                <input type="Town" className="form-control border-danger" placeholder="Lagos" id="exampleInputTown1" aria-describedby="TownHelp" />
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputState" className="form-label"  style={{fontSize:'12px'}}>State</label>
                                                <input type="State" className="form-control border-danger" placeholder="Lagos" id="exampleInputState1" aria-describedby="StateHelp" />
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputState" className="form-label"  style={{fontSize:'12px'}}>State</label>
                                                <input type="State" className="form-control border-danger" placeholder="Lagos" id="exampleInputState1" aria-describedby="StateHelp" />
                                            </div>

                                            <div className="mb-2 mt-3">
                                                <label for="exampleInputPhone" className="form-label"  style={{fontSize:'12px'}}>State</label>
                                                <input type="Phone" className="form-control border-danger" placeholder="0123456789" id="exampleInputPhone1" aria-describedby="PhoneHelp" />
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <label for="exampleInputEmail1" className="form-label" style={{fontSize:'12px'}}>Email address</label>
                                                <input type="Email" className="form-control border-danger" placeholder="Joe@gmail.com" id="exampleInputEmail1" />
                                            </div>

                                             
                                            
                                            <div className="d-grid mt-5">
                                                <button className="btn btn-danger" type="button">Submit</button>
                                                
                                            </div>
                                            
                                        
                                        
                                        
                    
                                        </div>
                                        </div>
                        <div className="col-sm-2 "> </div>
                        <div className="col-sm-5 my-5 ">
                                <h6 className='fw-bold mb-5'>CHECKOUT</h6>

                                <div className='container border' style={{backgroundColor:'#FFF8F8'}}>
                                <div className="form-check mt-3">
                                    <input className="form-check-input mt-2"  type="radio" name="flexRadioDefault" style={{borderColor:'#BD3A3A'}} id="flexRadioDefault1"/>
                                    <label className="form-check-label mb-3 display-7" style={{fontSize:'13px'}} for="flexRadioDefault1">
                                         Direct Bank Transfer
                                    </label>

                                    <div className='ms-2 ps-2'>
                                        <p className='p-2' style={{backgroundColor:'#FFFFFF', fontSize:'10px'}}>Make your payment directly into our bank account. <br />
                                            Please use your Order ID as the payment reference. <br />
                                            Your order will not be shipped until the funds have cleared in our account.</p>
                                    </div>


                                   
                                </div>

                                <div className="form-check mt-5">
                                <input className="form-check-input mt-4" type="radio" style={{borderColor:'#BD3A3A'}} name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label mb-3 display-7" style={{fontSize:'13px'}} for="flexRadioDefault1">
                                         Secured Online Payment <span className='ms-3'><img src={Pay}  style={{width:'200px'}} className='img-fluid' alt="" /></span>
                                    </label>


                                    <div>
                                        <p className='pt-5 pb-3 mt5' style={{fontSize:'6px', marginTop:'50px'}}>Your personal data will be used to process your order, support your experience throughout
                                        Your personal data will be used to process your order, support your experience throughout 
                                        this website, and for other purposes described in our privacy policy.
                                        </p>
                                    </div>
                                </div>

                                </div>

                                <div className="d-grid mt-5">
                                                <button className="btn btn-danger" type="button">Place order</button>
                                                
                                    </div>
                        </div>


                    </div>
               </div>
            </div>
      
    </>
  )
}

export default Checkout
