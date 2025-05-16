 // C:/Users/HP/Desktop/desktop/bycfrontend/src/Display.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Blog from './pages/Blog';
import Blogtwo from './pages/Blogtwo';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Macbook from './pages/Macbook';
import Mac from './pages/Mac';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import Carttwo from './pages/Carttwo';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import { Toaster } from 'react-hot-toast';
import { RecentViewsProvider } from './context/RecentViewsContext';
import { WishlistProvider } from './context/WishlistContext';
// import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UserProvider, UserContext } from './context/UserContext';
import Sing from './component/Sing';
import OrderConfirmation from './component/OrderConfirmation';
import AdminSidebar from './component/AdminSidebar';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Categories from './pages/admin/Categories';
import Blogs from './pages/admin/AdminBlogs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './pages/SearchResult';
import ProtectedRoute from './component/ProtectRoute';

const AdminRoute = ({ children }) => {
  const { user } = React.useContext(UserContext);
  console.log('AdminRoute user:', user);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/account" />;
  }
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">{children}</div>
    </div>
  );
};

const Display = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          {/* <AuthProvider> */}
            <RecentViewsProvider>
              <WishlistProvider>
                <Navbar />
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/allproducts" element={<Product />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<Blogtwo />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/macbook" element={<Macbook />} />
                  <Route path="/products" element={<Mac />} />
                  <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/carttwo" element={<Carttwo />} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                  <Route path="/sing" element={<Sing />} />
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route
                    path="/admin/dashboard"
                    element={<AdminRoute><Dashboard /></AdminRoute>}
                  />
                  <Route
                    path="/admin/products"
                    element={<AdminRoute><Products /></AdminRoute>}
                  />
                  <Route
                    path="/admin/orders"
                    element={<AdminRoute><Orders /></AdminRoute>}
                  />
                  <Route
                    path="/admin/users"
                    element={<AdminRoute><Users /></AdminRoute>}
                  />
                  <Route
                    path="/admin/categories"
                    element={<AdminRoute><Categories /></AdminRoute>}
                  />
                  <Route
                    path="/admin/blogs"
                    element={<AdminRoute><Blogs /></AdminRoute>}
                  />
                  <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
                <Footer />
              </WishlistProvider>
            </RecentViewsProvider>
          {/* </AuthProvider> */}
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default Display;