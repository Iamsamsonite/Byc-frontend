 // C:/Users/HP/Desktop/desktop/bycfrontend/src/context/WishlistContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ items: [] });
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:4000/api/byc/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || { items: [] };
        setWishlist(data);
        setWishlistCount(data.items?.length || 0);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        toast.error('Failed to load wishlist');
      }
    };
    fetchWishlist();
  }, []);

  const isInWishlist = (itemId) => {
    return wishlist.items?.some((item) => (item.id || item._id) === itemId) || false;
  };

  const addToWishlist = async (item) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to add to wishlist');
        return;
      }
      const res = await axios.post(
        'http://localhost:4000/api/byc/wishlist',
        { productId: item._id || item.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data || { items: [] };
      setWishlist(data);
      setWishlistCount(data.items?.length || 0);
      toast.success(`${item.name || 'Item'} added to wishlist`);
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to remove from wishlist');
        return;
      }
      const res = await axios.delete(`http://localhost:4000/api/byc/wishlist/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data || { items: [] };
      setWishlist(data);
      setWishlistCount(data.items?.length || 0);
      toast.success('Item removed from wishlist');
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      toast.error('Failed to remove from wishlist');
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