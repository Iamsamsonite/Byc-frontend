import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { recentViewed } from '../asset'; // Assuming you have the `recentViewed` data


const Sing = () => {
  // State to manage the cart
  const [cart, setCart] = useState([]);

  // Handle "Buy Now" button click
  const handleBuyNow = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      // Optionally save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`${product.productName} added to cart!`);
    alert(`${product.productName} has been added to your cart.`);
  };

  // Load cart from localStorage on component mount (if any)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  return (
    <div>
      {/* Recently Viewed Section */}
      <div className="container mt-5 pt-3 border">
        <div className="row pt-3 border-bottom">
          <div className="col-md-2">
            <p style={{ fontSize: '10px' }}>
              <b>Recently Viewed</b>
            </p>
          </div>
          <div className="col-md-9"></div>
          <div className="col-md-1">
            <p className="text-danger" style={{ fontSize: '10px' }}>
              <button className='border-0 text-danger bg-white'>
                See all <i className="bi bi-chevron-compact-right"></i>
              </button>
            </p>
          </div>
        </div>

        <div className="row"  style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }}>
  {recentViewed.map((product, index) => (
    <div key={index} className="col-md-3 my-3 d-flex flex-column"
    style={{
      flex: '0 0 20%', // 100% / 5 = 20%
      padding: '10px',
      boxSizing: 'border-box',
    }}>
      <div
        className="singlet shadow-sm"
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'scale(1.05)';
          card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
          card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';

          const buttons = card.querySelectorAll('.bot');
          buttons.forEach((btn) => {
            btn.classList.remove('d-none');
          });
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'scale(1)';
          card.style.boxShadow = 'none';

          const buttons = card.querySelectorAll('.bot');
          buttons.forEach((btn) => {
            btn.classList.add('d-none');
          });
        }}
        style={{ backgroundColor: '#FBFBFB', borderRadius: '8px' }}
      >
        <img
          src={product.productImage}
          className="img-fluid"
          alt={product.productName}
          style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
        />
        <div className="px-2px">
          <h5 style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
            {product.productName}
          </h5>
          <p style={{ fontSize: '12px' }}>{product.productCode}</p>
          <p style={{ color: '#787885', fontSize: '12px' }}>{product.productDescription}</p>
          <p>
            <b>{product.productPrice}</b>
          </p>
        </div>

        <div>
          {[...Array(4)].map((_, i) => (
            <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
          ))}
          <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
          <span className="fw-bold pl-2">{product.ratings}</span>
        </div>

        {/* Buttons */}
        <div className="d-flex pb-3">
          <button className="btn btn-sm border-danger mt-3 d-none bot">
            <a className="text-decoration-none" href="Wishlist">
              <i className="bi bi-heart me-1 text-danger" style={{ fontSize: '10px' }}></i>
              <span className="text-danger" style={{ fontSize: '10px' }}>Wishlist</span>
            </a>
          </button>

          <button
            className="btn btn-sm border-danger btn-danger d-none ms-1 mt-3 bot"
            onClick={() => handleBuyNow(product)}
          >
            <i className="bi bi-cart3 text-white"></i>
            <span className="text-white" style={{ fontSize: '10px' }}>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
  
  );
};

export default Sing;


                           