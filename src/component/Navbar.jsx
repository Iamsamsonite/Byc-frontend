 // C:/Users/HP/Desktop/desktop/bycfrontend/src/components/Navbar.js
import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { UserContext } from '../context/UserContext'; // Use UserContext
import { BYC } from '../asset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const { isAuthenticated, user, logout } = useContext(UserContext); // Update to UserContext
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    
    console.log('Navbar rendered:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const toggleSearch = (e) => {
    e.preventDefault();
    setShowSearch(!showSearch);
    if (showSearch) setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const location = useLocation();
  const path = location.pathname;
  const darkBgPage = ['/wishlist'];
  const isDarkBg = darkBgPage.includes(path);

  const toggleSubMenu = (menuKey, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  return (
    <nav className={`navbar py-3 navbar-expand-lg ${isDarkBg ? 'navbar-dark bg-dark text-white' : 'navbar-light bg-light text-dark'}`}>
      <div className="container-fluid position-relative">
        <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
          <Link className="navbar-brand" to="/">
            <img src={BYC} alt="Logo" style={{ height: '50px' }} />
          </Link>
        </div>
        <Link className="navbar-brand d-lg-none" to="/">
          <img src={BYC} alt="Logo" style={{ height: '40px' }} />
        </Link>
        <button
          className="navbar-toggler ms-auto d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="d-none d-lg-flex w-100 justify-content-between align-items-center">
            <ul className="navbar-nav">
              <li className="nav-item dropdown me-3 position-static">
                <span
                  className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`}
                  role="button"
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                  onClick={(e) => toggleSubMenu('shopDropdown', e)}
                >
                  Shop Products <i className="bi bi-chevron-down ms-1"></i>
                </span>
                <ul
                  className={`dropdown-menu w-100 ${openMenus['shopDropdown'] ? 'show' : ''}`}
                  style={{ left: 0, right: 0, borderRadius: 0 }}
                >
                  <li>
                    <div className="container">
                      <Link className="dropdown-item py-2 border-bottom" to="/allproducts">
                        ALL PRODUCTS
                      </Link>
                    </div>
                  </li>
                  <li className="w-100">
                    <div className="bg-danger py-2 px-3 d-flex justify-content-around">
                      <Link
                        to="/products?category=Children"
                        className="text-white fw-bold text-decoration-none"
                      >
                        CHILDREN
                      </Link>
                      <Link
                        to="/products?category=Men"
                        className="text-white fw-bold text-decoration-none"
                      >
                        MEN
                      </Link>
                      <Link
                        to="/products?category=Women"
                        className="text-white fw-bold text-decoration-none"
                      >
                        WOMEN
                      </Link>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item me-3">
                <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/faq">
                  FAQ
                </Link>
              </li>
              {isAuthenticated && user?.role === 'admin' && (
                <li className="nav-item me-3">
                  <NavLink className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/admin/dashboard">
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item me-1">
                <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item ">
                <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item ">
                {!showSearch ? (
                  <span className="nav-link" onClick={toggleSearch}>
                    <i className="bi bi-search"></i>
                  </span>
                ) : (
                  <form className="search-container d-flex" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="btn btn-sm btn-link">
                      <i className="bi bi-search"></i>
                    </button>
                    <button type="button" className="btn btn-sm btn-link" onClick={toggleSearch}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </form>
                )}
              </li>
              <li className="nav-item me-1 dropdown">
                {isAuthenticated ? (
                  <>
                    <span
                      className={`nav-link dropdown-toggle ${isDarkBg ? 'text-white' : 'text-dark'}`}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-1 text-danger" />
                      Hi, {user?.name || 'User'}
                    </span>
                    <ul className="dropdown-menu">
                      {user?.role !== 'admin' && (
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>
                        </li>
                      )}
                      <li>
                        <button className="dropdown-item text-danger" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} to="/account">
                    <FontAwesomeIcon icon={faUser} className="me-1 text-danger" />
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="/wishlist">
                  <i className="bi bi-heart"></i>
                  {wishlistCount > 0 && (
                    <span
                      className="badge bg-danger rounded-pill"
                      style={{ fontSize: '10px', marginLeft: '5px' }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="/carttwo">
                  <i className="bi bi-cart"></i>
                  {cartCount > 0 && (
                    <span
                      className="badge bg-primary rounded-pill"
                      style={{ fontSize: '10px', marginLeft: '5px' }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-lg-none mt-3">
            <ul className="navbar-nav">
              <li>
                <Link className="nav-link" to="/products">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/products?category=Children">
                  Children
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/products?category=Men">
                  Men
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/products?category=Women">
                  Women
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/faq">
                  FAQ
                </Link>
              </li>
              {isAuthenticated && user?.role === 'admin' && (
                <li>
                  <NavLink className="nav-link" to="/admin/dashboard">
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                {!showSearch ? (
                  <span className="nav-link" onClick={(e) => toggleSearch(e)}>
                    <i className="bi bi-search"></i> Search
                  </span>
                ) : (
                  <form className="d-flex align-items-center px-2 py-2" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button type="submit" className="btn btn-sm btn-link">
                      <i className="bi bi-search"></i>
                    </button>
                    <button type="button" className="btn btn-sm btn-link" onClick={(e) => toggleSearch(e)}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </form>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <div className="dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-1 text-danger" />
                      Hi, {user?.name || 'User'}
                    </span>
                    <ul className="dropdown-menu">
                      {user?.role !== 'admin' && (
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>
                        </li>
                      )}
                      <li>
                        <button className="dropdown-item text-danger" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link className="nav-link" to="/account">
                    <FontAwesomeIcon icon={faUser} className="me-1 text-danger" />
                    Login
                  </Link>
                )}
              </li>
              <li>
                <Link className="nav-link" to="/wishlist">
                  <i className="bi bi-heart"></i> Wishlist
                  {wishlistCount > 0 && (
                    <span
                      className="badge bg-danger rounded-pill"
                      style={{ fontSize: '10px', marginLeft: '5px' }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/carttwo">
                  <i className="bi bi-cart"></i> Cart
                  {cartCount > 0 && (
                    <span
                      className="badge bg-primary rounded-pill"
                      style={{ fontSize: '10px', marginLeft: '5px' }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;