import React, {useState} from 'react'
import { Bigblue, Smallblue, Smallbox, Arrowright } from '../asset'; 
import Sing from '../component/Sing';

 


  const Cart = () => {

     
    
      
  //     const [cart, setCart] = useState([]);
  //     const [isCartOpen, setIsCartOpen] = useState(false);
      
  //     // Add product to cart
  //     const addToCart = (product) => {
  //       setCart(prevCart => {
  //         // Check if product already exists in cart
  //         const existingProduct = prevCart.find(item => item.id === product.id);
          
  //         if (existingProduct) {
  //           // Increase quantity if product already in cart
  //           return prevCart.map(item => 
  //             item.id === product.id 
  //               ? { ...item, quantity: item.quantity + 1 } 
  //               : item
  //           );
  //         } else {
  //           // Add new product with quantity 1
  //           return [...prevCart, { ...product, quantity: 1 }];
  //         }
  //       });
    
  //       // Show cart after adding
  //   setIsCartOpen(true);
  // };
  
  // // Remove product from cart
  // const removeFromCart = (productId) => {
  //   setCart(prevCart => prevCart.filter(item => item.id !== productId));
  // };
  
  // // Update product quantity
  // const updateQuantity = (productId, change) => {
  //   setCart(prevCart => 
  //     prevCart.map(item => {
  //       if (item.id === productId) {
  //         const newQuantity = Math.max(1, item.quantity + change);
  //         return { ...item, quantity: newQuantity };
  //       }
  //       return item;
  //     })
  //   );
  // };
  // // Calculate total items in cart
  // const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // // Calculate cart total
  // const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

   


    const [quantity, setQuantity] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Product details
  const product = {
    id: 'BYC 1166',
    name: '100% Cotton 12 Pieces Of Mens Boxer',
    rating: 4.05,
    price: 2800.00,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blue', code: '#3870C4' },
      { name: 'Pink', code: '#FF05E6' },
      { name: 'Orange', code: '#FB8200' },
      { name: 'Black', code: '#000000' },
    ]
  };

  // Calculate total price based on quantity
  const totalPrice = (product.price * quantity).toFixed(2);
  
  // Handlers
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const toggleWishlist = () => {
    setIsInWishlist(prev => !prev);
  };
  
  const handleAddToCart = () => {
    if (quantity === 0) {
      alert('Please select at least 1 item');
      return;
    }
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    
    alert(`Added ${quantity} items to cart - Size: ${selectedSize}, Color: ${selectedColor}, Total: ₦${totalPrice}`);
  };




// DECREASING BAR
const DecreasingBars = ({ 
    width = 181,
    height = 115,
    barHeight = 11,
    barColor = "#fd7e14",
    borderColor = "#0d6efd",
    borderWidth = 1,
    borderRadius = 36,
    barSpacing = 20,
    bars = 5,
    className = "",
    style = {}
  }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {Array.from({ length: bars }).map((_, index) => (
          <div
            key={index}
            style={{
              width: width - index * barSpacing,
              height: barHeight,
              backgroundColor: barColor,
              border: `${borderWidth}px  ${borderColor}`,
              borderRadius,
            }}
          ></div>
        ))}
      </div>
      
    );
  };


    return (
        <>
        
        
            <div className="container mt-5">
            </div>
            <div className='m-5'>
                <small style={{fontSize:'10px'}} >Home <img  style={{width:'20px'}} src={Arrowright} alt="" /> Men <img  style={{width:'20px'}} src={Arrowright} alt="" />Cart</small>
           </div>

           <div className="container border rounded">
            <div className="row m-4">
                <div className='col-md-5'>


                 
                  
                    <img src={Bigblue} className='img-fluid' alt="" style={{height:'200px'}} />
                    <div  className="btn-group rounded-0 gap-2 my-5 " role="group">
                    <div className='col-sm-12'>

                           {/* Product Carousel */}
       

                           

                    
                    <button type="button" className="btn shadow-sm me-2"><i className="bi bi-arrow-left-short"></i></button>
                    <img src={Smallbox} className='img-fluid' alt="" />
                    <img src={Smallblue} className='img-fluid' alt="" />
                    <img src={Smallbox} className='img-fluid' alt="" />
                    <img src={Smallblue} className='img-fluid' alt="" />
                    {/* <img src={Smallbox} className='img-fluid' alt="" /> */}


                    <button type="button" className="btn shadow-sm ms-2"><i className="bi bi-arrow-right-short"></i></button>
                    </div>
                    </div>


                     
                     
      
       
       
                </div>
                <div className='col-md-7'>
                    <div className='border-bottom pb-3'>
                    <h3 style={{fontWeight:'bold'}}>Men boxers</h3>
                        <h4>BYC 1166</h4> 
                          
                        <p className='fs-6'>100% Cotton 12 Pieces Of Mens Boxer </p>
                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> <span className='fw-bold pl-2'>4.05</span>
                    </div>
                    <div className=' row mt-3'>
                         {/* Price */}
                        <div className="text-2xl font-bold text-gray-800 mb-6">
                            ₦{product.price.toFixed(2)}

                            {/* Display total price if quantity > 0 */}
                        {quantity > 0 && (
                        <div className="text-lg font-semibold text-gray-800 mb-4">
                        Total: ₦{totalPrice}
                        </div>
                        )}
                        </div>
                       
                         
                        
                        <div className='col-sm-5 mt-3'>
                            

                        <h3 className="fs-6 mb-2">Available sizes</h3>
                        <div className="flex gap-4">
                        {product.sizes.map(size => (
                            <button style={{fontSize:'12px', width:'10px', textAlign:'center'}}
                            key={size}
                            className=  {` fs-6 ps-2 pe-4 mx-1 py-2 rounded btn shadow-sm ${selectedSize === size ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} `}
                            onClick={() => setSelectedSize(size) }
                            >
                            {size}
                            </button>
                        ))}
                        </div>
                        </div>
                        <div className='col-sm-5 mt-3'>
                           <h5 className='fs-6'>Available colours</h5>
                           

                            
                        <div className="flex gap-4">
                        {product.colors.map(color => (
                            <button
                            key={color.name}
                            className={`btn shadow-sm mt-2 me-1 border rounded-5  ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
                            style={{ backgroundColor: color.code, height:'25px'}}
                            onClick={() => setSelectedColor(color.name)}
                            aria-label={color.name}
                            />
                        ))}
                        </div>
                        </div>
                        <div className='mt-4'>
                            


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

                        <button 
                        className="btn btn-sm border-danger ms-3 mt-1 text-danger" style={{width:'100px', height:'30px', fontSize:'12px'}}
                        onClick={toggleWishlist}
                        >
                         <i className="bi bi-heart me-1 text-danger" style={{fontSize:"10px"}} ></i>Wishlist
                         
                        
                        </button>

                      
                        </div>




                                                         

                              {/* Add to Cart */}
                    <button 
                        className="btn btn-sm border-0 btn-danger mt-4" style={{width:'330px', height:'30px'}}
                        onClick={handleAddToCart}
                    >
                        
                       <i className="bi bi-cart3" style={{fontSize:"10px"}} ></i> Add to Cart
                    </button>

                        </div>

                        
                    </div>
                    

                 
                    </div>
                </div>
            

            <div className="container mt-5 border">
                <div className='border-bottom m-4 pb-2'>
                <h6 className='fw-bold'>Products Description</h6>
                </div>  
                <div className='m-4'>
                   <p style={{fontSize:'12px'}}>
                   This set of boxers will make you feel comfortable. The hem doesn't ravel. It is made from cotton which allows aeration around your body. It suitable for both adults and teenagers. 
                    These pair of boxers give good fit and sits appropriately, they ensure there is no unsightly bulge and they also give support to an important part of your body, which overall improves 
                    your confidence. It has a comfortable cotton material. It comes in different beautiful colors and patterns.  It has cool and comfortable fit with flexible hem that doesn't ravel and comes 
                    tag -free for maximum comfort. Soft breathable fabric for air movement and forms to your body for best Fit. 
                    It is made of 100% premium cotton and is perfect for crotch, so you don't have to worry about ugly bumps. 
                    For pure organic softness and premium lingerie support, pair this four-in-one suit with yourself or the special man in your life.
                    </p> 
                </div>              
            </div>

            <div className="container mt-5 border">
                <div className='border-bottom m-4 pb-2'>
                <h6 className='fw-bold'>Customer Reviews</h6>
                </div>  
                <div className='m-4'>
                    <p style={{fontSize:'10px'}}>PRODUCT RATINGS (1129)</p>
                </div> 

                <div className="row">
                    <div className='col-sm-3 me-5'>
                    
                        <button className='mb-3 btn border-o p-3 text-center' style={{ background:'#F8F5F5',width:'200px', height:'210px', fontSize:'25px'}}><b>4.5</b>/5.0
                        <p className='fs-5 mt-3'>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                        <i class="bi bi-star-half" style={{color:'#FB8200'}}></i>
                        </p>
                    
                        </button>
                    
                    </div>

                    <div className='col-sm-3 ms-2 ps-5'>
                    
                         
                        
                                       <p> <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i> <b className='ms-2 fs-5'>5</b></p>
                                       <p> <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i><b className='ms-2 fs-5'>4</b></p>
                                       <p> <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i><b className='ms-2 fs-5'>3</b></p>
                                       <p> <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i><b className='ms-2 fs-5'>2</b></p>
                                       <p> <i class="bi bi-star-half" style={{color:'#FB8200'}}></i><b className='ms-2 fs-5'>1</b></p>

                                        
                        
    
                         
                    
                    </div>

                    <div className='col-sm-2 mt-3'>
             
                        
                    <DecreasingBars 
                     bars={5}
                     height={190}
                    />
                  
                 

                     </div>
                     
     

      
 
                </div>

                                    <div className="container mt-5 pt-3">
                                        <div className=" row pt-3">
                                            <div className=" col-md-2 border-bottom">
                                            <p className='display-7' style={{fontSize:'10px'}}>  PRODUCT REVIEWS (438)</p>
                                           </div>   
                                           <div className="col-md-9 border-bottom"></div> 
                                           <div className="col md 1 border-bottom">
                                           <p className='text-danger' style={{fontSize:'10px'}}>  <b>See all <i className=" bi bi-chevron-compact-right"></i></b>  </p>
                                           
                                            </div> 

                                            <div className="row">
                                            <div className='col-sm-12 my-4 border-bottom '>
                                                <h6 className='fw-bold'>Good product</h6>
                                                <small style={{fontSize:'10px'}}>The product lasts, the design is perfect I love it</small>
                                                <p className='mt-4 gap-2'>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> 
                                                <span className=' pl-4' style={{fontSize:'10px', marginLeft:'10px'}}>
                                                12-08-2021 by JAMES JOHN</span>
                                                </p>
                                            </div> 
                                            <div className='col-sm-12 my-4 border-bottom '>
                                                <h6 className='fw-bold'>Good product</h6>
                                                <small style={{fontSize:'10px'}}>The product lasts, the design is perfect I love it</small>
                                                <p className='mt-4 gap-2'>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> 
                                                <span className=' pl-4' style={{fontSize:'10px', marginLeft:'10px'}}>
                                                12-08-2021 by JAMES JOHN</span>
                                                </p>
                                            </div> 
                                            <div className='col-sm-12 my-4 '>
                                                <h6 className='fw-bold'>Good product</h6>
                                                <small style={{fontSize:'10px'}}>The product lasts, the design is perfect I love it</small>
                                                <p className='mt-4 gap-2'>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-fill" style={{color:'#FB8200'}}></i>
                                                <i class="bi bi-star-half" style={{color:'#FB8200'}}></i> 
                                                <span className=' pl-4' style={{fontSize:'10px', marginLeft:'10px'}}>
                                                12-08-2021 by JAMES JOHN</span>
                                                </p>
                                            </div> 
                                             
                                            </div>

                                            
                                        </div>
                
                
                                         
                
                
                                </div>
                
            </div>             
            
           

          <Sing />
          
          
        
          
        </>
      );
    };
  
    export default Cart;
