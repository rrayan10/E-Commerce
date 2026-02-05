 import { Link, useNavigate } from 'react-router-dom';
 import { Minus, Plus, X, ShoppingBag, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { useCart } from '@/contexts/CartContext';
 import { useAuth } from '@/contexts/AuthContext';
 
 export default function Cart() {
   const navigate = useNavigate();
   const { items, updateQuantity, removeItem, getSubtotal, getItemCount, isLoading } = useCart();
   const { user } = useAuth();
 
   const subtotal = getSubtotal();
   const shipping = subtotal > 200 ? 0 : 15;
   const total = subtotal + shipping;
 
   if (!user) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
             <ShoppingBag className="h-8 w-8 text-muted-foreground" />
           </div>
           <h1 className="font-display text-2xl lg:text-3xl mb-4">Please Sign In</h1>
           <p className="text-muted-foreground mb-8">Sign in to view your cart.</p>
           <Button asChild>
             <Link to="/login">Sign In</Link>
           </Button>
         </div>
       </Layout>
     );
   }
 
   if (items.length === 0) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
             <ShoppingBag className="h-8 w-8 text-muted-foreground" />
           </div>
           <h1 className="font-display text-2xl lg:text-3xl mb-4">Your Cart is Empty</h1>
           <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
           <Button asChild>
             <Link to="/products">Start Shopping</Link>
           </Button>
         </div>
       </Layout>
     );
   }
 
   return (
     <Layout>
       <div className="container py-8 lg:py-12">
         <h1 className="font-display text-3xl lg:text-4xl mb-8">
           Shopping Cart ({getItemCount()})
         </h1>
 
         <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
           {/* Cart Items */}
           <div className="lg:col-span-2 space-y-6">
             {items.map((item) => (
               <div
                 key={item._id}
                 className="flex gap-4 pb-6 border-b border-border"
               >
                 <Link
                   to={`/products/${item.product.slug}`}
                   className="w-24 sm:w-32 aspect-[3/4] shrink-0 bg-secondary overflow-hidden"
                 >
                   <img
                     src={item.product.imageCover}
                     alt={item.product.title}
                     className="h-full w-full object-cover"
                   />
                 </Link>
 
                 <div className="flex-1 flex flex-col">
                   <div className="flex justify-between gap-4">
                     <div>
                       <Link
                         to={`/products/${item.product.slug}`}
                         className="font-medium hover:underline"
                       >
                         {item.product.title}
                       </Link>
                       <p className="text-sm text-muted-foreground mt-1">
                         {item.product.brand?.name}
                       </p>
                     </div>
                     <button
                       onClick={() => removeItem(item.product._id)}
                       className="text-muted-foreground hover:text-foreground h-fit"
                       aria-label="Remove item"
                       disabled={isLoading}
                     >
                       <X className="h-5 w-5" />
                     </button>
                   </div>
 
                   <div className="mt-auto flex items-center justify-between pt-4">
                     <div className="flex items-center border border-border">
                       <button
                         onClick={() => updateQuantity(item.product._id, item.count - 1)}
                         className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                         disabled={isLoading}
                       >
                         <Minus className="h-3 w-3" />
                       </button>
                       <span className="w-10 text-center text-sm">{item.count}</span>
                       <button
                         onClick={() => updateQuantity(item.product._id, item.count + 1)}
                         className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                         disabled={isLoading}
                       >
                         <Plus className="h-3 w-3" />
                       </button>
                     </div>
                     <span className="font-medium">EGP {item.price * item.count}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
 
           {/* Order Summary */}
           <div className="lg:sticky lg:top-24 h-fit">
             <div className="bg-secondary/30 p-6 rounded-lg">
               <h2 className="font-display text-xl mb-6">Order Summary</h2>
 
               <div className="space-y-3 text-sm">
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Subtotal</span>
                   <span>EGP {subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-muted-foreground">Shipping</span>
                   <span>{shipping === 0 ? 'Free' : `EGP ${shipping.toFixed(2)}`}</span>
                 </div>
                 {shipping > 0 && (
                   <p className="text-xs text-muted-foreground">
                     Free shipping on orders over EGP 200
                   </p>
                 )}
               </div>
 
               <div className="border-t border-border mt-4 pt-4">
                 <div className="flex justify-between font-medium text-lg">
                   <span>Total</span>
                   <span>EGP {total.toFixed(2)}</span>
                 </div>
               </div>
 
               <Button className="w-full mt-6" size="lg" onClick={() => navigate('/checkout')} disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 Proceed to Checkout
               </Button>
 
               <Button variant="outline" className="w-full mt-3" asChild>
                 <Link to="/products">Continue Shopping</Link>
               </Button>
             </div>
           </div>
         </div>
       </div>
     </Layout>
   );
 }
