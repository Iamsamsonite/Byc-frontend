// 

import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/byc/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

//   const handleSubmit = async (event) => {
//     if (event) event.preventDefault();
//     console.log('handleSubmit triggered');

//     const api = isSignUp
//       ? 'http://localhost:4000/api/byc/users'
//       : 'http://localhost:4000/api/byc/auth';

//     const payload = isSignUp
//       ? { emailAddress: email, password, name }
//       : { emailAddress: email, password };

//     console.log('API:', api);
//     console.log('Payload:', payload);

//     try {
//       const res = await axios.post(api, payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log('Full response:', res);

//       const data = res.data;
//       console.log('Response data:', data);

//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         setUser(data.user);
//         toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
//         await fetchUserData();
//         navigate('/');
//       } else {
//         toast.error(data.message || 'Unexpected response from server.');
//       }
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
//       toast.error(
//         error.response?.data?.message || 'An error occurred. Please try again.'
//       );
//     }
//   };

 
  
// const handleSubmit = async (event) => {
//     if (event) event.preventDefault();
//     console.log('handleSubmit triggered');
  
//     const api = isSignUp
//       ? 'http://localhost:4000/api/byc/users'
//       : 'http://localhost:4000/api/byc/auth';
  
//     const payload = isSignUp
//       ? { emailAddress: email, password, name }
//       : { emailAddress: email, password };
  
//     console.log('API:', api);
//     console.log('Payload:', payload);
  
//     try {
//       const res = await axios.post(api, payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log('Full response:', res);
//       const data = res.data;
//       console.log('Response data:', data);
  
//       if (data) {
//         // `data` is the token string itself
//         localStorage.setItem('token', data);
//         toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
//         await fetchUserData(); // This will fetch the user using the token
//         setTimeout(() => navigate('/'), 1000);
//       } else {
//         console.error('No token found in response');
//         toast.error('Login failed: No token received');
//       }
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
//       toast.error(
//         error.response?.data?.message || 'An error occurred. Please try again.'
//       );
//     }
//   };

// const handleSubmit = async (event) => {
//     if (event) event.preventDefault();
//     console.log('handleSubmit triggered');
  
//     if (isSignUp) {
//       if (!name || !email || !password) {
//         toast.error('Please fill in all fields');
//         return;
//       }
//     }
  
//     const api = isSignUp
//       ? 'http://localhost:4000/api/byc/users'
//       : 'http://localhost:4000/api/byc/auth';
  
//     const payload = isSignUp
//       ? { emailAddress: email, password, name }
//       : { emailAddress: email, password };
  
//     console.log('API:', api);
//     console.log('Payload:', payload);
  
//     try {
//       const res = await axios.post(api, payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       console.log('Full response:', res);
//       const data = res.data;
//       console.log('Response data:', data);
  
       
//       const token = isSignUp ? res.headers['x-auth-token'] : data;
      
//       if (token) {
//         localStorage.setItem('token', token);
//         toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
//         await fetchUserData();
//         setTimeout(() => navigate('/'), 1000);
//       } else {
//         console.error('No token found in response');
//         toast.error(isSignUp ? 'Signup failed: No token received' : 'Login failed: No token received');
//       }
//     }
//     catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
//       toast.error(
//         error.response?.data?.message || 'An error occurred. Please try again.'
//       );
//     }    
//   }; // Add missing closing brace for handleSubmit function


// const handleSubmit = async (event) => {
//     if (event) event.preventDefault();
//     console.log('handleSubmit triggered');
  
//     const api = isSignUp
//       ? 'http://localhost:4000/api/byc/users'
//       : 'http://localhost:4000/api/byc/auth';
  
//     const payload = isSignUp
//       ? { emailAddress: email, password, name }
//       : { emailAddress: email, password };
  
//     console.log('API:', api);
//     console.log('Payload:', payload);
  
//     try {
//       const res = await axios.post(api, payload, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       console.log('Full response:', res);
  
//       const data = res.data;
//       const token = isSignUp ? res.headers['x-auth-token'] : data;
  
//       if (token) {
//         localStorage.setItem('token', token);
//         toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
//         await fetchUserData();
//         setTimeout(() => navigate('/'), 1000);
//       } else {
//         console.error('No token found in response');
//         toast.error(isSignUp ? 'Signup failed: No token received' : 'Login failed: No token received');
//       }
//     } catch (error) {
//       console.error('Submit error:', error.response?.data || error.message);
//       toast.error(
//         error.response?.data || 'An error occurred. Please try again.'
//       );
//     }
//   };
  

const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    console.log('handleSubmit triggered');
  
    const api = isSignUp
      ? 'http://localhost:4000/api/byc/users'
      : 'http://localhost:4000/api/byc/auth';
  
    const payload = isSignUp
      ? { emailAddress: email.trim(), password: password.trim(), name: name.trim() }
      : { emailAddress: email.trim(), password: password.trim() };
  
    console.log('API:', api);
    console.log('Payload:', payload);
  
    // Optional: Frontend validation before sending
    if (isSignUp) {
      if (name.trim().length < 5) return toast.error("Name must be at least 5 characters");
      if (password.trim().length < 5) return toast.error("Password must be at least 5 characters");
    }
  
    try {
      const res = await axios.post(api, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Full response:', res);
  
      const data = res.data;
      console.log('Response data:', data);
  
      // Handle signup and login token responses
      const token = typeof data === 'string' ? data : data.token;
      if (token) {
        localStorage.setItem('token', token);
        toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
        await fetchUserData();
        setTimeout(() => navigate('/'), 1000);
      } else {
        console.error('No token found in response');
        toast.error(isSignUp ? 'Signup failed: No token received' : 'Login failed: No token received');
      }
    } catch (error) {
      console.error('Submit error:', error.response?.data || error.message);
      toast.error(
        error.response?.data || 'An error occurred. Please try again.'
      );
    }
  };
  
  
  return (
        <div className="container border rounded mt-5">
      <div className="row">
        <div className="col-sm-6 my-5">
          <div className="form p-5 border-end">
            <h6 className="fw-bold text-center">{isSignUp ? 'Sign Up' : 'Login'}</h6>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-3 mt-3">
                  <label className="form-label" style={{ fontSize: '12px' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-danger"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-3 mt-3">
                <label className="form-label" style={{ fontSize: '12px' }}>
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control border-danger"
                  placeholder="Joe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3 mt-3">
                <label className="form-label" style={{ fontSize: '12px' }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border-danger"
                  placeholder="Joelove1@"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-grid mt-5">
                <button
                  className="btn btn-danger fw-bold"
                  style={{ fontSize: '12px' }}
                  type="submit"
                >
                  {isSignUp ? 'SIGN UP' : 'LOGIN'}
                </button>
              </div>
            </form>

            <p className="text-center mt-3" style={{ fontSize: '12px' }}>
              {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
              <span
                style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>

        <div className="col-sm-6 my-5 d-flex align-items-center justify-content-center flex-column">
          <h6 className="fw-bold text-center mb-3">Create your account</h6>
          <p className="text-center" style={{ fontSize: '12px', maxWidth: '300px' }}>
            Create your customer account in just a few clicks! You can register using your e-mail address.
          </p>
          {!isSignUp && (
            <div className="d-grid mt-3">
              <button
                className="btn btn-danger fw-bold"
                style={{ fontSize: '12px' }}
                type="button"
                onClick={() => setIsSignUp(true)}
              >
                CREATE AN ACCOUNT VIA E-MAIL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
