 import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
 import { wishlistAPI, APIProduct } from '@/services/api';

interface WishlistContextType {
   items: APIProduct[];
   wishlistIds: string[];
   isLoading: boolean;
   addItem: (productId: string) => Promise<void>;
   removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
   toggleItem: (productId: string) => Promise<void>;
   refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
   const [items, setItems] = useState<APIProduct[]>([]);
   const [wishlistIds, setWishlistIds] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   
   const isAuthenticated = () => !!localStorage.getItem('userToken');

  useEffect(() => {
     if (isAuthenticated()) {
       refreshWishlist();
    }
  }, []);

   const refreshWishlist = async () => {
     if (!isAuthenticated()) return;
     
     setIsLoading(true);
     try {
       const response = await wishlistAPI.get();
       setItems(response.data || []);
       setWishlistIds(response.data.map(p => p._id) || []);
     } catch (error) {
       setItems([]);
       setWishlistIds([]);
     } finally {
       setIsLoading(false);
     }
   };
 
   const addItem = async (productId: string) => {
     if (!isAuthenticated()) {
       throw new Error('Please login to add items to wishlist');
     }
     
     setIsLoading(true);
     try {
       const response = await wishlistAPI.add(productId);
       setWishlistIds(response.data || []);
       // Refresh to get full product data
       await refreshWishlist();
     } finally {
       setIsLoading(false);
     }
   };
 
   const removeItem = async (productId: string) => {
     if (!isAuthenticated()) return;
     
     setIsLoading(true);
     try {
       const response = await wishlistAPI.remove(productId);
       setWishlistIds(response.data || []);
       setItems(prev => prev.filter(item => item._id !== productId));
     } finally {
       setIsLoading(false);
     }
  };

  const isInWishlist = (productId: string) => {
     return wishlistIds.includes(productId);
  };

   const toggleItem = async (productId: string) => {
    if (isInWishlist(productId)) {
       await removeItem(productId);
    } else {
       await addItem(productId);
    }
  };

  return (
     <WishlistContext.Provider value={{
       items,
       wishlistIds,
       isLoading,
       addItem,
       removeItem,
       isInWishlist,
      toggleItem,
       refreshWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
