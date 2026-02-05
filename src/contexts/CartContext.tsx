 import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
 import { cartAPI, APICartItem } from '@/services/api';
 
 interface CartContextType {
   items: APICartItem[];
   isLoading: boolean;
   cartId: string | null;
   addItem: (productId: string) => Promise<void>;
   removeItem: (productId: string) => Promise<void>;
   updateQuantity: (productId: string, quantity: number) => Promise<void>;
   clearCart: () => Promise<void>;
   getItemCount: () => number;
   getSubtotal: () => number;
   refreshCart: () => Promise<void>;
 }
 
 const CartContext = createContext<CartContextType | undefined>(undefined);
 
 export function CartProvider({ children }: { children: ReactNode }) {
   const [items, setItems] = useState<APICartItem[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [cartId, setCartId] = useState<string | null>(null);
   
   const isAuthenticated = () => !!localStorage.getItem('userToken');
 
   useEffect(() => {
     if (isAuthenticated()) {
       refreshCart();
     }
   }, []);
 
   const refreshCart = async () => {
     if (!isAuthenticated()) return;
     
     setIsLoading(true);
     try {
       const response = await cartAPI.get();
       setItems(response.data.products || []);
       setCartId(response.data._id || null);
     } catch (error) {
       setItems([]);
       setCartId(null);
     } finally {
       setIsLoading(false);
     }
   };
 
   const addItem = async (productId: string) => {
     if (!isAuthenticated()) {
       throw new Error('Please login to add items to cart');
     }
     
     setIsLoading(true);
     try {
       const response = await cartAPI.add(productId);
       setItems(response.data.products || []);
       setCartId(response.cartId);
     } finally {
       setIsLoading(false);
     }
   };
 
   const removeItem = async (productId: string) => {
     if (!isAuthenticated()) return;
     
     setIsLoading(true);
     try {
       const response = await cartAPI.remove(productId);
       setItems(response.data.products || []);
     } finally {
       setIsLoading(false);
     }
   };
 
   const updateQuantity = async (productId: string, quantity: number) => {
     if (!isAuthenticated()) return;
     
     if (quantity <= 0) {
       await removeItem(productId);
       return;
     }
     
     setIsLoading(true);
     try {
       const response = await cartAPI.updateQuantity(productId, quantity);
       setItems(response.data.products || []);
     } finally {
       setIsLoading(false);
     }
   };
 
   const clearCart = async () => {
     if (!isAuthenticated()) return;
     
     setIsLoading(true);
     try {
       await cartAPI.clear();
       setItems([]);
       setCartId(null);
     } finally {
       setIsLoading(false);
     }
   };
 
   const getItemCount = () => {
     return items.reduce((total, item) => total + item.count, 0);
   };
 
   const getSubtotal = () => {
     return items.reduce((total, item) => total + item.price * item.count, 0);
   };
 
   return (
     <CartContext.Provider value={{
       items,
       isLoading,
       cartId,
       addItem,
       removeItem,
       updateQuantity,
       clearCart,
       getItemCount,
       getSubtotal,
       refreshCart,
     }}>
       {children}
     </CartContext.Provider>
   );
 }
 
 export function useCart() {
   const context = useContext(CartContext);
   if (context === undefined) {
     throw new Error('useCart must be used within a CartProvider');
   }
   return context;
 }
