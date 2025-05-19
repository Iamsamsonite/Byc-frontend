import React, { useState } from 'react';
import ToggleButton from '../component/ToggleButton';
import SortByDrop from '../component/SortByDrop';
import Sing from '../component/Sing';
import { allProducts } from '../asset';

const Macbook = () => {
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('Most Sold');

  const handleBuyNow = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.productName} has been added to your cart.`);
  };

  const getSortedProducts = () => {
    let sorted = [...allProducts];
    if (sortOption === 'price LowToHigh') {
      sorted.sort((a, b) => parseFloat(a.productPrice.replace('₦', '').replace(',', '')) - parseFloat(b.productPrice.replace('₦', '').replace(',', '')));
    } else if (sortOption === 'price HighToLow') {
      sorted.sort((a, b) => parseFloat(b.productPrice.replace('₦', '').replace(',', '')) - parseFloat(a.productPrice.replace('₦', '').replace(',', '')));
    } else if (sortOption === 'Newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'Oldest') {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'Best Rated') {
      sorted.sort((a, b) => b.ratings - a.ratings);
    } else if (sortOption === 'Most Popular') {
      sorted.sort((a, b) => b.popularity - a.popularity);
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();
  const productsToDisplay = sortedProducts.slice(0, 7); // Display only first 7 products

  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#FBFBFB',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const renderGridView = () => (
    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {productsToDisplay.map((product, index) => (
        <div key={index} className="col-md-3 my-3 d-flex flex-column" style={{  padding: '10px' }}>
          <div className="singlet shadow-sm" style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.querySelectorAll('.bot').forEach(btn => btn.classList.remove('d-none'));
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelectorAll('.bot').forEach(btn => btn.classList.add('d-none'));
            }}
          >
            <img src={product.productImage} className="img-fluid" alt={product.productName}
              style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />
            <div className="px-2px">
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>{product.productName}</h5>
              <p style={{ fontSize: '12px' }}>{product.productCode}</p>
              <p style={{ color: '#787885', fontSize: '12px' }}>{product.productDescription}</p>
              <p><b>{product.productPrice}</b></p>
            </div>
            <div>
              {[...Array(4)].map((_, i) => <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>)}
              <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
              <span className="ms-2 fw-bold">{product.ratings}</span>
            </div>
            <div className="d-flex pb-3">
              <button className="btn btn-sm border-danger mt-3 d-none bot">
                <a className="text-decoration-none" href="Wishlist">
                  <i className="bi bi-heart me-1 text-danger" style={{ fontSize: '10px' }}></i>
                  <span className="text-danger" style={{ fontSize: '10px' }}>Wishlist</span>
                </a>
              </button>
              <button className="btn btn-sm border-danger btn-danger d-none ms-1 mt-3 bot" onClick={() => handleBuyNow(product)}>
                <i className="bi bi-cart3 text-white"></i>
                <span className="text-white" style={{ fontSize: '10px' }}>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="list-group" style={{ width: '100%' }}>
      {productsToDisplay.map((product, index) => (
        <div key={index} className="list-group-item d-flex flex-column mb-3"
          style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            e.currentTarget.querySelectorAll('.bot').forEach(btn => btn.classList.remove('d-none'));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.querySelectorAll('.bot').forEach(btn => btn.classList.add('d-none'));
          }}
        >
          <div className="container d-flex">
            <div className="col-sm-3">
              <img src={product.productImage} className="img-fluid" alt={product.productName}
                style={{ objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
            </div>
            <div className="col-sm-4 ms-5">
              <div className="ms-3 w-50" style={{ ...cardStyle, flexGrow: 1 }}>
                <h5>{product.productName}</h5>
                <p>{product.productDescription}</p>
                <p><b>{product.productPrice}</b></p>
                <div className="d-flex align-items-center">
                  {[...Array(4)].map((_, i) => <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>)}
                  <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                  <span className="ms-2 fw-bold">{product.ratings}</span>
                </div>
              </div>
              <div className="d-flex gap-2 mt-2 ms-3">
                <button className="btn btn-sm border-danger mt-2 bot d-none" style={{ backgroundColor: '#fff', borderColor: '#BD3A3A', color: '#BD3A3A', fontSize: '12px' }}>
                  <i className="bi bi-heart me-1" style={{ fontSize: '10px' }}></i> Wishlist
                </button>
                <button className="btn btn-sm mt-2 bot d-none" onClick={() => handleBuyNow(product)}
                  style={{ backgroundColor: '#BD3A3A', borderColor: '#BD3A3A', color: '#fff', fontSize: '12px' }}>
                  <i className="bi bi-cart3 me-1"></i> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <nav className="container ms-2" aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">women</li>
          <li className="breadcrumb-item active">Camisole</li>
        </ol>
      </nav>

      <div className="container mt-5 pt-1 mb-2 border">
        <div className="row border-bottom align-items-center">
          <div className="col-md-2"><b style={{ fontSize: '14px' }}>Camisole</b></div>
          <div className="col-md-8"></div>
          <div className="col-md-2 d-flex justify-content-end"><SortByDrop onSortChange={setSortOption} /></div>
        </div>

        <div className="row my-3 border-bottom">
          <div className="col-md-2"><p style={{ fontSize: '14px' }}>{productsToDisplay.length} Products Found</p></div>
          <div className="col-md-8"></div>
          <div className="col-md-2 d-flex justify-content-end"><ToggleButton activeView={viewMode} onToggle={setViewMode} /></div>
        </div>

        {viewMode === 'grid' ? renderGridView() : renderListView()}

      </div>

      <Sing />
    </>
  );
};

export default Macbook;
