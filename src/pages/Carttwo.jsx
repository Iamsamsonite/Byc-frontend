import React, {useState, useContext} from 'react'
import { Smallblue } from '../asset'
import Sing from '../component/Sing';
import { CartContext } from '../component/CartContext';

const Carttwo = () => {

     const {quantity, setQuantity, totalPrice, setTotalPrice} = useContext(CartContext);
         const [isInWishlist, setIsInWishlist] = useState(false);

          // Product details
    const product = {
    id: 'BYC 1166',
    name: '100% Cotton 12 Pieces Of Mens Boxer',
    price: 2800.00,
  }

     

      // Calculate total price based on quantity
  // const totalPrice = (product.price * quantity).toFixed(2);
  
  // Handlers
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
    setTotalPrice(prev => prev + product.price);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      setTotalPrice(prev => prev - product.price);
    }
  };
  
  const toggleWishlist = () => {
    setIsInWishlist(prev => !prev);
  };
  const removeItem = () => {
    setQuantity(0);
  };

 
  return (
    <>

            <div className="container border rounded mt-5 ">
                <div className='border-bottom m-4 pb-2'>
                <h6 className='fw-bold'>Cart 1 item(s)</h6>
                </div>  

               <div className="row border-bottom pb-3">
                    <div className='col-sm-2 mb-5'>
                        <img style={{width:'150px'}} src={Smallblue} alt="" className='img-fluid' />
                    </div>

                    <div className='col-sm-4 border-end'>
                        <h5 className='fw-bold'>MEN BOXERS</h5>
                        <h6 className='fw-bold'>BYC 1166</h6> 
                        <small className='display-7'>100% Cotton 12 Pieces Of Mens Boxer </small> 

                        <div className="row">
                        <button 
                        className="btn btn-sm border-danger mt-3 text-danger" style={{width:'100px', height:'30px', fontSize:'12px'}}
                        onClick={toggleWishlist}
                        >
                         <i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i>Wishlist
                         
                        
                        </button>
                        <button
                        className="btn btn-sm border-danger btn-danger ms-3 mt-3 text-white" style={{width:'120px', height:'30px', fontSize:'12px'}} 
                        onClick={removeItem}>
                          <i class="bi bi-trash3-fill text-white"></i> Remove 
                        </button>
                            
                            
                        </div>                        
                    </div>
                    <div className='col-sm-3 border-end pb-3 ps-5'>
                        <h5 className='display-7'>Quantity</h5>
                        <button 
                        className=" btn border-0 btn-danger rounded-0 me-2"
                        onClick={increaseQuantity}
                        >
                        <span className="text-xl font-bold">+</span>
                        </button>
                        
                        <span className="w-12 h-10 flex items-center justify-center bg-gray-100">
                        {quantity}
                        </span>
                        
                        <button 
                        className="btn ms-2 border-0 btn-danger rounded-0"
                        onClick={decreaseQuantity}
                        >
                        <span className="text-xl font-bold">-</span>
                        </button>

                    </div>
                    <div className='col-sm-2 ps-5'>
                        <h5 className='display-7'>Unit Price</h5>
                        <div className="text-2xl font-bold text-gray-800 mb-6">
                            ₦{product.price.toFixed(2)}

                            {/* Display total price if quantity > 0 */}
                        {quantity > 0 && (
                        <div className="text-lg font-semibold text-gray-800 mb-4">
                        Total: ₦{totalPrice}
                        </div>
                        )}
                        </div>
                    </div>
                    <div className='col-sm-2'></div>
               </div>

               <div className="row">
                <div className='col-sm-6'></div>
                <div className='col-sm-6 mt-4'>
                    <h6 className='display-7 fw-bold'>CART TOTALS</h6>
                    <div className='mb-4'>
                        <p><small className='mb-2'>Subtotal <span style={{marginLeft:'200px'}}>₦{totalPrice.toFixed(2)}</span></small></p>
                        <p><small>Total <span style={{marginLeft:'220px'}}>₦{totalPrice.toFixed(2)}</span></small></p>

                    </div>
                    <div className='row mb-4'>
                    <button 
                        className="btn btn-sm border-danger mt-1 text-danger" style={{width:'150px', height:'30px', fontSize:'12px'}}
                        
                        >
                         Continue Shopping
                         
                        
                        </button>
                        <button
                        className="btn btn-sm border-danger btn-danger ms-3 mt-1 text-white" style={{width:'150px', height:'30px', fontSize:'12px'}} 
                        ><a className='text-decoration-none text-white' href="Checkout">Proceed to Checkout </a>
                          
                        </button>
                    </div>
                </div>
               </div>

              
            </div>
            <Sing />
    </>
  )
}

export default Carttwo
