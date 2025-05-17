import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { UserContext } from '../context/UserContext';
import Sing from '../component/Sing';
import axios from 'axios';

const Carttwo = () => {
  const { cartItems, removeFromCart, updateQuantity, cartCount, totalPrice } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { isAuthenticated, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Carttwo mounted, auth state:', { isAuthenticated, user, token: localStorage.getItem('token') });
  }, [isAuthenticated, user]);

  const handleCheckout = () => {
    console.log('handleCheckout triggered', {
      isAuthenticated,
      user,
      token: localStorage.getItem('token'),
      localStorageUser: localStorage.getItem('user'),
    });

    if (!isAuthenticated || !user) {
      console.log('Not authenticated, redirecting to /account');
      navigate('/account');
    } else {
      console.log('Authenticated, redirecting to /checkout');
      navigate('/checkout');
    }
  };

  const testAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Testing auth, token:', token ? 'Present' : 'Absent');
      const res = await axios.get('http://localhost:4000/api/byc/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Manual auth check:', res.data);
    } catch (err) {
      console.error('Manual auth error:', err.response?.data || err.message);
    }
  };

  const increaseQuantity = (itemId, selectedSize, selectedColor) => {
    const item = cartItems.find(
      (i) => i.id === itemId && i.selectedSize === selectedSize && i.selectedColor === selectedColor
    );
    if (item) {
      updateQuantity(itemId, selectedSize, selectedColor, item.quantity + 1);
    }
  };

  const decreaseQuantity = (itemId, selectedSize, selectedColor) => {
    const item = cartItems.find(
      (i) => i.id === itemId && i.selectedSize === selectedSize && i.selectedColor === selectedColor
    );
    if (item && item.quantity > 1) {
      updateQuantity(itemId, selectedSize, selectedColor, item.quantity - 1);
    }
  };

  const removeItem = (itemId, selectedSize, selectedColor) => {
    removeFromCart(itemId, selectedSize, selectedColor);
    console.log(`Removed item ${itemId} from cart`);
  };

  const toggleWishlist = (item) => {
    const productId = item.id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      console.log(`Removed ${item.name} from wishlist`);
    } else {
      addToWishlist({ id: productId, productName: item.name });
      console.log(`Added ${item.name} to wishlist`);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h5>Your cart is empty</h5>
        <p>
          <Link to="/products" className="text-decoration-none">
            Continue Shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container border rounded mt-5">
      <div className="border-bottom m-4 pb-2">
        <h6 className="fw-bold">Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})</h6>
      </div>

      {cartItems.map((item, index) => (
        <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="row border-bottom pb-3">
          <div className="col-sm-2 mb-5">
            <img
              style={{ width: '150px' }}
              src={item.image || 'https://via.placeholder.com/150?text=No+Image'}
              alt={item.name}
              className="img-fluid"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                console.warn(`Failed to load image for ${item.name}`);
              }}
            />
          </div>

          <div className="col-sm-4 border-end">
            <h5 className="fw-bold">{item.name}</h5>
            <h6 className="fw-bold">{item.productNumber || 'N/A'}</h6>
            <small className="display-7">
              Size: {item.selectedSize || 'N/A'}, Color: {item.selectedColor || 'N/A'}
            </small>

            <div className="row">
              <button
                className="btn btn-sm border-danger mt-3 text-danger"
                style={{ width: '130px', height: '30px', fontSize: '10px' }}
                onClick={() => toggleWishlist(item)}
              >
                <i
                  className={`bi ${
                    isInWishlist(item.id) ? 'bi-heart-fill text-danger' : 'bi-heart text-danger'
                  }`}
                  style={{ fontSize: '10px' }}
                ></i>{' '}
                {isInWishlist(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                className="btn btn-sm border-danger btn-danger ms-3 mt-3 text-white"
                style={{ width: '120px', height: '30px', fontSize: '12px' }}
                onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
              >
                <i className="bi bi-trash3-fill text-white"></i> Remove
              </button>
            </div>
          </div>

          <div className="col-sm-3 border-end pb-3 ps-5">
            <h5 className="display-7">Quantity</h5>
            <button
              className="btn border-0 btn-danger rounded-0 me-2"
              onClick={() => increaseQuantity(item.id, item.selectedSize, item.selectedColor)}
            >
              <span className="text-xl font-bold">+</span>
            </button>

            <span className="w-12 h-10 flex items-center justify-center bg-gray-100">
              {item.quantity}
            </span>

            <button
              className="btn ms-2 border-0 btn-danger rounded-0"
              onClick={() => decreaseQuantity(item.id, item.selectedSize, item.selectedColor)}
              disabled={item.quantity <= 1}
            >
              <span className="text-xl font-bold">-</span>
            </button>
          </div>

          <div className="col-sm-2 ps-5">
            <h5 className="display-7">Unit Price</h5>
            <div className="text-2xl font-bold text-gray-800 mb-6">
              ₦{item.price.toFixed(2)}
              <div className="text-lg font-semibold text-gray-800 mb-4">
                ₦{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-sm-6">
          {/* <button
            className="btn btn-sm border-danger btn-danger mt-1 text-white"
            style={{ width: '150px', height: '30px', fontSize: '12px' }}
            onClick={testAuth}
          >
            Test Auth
          </button> */}
        </div>
        <div className="col-sm-6 mt-4">
          <h6 className="display-7 fw-bold">CART TOTALS</h6>
          <div className="mb-4">
            <p>
              <small className="mb-2">
                Subtotal <span style={{ marginLeft: '200px' }}>₦{totalPrice.toFixed(2)}</span>
              </small>
            </p>
            <p>
              <small>
                Total <span style={{ marginLeft: '220px' }}>₦{totalPrice.toFixed(2)}</span>
              </small>
            </p>
          </div>
          <div className="d-flex mb-4">
            <Link to="/products">
              <button
                className="btn btn-sm border-danger mt-1 text-danger"
                style={{ width: '150px', height: '30px', fontSize: '12px' }}
              >
                Continue Shopping
              </button>
            </Link>
            <button
              className="btn btn-sm border-danger btn-danger ms-3 mt-1 text-white"
              style={{ width: '150px', height: '30px', fontSize: '12px' }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Sing />
    </div>
  );
};

export default Carttwo;