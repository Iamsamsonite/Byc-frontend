 // C:/Users/HP/Desktop/desktop/bycfrontend/src/pages/Checkout.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pay } from '../asset'; // Verify this import
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
  const { cartItems, totalPrice, cartCount, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    townCity: '',
    state: '',
    phone: '',
    email: user?.email || '',
    paymentMethod: 'bankTransfer',
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');
  const [addressSuccess, setAddressSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Checkout Context:', { cartItems, totalPrice, cartCount, user });

  // Default placeholder images
  const defaultCartImage = 'https://via.placeholder.com/150?text=No+Image';
  const defaultPaymentImage = 'https://via.placeholder.com/200x50?text=Payment+Methods';

  // Calculate delivery fee
  const deliveryFee = cartItems.reduce((sum, item) => sum + 1000 * item.quantity, 0);
  const totalAmount = (totalPrice + deliveryFee).toFixed(2);

  // Paystack configuration
  const publicKey = process.env.REACT_APP_PAYSTACK_TEST_PUBLIC_KEY;
  console.log('Paystack publicKey:', publicKey);
  if (!publicKey) {
    console.error('Paystack public key is missing. Please set REACT_APP_PAYSTACK_TEST_PUBLIC_KEY in .env');
  }
  const paystackConfig = {
    reference: `BYC_${new Date().getTime().toString()}`,
    email: formData.email && /\S+@\S+\.\S+/.test(formData.email) ? formData.email : user?.email || 'test@example.com',
    amount: Math.round(parseFloat(totalAmount) * 100) || 10000,
    publicKey,
    metadata: {
      fullName: formData.fullName,
      phone: formData.phone,
    },
  };
  console.log('Paystack config:', paystackConfig);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', { name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setAddressSuccess('');
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    console.log('Payment method changed:', e.target.value);
    setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }));
    setAddressSuccess('');
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.townCity) errors.townCity = 'Town/City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.paymentMethod) errors.paymentMethod = 'Payment method is required';
    return errors;
  };

  // Handle Submit Shipping Address
  const handleSubmitAddress = () => {
    console.log('Submit button clicked, formData:', formData);
    setFormErrors({});
    setAddressSuccess('');

    const errors = validateForm();
    console.log('Validation errors:', errors);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setAddressSuccess('Shipping address submitted successfully');
    console.log('Address success set');
    setTimeout(() => {
      setAddressSuccess('');
      console.log('Address success cleared');
    }, 3000);
  };

  // Save order
  // const saveOrder = async (paymentReference = null) => {
  //   setLoading(true);
  //   setOrderError('');
  //   setOrderSuccess('');

  //   const order = {
  //     cartItems,
  //     shippingAddress: {
  //       fullName: formData.fullName,
  //       companyName: formData.companyName,
  //       country: formData.country,
  //       townCity: formData.townCity,
  //       state: formData.state,
  //       phone: formData.phone,
  //       email: formData.email,
  //     },
  //     paymentMethod: formData.paymentMethod,
  //     paymentReference,
  //     subtotal: totalPrice,
  //     deliveryFee,
  //     totalAmount: parseFloat(totalAmount),
  //     orderDate: new Date().toISOString(),
  //   };

  //   console.log('Placing order:', order);

  //   try {
  //     const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  //     const response = await axios.post(`${API_URL}/api/byc/orders`, order, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     console.log('Order response:', response.data);
  //     clearCart();
  //     setOrderSuccess('Order placed successfully!');
  //     toast.success('Order placed successfully!');
  //     navigate('/order-confirmation', { state: { order: response.data.order } });
  //   } catch (err) {
  //     console.error('Error placing order:', err.response?.data || err.message);
  //     const errorMsg = err.response?.data?.message || 'Failed to place order. Please try again.';
  //     setOrderError(errorMsg);
  //     toast.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const saveOrder = async (paymentReference = null) => {
//     setLoading(true);
//     setOrderError('');
//     setOrderSuccess('');
  
//     const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
  
//     if (!user || !user.id) {
//       console.error('User is not logged in or user ID is missing.');
//       setOrderError('User is required to place an order.');
//       setLoading(false);
//       return;
//     }
  
//     const order = {
//       orderId: `BYC_${new Date().getTime()}`, // Generate a unique order ID
//       user: user.id, // Ensure user ID is included
//       cartItems: cartItems.map((item) => ({
//         product: item.id, // Ensure product ID is included
//         quantity: item.quantity,
//       })),
//       shippingAddress: {
//         fullName: formData.fullName,
//         companyName: formData.companyName,
//         country: formData.country,
//         townCity: formData.townCity,
//         state: formData.state,
//         phone: formData.phone,
//         email: formData.email,
//       },
//       paymentMethod: formData.paymentMethod,
//       paymentReference,
//       subtotal: totalPrice,
//       deliveryFee,
//       totalAmount: parseFloat(totalAmount),
//       orderDate: new Date().toISOString(),
//     };
  
//     console.log('Placing order:', order);
//     console.log('Order payload being sent:', order);
  
//     try {
//       const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
//       const response = await axios.post(`${API_URL}/api/byc/orders`, order, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       console.log('Order response:', response.data);
//       clearCart();
//       setOrderSuccess('Order placed successfully!');
//       toast.success('Order placed successfully!');
//       navigate('/order-confirmation', { state: { order: response.data.order } });
//       console.log('Order response:', response.data);
// console.log('Navigating to order confirmation with order:', response.data.order);
//     } catch (err) {
//       console.error('Error placing order:', err.response?.data || err.message);
//       const errorMsg = err.response?.data?.message || 'Failed to place order. Please try again.';
//       setOrderError(errorMsg);
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

const saveOrder = async (paymentReference = null) => {
  setLoading(true);
  setOrderError('');
  setOrderSuccess('');

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.id) {
    console.error('User is not logged in or user ID is missing.');
    setOrderError('User is required to place an order.');
    setLoading(false);
    return;
  }

  const generatedOrderId = `BYC_${new Date().getTime()}`;
  console.log('Generated orderId:', generatedOrderId);

  if (!generatedOrderId || generatedOrderId === 'BYC_undefined' || generatedOrderId === 'BYC_null') {
    console.error('Invalid orderId generated:', generatedOrderId);
    setOrderError('Failed to generate a valid order ID. Please try again.');
    setLoading(false);
    return;
  }

  // Validate cartItems
  const validatedCartItems = cartItems.map((item) => {
    if (!item.id || !item.name || typeof item.price !== 'number' || !item.quantity) {
      console.warn('Invalid cart item:', item);
      return {
        product: item.id || 'unknown',
        quantity: item.quantity || 1,
        name: item.name || 'Unknown Product',
        price: item.price || 0,
      };
    }
    return {
      product: item.id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
    };
  });

  const order = {
    orderId: generatedOrderId,
    user: user.id,
    cartItems: validatedCartItems,
    shippingAddress: {
      fullName: formData.fullName,
      companyName: formData.companyName,
      country: formData.country,
      townCity: formData.townCity,
      state: formData.state,
      phone: formData.phone,
      email: formData.email,
    },
    paymentMethod: formData.paymentMethod,
    paymentReference,
    subtotal: totalPrice || 0,
    deliveryFee: deliveryFee || 0,
    totalAmount: parseFloat(totalAmount) || 0,
    orderDate: new Date().toISOString(),
  };

  console.log('Placing order:', order);

  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    const response = await axios.post(`${API_URL}/api/byc/orders`, order, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('Order response:', response.data);
    clearCart();
    setOrderSuccess('Order placed successfully!');
    toast.success('Order placed successfully!');
    localStorage.setItem('order', JSON.stringify(response.data.order));
    navigate('/order-confirmation', { state: { order: response.data.order } });
  } catch (err) {
    console.error('Error placing order:', err.response?.data || err.message);
    const errorMsg = err.response?.data?.message || 'Failed to place order. Please try again.';
    setOrderError(errorMsg);
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};
  // Handle Paystack success
  const handlePaystackSuccess = (response) => {
    console.log('Payment successful:', response);
    saveOrder(response.reference);
  };

  // Handle Paystack close
  const handlePaystackClose = () => {
    console.log('Payment closed');
    setOrderError('Payment was cancelled. Please try again.');
    toast.error('Payment cancelled');
  };

  // Handle Place Order
  const handlePlaceOrder = async () => {
    console.log('Place order clicked, formData:', formData);
    setOrderError('');
    setOrderSuccess('');

    const errors = validateForm();
    console.log('Place order validation errors:', errors);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (formData.paymentMethod === 'bankTransfer') {
      await saveOrder();
    }
  };

  // Handle navigation to ProductDetails
  const handleModifyCart = (productId) => {
    console.log('Navigating to ProductDetails for ID:', productId);
    navigate(`/product/${productId}`);
  };

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h2>Checkout</h2>
        <p>Please log in to proceed with checkout.</p>
        <button className="btn btn-danger" onClick={() => navigate('/account')}>
          Log In
        </button>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <button className="btn btn-danger" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container border rounded mt-5">
      <div className="border-bottom m-4 pb-2">
        <h6 className="fw-bold">Order Summary ({cartCount} item{cartCount !== 1 ? 's' : ''})</h6>
      </div>

      {cartItems.map((item, index) => (
        <div key={index} className="row border-bottom pb-3 mb-3">
          <div className="col-sm-2 mb-5">
            <img
              style={{ width: '150px' }}
              src={item.image || defaultCartImage}
              alt={item.name}
              className="img-fluid"
              onError={(e) => {
                console.warn('Cart image failed to load:', item.image);
                e.target.src = defaultCartImage;
              }}
            />
          </div>

          <div className="col-sm-4 border-end">
            <h5 className="fw-bold">{item.name || 'N/A'}</h5>
            <h6 className="fw-bold">{item.productNumber || 'N/A'}</h6>
            <small className="display-7">
              {item.selectedSize && item.selectedColor
                ? `${item.selectedSize}, ${item.selectedColor}`
                : 'Mens Boxer'}
            </small>
            <h6 className="mt-3 fw-bold">₦{(item.price * item.quantity).toFixed(2)}</h6>
            <h6 className="mt-3">
              Quantity: <span className="ms-2">{item.quantity}</span>
            </h6>
            <button
              className="btn btn-sm btn-danger border-danger mt-3 text-white"
              style={{ width: '100px', height: '30px', fontSize: '12px' }}
              onClick={() => handleModifyCart(item.id)}
            >
              Modify
            </button>
          </div>

          <div className="col-sm-1"></div>
          {index === 0 && (
            <div className="col-sm-4">
              <div className="mb-4">
                <p>
                  <small className="mb-2">
                    Subtotal <span style={{ marginLeft: '200px' }}>₦{totalPrice.toFixed(2)}</span>
                  </small>
                </p>
                <p>
                  <small className="mb-2 border-bottom pb-3">
                    Delivery fee <span style={{ marginLeft: '178px' }}>₦{deliveryFee.toFixed(2)}</span>
                  </small>
                </p>
                <h6 className="pt-4">
                  <b>Total <span style={{ marginLeft: '210px' }}>₦{totalAmount}</span></b>
                </h6>
              </div>
            </div>
          )}
        </div>
      ))}

      {orderSuccess && (
        <div className="alert alert-success m-4" role="alert">
          {orderSuccess}
        </div>
      )}
      {orderError && (
        <div className="alert alert-danger m-4" role="alert">
          {orderError}
        </div>
      )}

      <div className="container">
        <div className="row">
          <div className="col-sm-5 my-5">
            <h6 className="fw-bold">SHIPPING ADDRESS</h6>
            {addressSuccess && (
              <div className="alert alert-success mt-3" role="alert">
                {addressSuccess}
              </div>
            )}
            <div className="form">
              <div className="mb-2 mt-3">
                <label htmlFor="fullName" className="form-label" style={{ fontSize: '12px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control border-danger"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Joe Jamie"
                />
                {formErrors.fullName && <small className="text-danger">{formErrors.fullName}</small>}
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="companyName" className="form-label" style={{ fontSize: '12px' }}>
                  Company name (optional)
                </label>
                <input
                  type="text"
                  className="form-control border-danger"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Joe Ltd"
                />
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="country" className="form-label" style={{ fontSize: '12px' }}>
                  Country / Region
                </label>
                <input
                  type="text"
                  className="form-control border-danger"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Nigeria"
                />
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="townCity" className="form-label" style={{ fontSize: '12px' }}>
                  Town / City
                </label>
                <input
                  type="text"
                  className="form-control border-danger"
                  id="townCity"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  placeholder="Lagos"
                />
                {formErrors.townCity && <small className="text-danger">{formErrors.townCity}</small>}
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="state" className="form-label" style={{ fontSize: '12px' }}>
                  State
                </label>
                <input
                  type="text"
                  className="form-control border-danger"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Lagos"
                />
                {formErrors.state && <small className="text-danger">{formErrors.state}</small>}
              </div>

              <div className="mb-2 mt-3">
                <label htmlFor="phone" className="form-label" style={{ fontSize: '12px' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control border-danger"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
                {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label" style={{ fontSize: '12px' }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control border-danger"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Joe@gmail.com"
                />
                {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
              </div>

              <div className="d-grid mt-5">
                <button className="btn btn-danger" type="button" onClick={handleSubmitAddress} disabled={loading}>
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-2"></div>

          <div className="col-sm-5 my-5">
            <h6 className="fw-bold mb-5">CHECKOUT</h6>
            <div className="container border" style={{ backgroundColor: '#FFF8F8' }}>
              <div className="form-check mt-3">
                <input
                  className="form-check-input mt-2"
                  type="radio"
                  name="paymentMethod"
                  id="bankTransfer"
                  value="bankTransfer"
                  checked={formData.paymentMethod === 'bankTransfer'}
                  onChange={handlePaymentChange}
                  style={{ borderColor: '#BD3A3A' }}
                />
                <label className="form-check-label mb-3 display-7" style={{ fontSize: '13px' }} htmlFor="bankTransfer">
                  Direct Bank Transfer
                </label>
                <div className="ms-2 ps-2">
                  <p className="p-2" style={{ backgroundColor: '#FFFFFF', fontSize: '10px' }}>
                    Make your payment directly into our bank account. <br />
                    Please use your Order ID as the payment reference. <br />
                    Your order will not be shipped until the funds have cleared in our account.
                  </p>
                </div>
              </div>

              <div className="form-check mt-5">
                <input
                  className="form-check-input mt-4"
                  type="radio"
                  name="paymentMethod"
                  id="securedPayment"
                  value="securedPayment"
                  checked={formData.paymentMethod === 'securedPayment'}
                  onChange={handlePaymentChange}
                  style={{ borderColor: '#BD3A3A' }}
                />
                <label className="form-check-label mb-3 display-7" style={{ fontSize: '13px' }} htmlFor="securedPayment">
                  Secured Online Payment{' '}
                  <span className="ms-3">
                    <img
                      src={Pay}
                      style={{ width: '200px' }}
                      className="img-fluid"
                      alt="Payment Methods"
                      onError={(e) => {
                        console.error('Payment image failed to load:', e.target.src);
                        e.target.src = defaultPaymentImage;
                      }}
                    />
                  </span>
                </label>
                <div>
                  <p className="pt-5 pb-3" style={{ fontSize: '10px' }}>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                  </p>
                </div>
              </div>
              {formErrors.paymentMethod && <small className="text-danger">{formErrors.paymentMethod}</small>}
            </div>

            <div className="d-grid mt-5">
              {formData.paymentMethod === 'securedPayment' && formData.email && totalAmount > 0 && publicKey ? (
                <PaystackButton
                  className="btn btn-danger"
                  text="Place order"
                  {...paystackConfig}
                  onSuccess={handlePaystackSuccess}
                  onClose={handlePaystackClose}
                  disabled={loading}
                />
              ) : formData.paymentMethod === 'securedPayment' ? (
                <button className="btn btn-danger disabled" disabled>
                  {publicKey ? 'Fill email and ensure cart is not empty' : 'Paystack configuration missing'}
                </button>
              ) : (
                <button className="btn btn-danger" type="button" onClick={handlePlaceOrder} disabled={loading}>
                  Place order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



