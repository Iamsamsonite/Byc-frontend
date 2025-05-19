import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Switch to react-toastify
import { UserContext } from './UserContext'; // Import UserContext

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(UserContext); // Use UserContext
  const [wishlist, setWishlist] = useState({ items: [] });
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (authLoading) {
        console.log('WishlistContext: Auth still loading, skipping fetch');
        return;
      }
      if (!isAuthenticated) {
        console.log('WishlistContext: User not authenticated, clearing wishlist');
        setWishlist({ items: [] });
        setWishlistCount(0);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('WishlistContext: No token found, skipping fetch');
          setWishlist({ items: [] });
          setWishlistCount(0);
          return;
        }
        const res = await axios.get('https://byc-backend-hkgk.onrender.com/api/byc/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
        const data = res.data || { items: [] };
        console.log('WishlistContext: Fetched wishlist:', data);
        setWishlist(data);
        setWishlistCount(data.items?.length || 0);
      } catch (err) {
        console.error('WishlistContext: Error fetching wishlist:', err.response?.data || err.message);
        const message = err.response?.data?.message || 'Failed to load wishlist';
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired, please log in again', { autoClose: 4000 });
        } else {
          toast.error(message, { autoClose: 4000 });
        }
      }
    };
    fetchWishlist();
  }, [isAuthenticated, authLoading]); // Depend on isAuthenticated and authLoading

  const isInWishlist = (itemId) => {
    return wishlist.items?.some((item) => (item.product?._id || item._id) === itemId) || false;
  };

  const addToWishlist = async (product) => {
    if (authLoading) {
      console.log('WishlistContext: Auth still loading, cannot add to wishlist');
      toast.warn('Verifying session, please wait...', { autoClose: 4000 });
      return;
    }
    if (!isAuthenticated) {
      console.log('WishlistContext: User not authenticated, prompting login');
      toast.error('Please log in to add to wishlist', { autoClose: 4000 });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('WishlistContext: No token, prompting login');
        toast.error('Please log in to add to wishlist', { autoClose: 4000 });
        return;
      }

      const productId = product._id || product.id;
      const productName = product.productName || 'Item';
      if (!productId || typeof productId !== 'string' || productId.trim() === '') {
        console.error('WishlistContext: Invalid productId:', product);
        toast.error('Invalid product ID', { autoClose: 4000 });
        return;
      }

      console.log('WishlistContext: Adding to wishlist:', { productId });
      const res = await axios.post(
        'https://byc-backend-hkgk.onrender.com/api/byc/wishlist',
        { productId },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 }
      );
      const data = res.data || { items: [] };
      console.log('WishlistContext: Add response:', data);
      setWishlist(data);
      setWishlistCount(data.items?.length || 0);
      toast.success(`${productName} added to wishlist`, { autoClose: 4000 });
    } catch (err) {
      console.error('WishlistContext: Error adding to wishlist:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.data?.message.includes('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expired, please log in again', { autoClose: 4000 });
      } else if (err.response?.status === 500) {
        toast.error('Server error, please try again later', { autoClose: 4000 });
      } else {
        toast.error(err.response?.data?.message || 'Failed to add to wishlist', { autoClose: 4000 });
      }
    }
  };

  const removeFromWishlist = async (itemId) => {
    if (authLoading) {
      console.log('WishlistContext: Auth still loading, cannot remove from wishlist');
      toast.warn('Verifying session, please wait...', { autoClose: 4000 });
      return;
    }
    if (!isAuthenticated) {
      console.log('WishlistContext: User not authenticated, prompting login');
      toast.error('Please log in to remove from wishlist', { autoClose: 4000 });
      return;
    }

    try {
      if (!itemId) {
        console.error('WishlistContext: Invalid itemId:', itemId);
        toast.error('Invalid product ID', { autoClose: 4000 });
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('WishlistContext: No token, prompting login');
        toast.error('Please log in to remove from wishlist', { autoClose: 4000 });
        return;
      }
      console.log('WishlistContext: Removing from wishlist:', itemId);
      const res = await axios.delete(`https://byc-backend-hkgk.onrender.com/api/byc/wishlist/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
      });
      const data = res.data || { items: [] };
      console.log('WishlistContext: Remove response:', data);
      setWishlist(data);
      setWishlistCount(data.items?.length || 0);
      toast.success('Item removed from wishlist', { autoClose: 4000 });
    } catch (err) {
      console.error('WishlistContext: Error removing from wishlist:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.data?.message.includes('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expired, please log in again', { autoClose: 4000 });
      } else {
        toast.error(err.response?.data?.message || 'Failed to remove from wishlist', { autoClose: 4000 });
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, wishlistCount, isInWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};