import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BYC } from '../asset'

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)
  const toggleSearch = () => setShowSearch(!showSearch)

  const location = useLocation()
  const path = location.pathname
  const darkBgPage = ['/wishlist']
  const isDarkBg = darkBgPage.includes(path)

  const [openMenus, setOpenMenus] = useState({})

  const toggleSubMenu = (menuKey, e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenMenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }))
  }

  return (
    <>
      <nav className={`navbar py-3 navbar-expand-lg ${isDarkBg ? 'navbar-dark bg-dark text-white' : 'navbar-light bg-light text-dark'}`}>
        <div className="container-fluid position-relative">

          {/* Mobile logo (left) */}
          <a className="navbar-brand d-lg-none" href="/">
            <img src={BYC} alt="Logo" style={{ height: '40px' }} />
          </a>

          {/* Hamburger button (right on mobile) */}
          <button className="navbar-toggler ms-auto d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center logo (absolutely centered for desktop) */}
          <div className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
            <a className="navbar-brand" href="/">
              <img src={BYC} alt="Logo" style={{ height: '50px' }} />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Desktop layout */}
            <div className="d-none d-lg-flex w-100 justify-content-between align-items-center">
              {/* Left nav */}
              <ul className="navbar-nav">
                <li className="nav-item dropdown me-3">
                  <a href="#" className={`nav-link dropdown-toggle ${isDarkBg ? 'text-white' : 'text-dark'}`} role="button"
                    onClick={(e) => toggleSubMenu("shopDropdown", e)}>
                    Shop Products
                  </a>
                  <ul className={`dropdown-menu ${openMenus["shopDropdown"] ? "show" : ""}`}>
                    <li><a className="dropdown-item" href="product">ALL PRODUCTS</a></li>
                    <li className="dropdown-header text-white gap-5 d-flex py-2 bg-danger">
                      <a href="#" className="text-white fw-bold" onClick={(e) => toggleSubMenu('children', e)}>CHILDREN</a>
                      <a href="#" className="text-white fw-bold" onClick={(e) => toggleSubMenu('men', e)}>MEN</a>
                      <a href="#" className="text-white fw-bold" onClick={(e) => toggleSubMenu('women', e)}>WOMEN</a>
                    </li>
                    <li className={`dropdown-submenu ${openMenus["children"] ? "show" : ""}`}>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(e) => toggleSubMenu('male', e)}>Male</a></li>
                        <ul className={`dropdown-menu ${openMenus["male"] ? "show" : ""}`}>
                          <li className="dropdown-item">Boxers</li>
                          <li className="dropdown-item">Pants</li>
                          <li className="dropdown-item">T-shirts</li>
                          <li className="dropdown-item">Singlet</li>
                          <li className="dropdown-item">Towels</li>
                        </ul>
                        <li><a className="dropdown-item" href="#" onClick={(e) => toggleSubMenu('female', e)}>Female</a></li>
                        <ul className={`dropdown-menu ${openMenus["female"] ? "show" : ""}`}>
                          <li className="dropdown-item">Boxers</li>
                          <li className="dropdown-item">Pants</li>
                          <li className="dropdown-item">T-shirts</li>
                          <li className="dropdown-item">Singlet</li>
                          <li className="dropdown-item">Towels</li>
                        </ul>
                      </ul>
                    </li>
                    <li className={`dropdown-submenu ${openMenus["men"] ? "show" : ""}`}>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">Boxers</li>
                        <li className="dropdown-item">Pants</li>
                        <li className="dropdown-item">T-shirts</li>
                        <li className="dropdown-item">Singlet</li>
                        <li className="dropdown-item">Towels</li>
                      </ul>
                    </li>
                    <li className={`dropdown-submenu ${openMenus["women"] ? "show" : ""}`}>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">Boxers</li>
                        <li className="dropdown-item">Pants</li>
                        <li className="dropdown-item">T-shirts</li>
                        <li className="dropdown-item">Singlet</li>
                        <li className="dropdown-item">Towels</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="nav-item me-3">
                  <a className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} href="blog">Blog</a>
                </li>
                <li className="nav-item me-3">
                  <a className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} href="#">FAQ</a>
                </li>
              </ul>

              {/* Right nav */}
              <ul className="navbar-nav d-flex align-items-center">
                <li className="nav-item me-3">
                  <a className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} href="About">About Us</a>
                </li>
                <li className="nav-item me-3">
                  <a className={`nav-link ${isDarkBg ? 'text-white' : 'text-dark'}`} href="Contact">Contact</a>
                </li>
                <li className="nav-item me-3">
                  {!showSearch && (
                    <a className="nav-link" href="#" onClick={toggleSearch}><i className="bi bi-search"></i></a>
                  )}
                </li>
                <li className="nav-item me-3"><a className="nav-link" href="Account"><i className="bi bi-person"></i></a></li>
                <li className="nav-item me-3"><a className="nav-link" href="wishlist"><i className="bi bi-heart"></i></a></li>
                <li className="nav-item me-3"><a className="nav-link" href="cart"><i className="bi bi-cart"></i></a></li>
              </ul>
            </div>

            {/* Mobile menu inside collapse */}
            <div className="d-lg-none mt-3">
              <ul className="navbar-nav">
                <li><a className="nav-link" href="product">Shop</a></li>
                <li><a className="nav-link" href="blog">Blog</a></li>
                <li><a className="nav-link" href="#">FAQ</a></li>
                <li><a className="nav-link" href="About">About Us</a></li>
                <li><a className="nav-link" href="Contact">Contact</a></li>
                <li><a className="nav-link" href="#" onClick={toggleSearch}><i className="bi bi-search"></i> Search</a></li>
                <li><a className="nav-link" href="Account"><i className="bi bi-person"></i> Account</a></li>
                <li><a className="nav-link" href="Wishlist"><i className="bi bi-heart"></i> Wishlist</a></li>
                <li><a className="nav-link" href="cart"><i className="bi bi-cart"></i> Cart</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

