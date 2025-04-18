import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Footer from './pages/Footer'
import Blog from './pages/Blog'
import Blogtwo from './pages/Blogtwo'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Macbook from './pages/Macbook'
import Mac from './pages/Mac'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Carttwo from './pages/Carttwo'
import Checkout from './pages/Checkout'
import Account from './pages/Account'






const Display = () => {
  return (
    <>
    <BrowserRouter>
     <Navbar />
      
     <Routes>
      <Route index element={<Home />} />
      <Route path="Blog" element={<Blog />} />
      <Route path="Blogtwo" element={<Blogtwo />} />
      <Route path="About" element={<About />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Product" element={<Product />} />
      <Route path="Macbook" element={<Macbook />} />
      <Route path="Mac" element={<Mac />} />
      <Route path="Wishlist" element={<Wishlist />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="Carttwo" element={<Carttwo />} />
      <Route path="Checkout" element={<Checkout />} />
      <Route path="Account" element={<Account />} />

      
      </Routes>
      <Footer/>
     </BrowserRouter>

      
    </>
  )
}

export default Display
