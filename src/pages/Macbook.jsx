 import React, { useState } from 'react';
import ToggleButton from '../component/ToggleButton';
import SortByDrop from '../component/SortByDrop';
import Sing from '../component/Sing';
import { allProducts } from '../asset';

const Macbook = () => {
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('Most Sold');
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive items per page
  const isLargeScreen = window.innerWidth >= 992;
  const itemsPerPage = isLargeScreen ? 16 : 8;

  const handleBuyNow = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.productName} has been added to your cart.`);
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    console.log('Macbook: Received sort option:', option);
    setSortOption(option);
  };

  // Sorting logic aligned with SortByDrop
  const getSortedProducts = () => {
    let sorted = [...allProducts]; // Use allProducts directly since no filtering is applied
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.productPrice - b.productPrice);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      default:
        break;
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const productsToDisplay = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#FBFBFB',
    borderRadius: '8px',
    cursor: 'pointer',
    height: '100%',
  };

  const renderGridView = () => (
    <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {productsToDisplay.map((product, index) => (
        <div key={index} className="col-lg-3 col-md-6 my-3 d-flex flex-column" style={{ padding: '10px' }}>
          <div
            className="singlet shadow-sm"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.remove('d-none'));
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.add('d-none'));
            }}
          >
            <img
              src={product.productImage}
              className="img-fluid"
              alt={product.productName}
              style={{
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            />
            <div className="px-2" style={{ flexGrow: 1 }}>
              <h5 style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>{product.productName}</h5>
              <p style={{ fontSize: '12px' }}>{product.productCode}</p>
              <p style={{ color: '#787885', fontSize: '12px' }}>{product.productDescription}</p>
              <p><b>{product.productPrice}</b></p>
              <div className="d-flex align-items-center">
                {[...Array(4)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                ))}
                <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                <span className="ms-2 fw-bold">{product.ratings}</span>
              </div>
            </div>
            <div className="d-flex pb-3">
              <button className="btn btn-sm border-danger mt-3 d-none bot">
                <a className="text-decoration-none" href="/Wishlist">
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
  );

  const renderListView = () => (
    <div className="list-group" style={{ width: '100%' }}>
      {productsToDisplay.map((product, index) => (
        <div
          key={index}
          className="list-group-item d-flex flex-column mb-3"
          style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.remove('d-none'));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.querySelectorAll('.bot').forEach((btn) => btn.classList.add('d-none'));
          }}
        >
          <div className="container d-flex">
            <div className="col-sm-3">
              <img
                src={product.productImage}
                className="img-fluid"
                alt={product.productName}
                style={{ height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
              />
            </div>
            <div className="col-sm-4 ms-5">
              <div className="ms-3 w-50" style={{ ...cardStyle, flexGrow: 1 }}>
                <h5>{product.productName}</h5>
                <p>{product.productDescription}</p>
                <p><b>{product.productPrice}</b></p>
                <div className="d-flex align-items-center">
                  {[...Array(4)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill" style={{ color: '#FB8200' }}></i>
                  ))}
                  <i className="bi bi-star-half" style={{ color: '#FB8200' }}></i>
                  <span className="ms-2 fw-bold">{product.ratings}</span>
                </div>
              </div>
              <div className="d-flex gap-2 mt-2 ms-3">
                <button
                  className="btn btn-sm border-danger mt-2 bot d-none"
                  style={{ backgroundColor: '#fff', borderColor: '#BD3A3A', color: '#BD3A3A', fontSize: '12px' }}
                >
                  <i className="bi bi-heart me-1" style={{ fontSize: '10px' }}></i> Wishlist
                </button>
                <button
                  className="btn btn-sm mt-2 bot d-none"
                  onClick={() => handleBuyNow(product)}
                  style={{ backgroundColor: '#BD3A3A', borderColor: '#BD3A3A', color: '#fff', fontSize: '12px' }}
                >
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
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active">Women</li>
          <li className="breadcrumb-item active">Camisole</li>
        </ol>
      </nav>

      <div className="container mt-5 pt-1 mb-2 border">
        <div className="row border-bottom align-items-center mb-3">
          <div className="col-6 col-md-8">
            <b style={{ fontSize: '14px' }}>Camisole</b>
          </div>
          <div className="col-6 col-md-4 d-flex justify-content-end align-items-center gap-2">
            <SortByDrop onSortChange={handleSortChange} />
            
          </div>
        </div>

        <div className="row my-3 border-bottom">
          <div className="col-6 col-md-8">
            <p style={{ fontSize: '14px' }}>{sortedProducts.length} Products Found</p>
          </div>
          <div className="col-6 col-md-4 d-flex justify-content-end align-items-center gap-2">
                       
                      <ToggleButton activeView={viewMode} onToggle={setViewMode} />
                    </div>
        </div>

        {viewMode === 'grid' ? renderGridView() : renderListView()}

        {totalPages > 1 && (
          <div className="text-center">
            <div className="btn-group rounded-0 shadow-sm gap-2 my-5" role="group">
              <button
                type="button"
                className="btn shadow-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <i className="bi bi-arrow-left-short"></i>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`btn shadow-sm ${currentPage === index + 1 ? 'border-warning' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                type="button"
                className="btn shadow-sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                <i className="bi bi-arrow-right-short"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      <Sing />
    </>
  );
};

export default Macbook;