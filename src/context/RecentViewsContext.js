import { createContext, useState } from 'react';

export const RecentViewsContext = createContext();

export const RecentViewsProvider = ({ children }) => {
  const [recentViews, setRecentViews] = useState([]);

  const addToRecentViews = (product) => {
    setRecentViews((prev) => {
      const updatedViews = [product, ...prev.filter((p) => p.id !== product.id)];
      return updatedViews.slice(0, 10); // Limit to 10 items
    });
  };

  return (
    <RecentViewsContext.Provider value={{ recentViews, addToRecentViews }}>
      {children}
    </RecentViewsContext.Provider>
  );
};