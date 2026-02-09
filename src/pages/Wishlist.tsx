 import { Link } from 'react-router-dom';
 import { Heart, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { useWishlist } from '@/contexts/WishlistContext';
 import { useAuth } from '@/contexts/AuthContext';
 import { APIProductCard } from '@/components/product/APIProductCard';
 
 export default function Wishlist() {
   const { items, isLoading } = useWishlist();
   const { user } = useAuth();
 
   if (!user) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
             <Heart className="h-8 w-8 text-muted-foreground" />
           </div>
           <h1 className="font-display text-2xl lg:text-3xl mb-4">Please Sign In</h1>
           <p className="text-muted-foreground mb-8">Sign in to view your wishlist.</p>
           <Button asChild>
             <Link to="/login">Sign In</Link>
           </Button>
         </div>
       </Layout>
     );
   }
 
   if (isLoading) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <Loader2 className="h-8 w-8 animate-spin mx-auto" />
         </div>
       </Layout>
     );
   }
 
   if (items.length === 0) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
             <Heart className="h-8 w-8 text-muted-foreground" />
           </div>
           <h1 className="font-display text-2xl lg:text-3xl mb-4">Your Wishlist is Empty</h1>
           <p className="text-muted-foreground mb-8">Save items you love for later.</p>
           <Button asChild>
             <Link to="/products">Browse Products</Link>
           </Button>
         </div>
       </Layout>
     );
   }
 
   return (
     <Layout>
       <div className="container py-8 lg:py-12">
         <div className="mb-8">
           <h1 className="font-display text-3xl lg:text-4xl mb-2">Wishlist</h1>
           <p className="text-muted-foreground">
             {items.length} {items.length === 1 ? 'item' : 'items'} saved
           </p>
         </div>
 
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
           {items.map((product) => (
             <APIProductCard key={product._id} product={product} />
           ))}
         </div>
       </div>
     </Layout>
   );
 }
 