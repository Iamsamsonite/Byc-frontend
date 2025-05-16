 // C:/Users/HP/Desktop/desktop/bycfrontend/src/pages/Account.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    console.log('Account.jsx auth state:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit triggered', { isSignUp, email, password, name });

    if (isSignUp) {
      if (!name.trim()) return toast.error('Name is required');
      if (name.trim().length < 3) return toast.error('Name must be at least 3 characters');
    }
    if (!email.trim()) return toast.error('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return toast.error('Invalid email format');
    if (!password.trim()) return toast.error('Password is required');
    if (password.trim().length < 6) return toast.error('Password must be at least 6 characters');

    const endpoint = isSignUp
      ? 'http://localhost:4000/api/byc/auth/register'
      : 'http://localhost:4000/api/byc/auth/login';

    const payload = isSignUp
      ? { emailAddress: email.trim(), password: password.trim(), name: name.trim() }
      : { emailAddress: email.trim(), password: password.trim() };

    console.log('API:', endpoint);
    console.log('Payload:', payload);

    try {
      const response = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response:', response.data);

      const { token, user: userData } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        const userInfo = { id: userData.id, email: userData.email, name: userData.name, role: userData.role || 'user' };
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
        toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
        setTimeout(() => {
          navigate(userInfo.role === 'admin' ? '/admin/dashboard' : '/');
        }, 2000);
      } else {
        console.error('No token in response:', response.data);
        toast.error(isSignUp ? 'Signup failed: No token received' : 'Login failed: No token received');
      }
    } catch (error) {
      console.error('Submit error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      console.log('Toast error triggered:', message);
      toast.error(message, { duration: 4000 });
    }
  };

  const handleLogout = () => {
    try {
      console.log('Logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/account');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="container border rounded mt-5" style={{ maxWidth: '800px' }}>
      <div className="row">
        <div className="col-sm-6 my-5">
          <div className="form p-5 border-end">
            {user ? (
              <>
                <h4 className="fw-bold text-center text-danger">Welcome</h4>
                <p className="text-center mt-4" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Hi, {user.name}!
                </p>
                <p className="text-center" style={{ fontSize: '14px', color: '#555' }}>
                  {user.role === 'admin' ? 'You’re logged in as an admin.' : 'Welcome to your account!'}
                </p>
                <div className="d-grid mt-4">
                  <button
                    className="btn btn-danger fw-bold"
                    style={{ fontSize: '12px' }}
                    type="button"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                </div>
                <div className="d-grid mt-2">
                  <button
                    className="btn btn-outline-danger fw-bold"
                    style={{ fontSize: '12px' }}
                    type="button"
                    onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/profile')}
                  >
                    {user.role === 'admin' ? 'ADMIN DASHBOARD' : 'VIEW PROFILE'}
                  </button>
                </div>
              </>
            ) : (
              <>
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
                        required
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
                      required
                      autoComplete="email"
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
                      required
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
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
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setEmail('');
                      setPassword('');
                      setName('');
                    }}
                  >
                    {isSignUp ? 'Login' : 'Sign Up'}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="col-sm-6 my-5 d-flex align-items-center justify-content-center flex-column">
          {user ? (
            <>
              <h4 className="fw-bold text-center mb-3 text-danger">Your Account</h4>
              <p className="text-center" style={{ fontSize: '14px', maxWidth: '300px', color: '#555' }}>
                Welcome back, {user.name}! Manage your account or explore our services.
              </p>
              <div className="d-grid mt-3">
                <button
                  className="btn btn-danger fw-bold"
                  style={{ fontSize: '12px' }}
                  type="button"
                  onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/')}
                >
                  {user.role === 'admin' ? 'GO TO ADMIN DASHBOARD' : 'GO TO HOME'}
                </button>
              </div>
            </>
          ) : (
            <>
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
                    onClick={() => {
                      setIsSignUp(true);
                      setEmail('');
                      setPassword('');
                      setName('');
                    }}
                  >
                    CREATE AN ACCOUNT VIA E-MAIL
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;