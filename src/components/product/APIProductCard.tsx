 import { Link } from 'react-router-dom';
 import { Heart } from 'lucide-react';
 import { APIProduct } from '@/services/api';
 import { useWishlist } from '@/contexts/WishlistContext';
 import { useCart } from '@/contexts/CartContext';
 import { useAuth } from '@/contexts/AuthContext';
 import { useToast } from '@/hooks/use-toast';
 import { cn } from '@/lib/utils';
 
 interface APIProductCardProps {
   product: APIProduct;
 }
 
 export function APIProductCard({ product }: APIProductCardProps) {
   const { isInWishlist, toggleItem } = useWishlist();
   const { addItem } = useCart();
   const { user } = useAuth();
   const { toast } = useToast();
 
   const inWishlist = isInWishlist(product._id);
 
   const handleWishlistToggle = async (e: React.MouseEvent) => {
     e.preventDefault();
     e.stopPropagation();
     
     if (!user) {
       toast({ title: 'Please sign in', description: 'Sign in to add items to wishlist', variant: 'destructive' });
       return;
     }
     
     try {
       await toggleItem(product._id);
     } catch (error) {
       toast({ title: 'Error', description: 'Failed to update wishlist', variant: 'destructive' });
     }
   };
 
   const handleAddToCart = async (e: React.MouseEvent) => {
     e.preventDefault();
     e.stopPropagation();
     
     if (!user) {
       toast({ title: 'Please sign in', description: 'Sign in to add items to cart', variant: 'destructive' });
       return;
     }
     
     try {
       await addItem(product._id);
       toast({ title: 'Added to cart', description: `${product.title} has been added to your cart.` });
     } catch (error) {
       toast({ title: 'Error', description: 'Failed to add to cart', variant: 'destructive' });
     }
   };
 
   return (
     <Link to={`/products/${product._id}`} className="group">
       <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-3">
         <img
           src={product.imageCover}
           alt={product.title}
           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
         />
         <button
           onClick={handleWishlistToggle}
           className={cn(
             'absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center transition-all hover:bg-background',
             inWishlist && 'text-destructive'
           )}
         >
           <Heart className={cn('h-4 w-4', inWishlist && 'fill-current')} />
         </button>
         {product.priceAfterDiscount && (
           <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-medium px-2 py-1">
             Sale
           </span>
         )}
         <button
           onClick={handleAddToCart}
           className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-sm font-medium py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
         >
           Add to Cart
         </button>
       </div>
       <div>
         <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
           {product.brand?.name}
         </p>
         <h3 className="font-medium text-sm leading-tight mb-2 line-clamp-2">{product.title}</h3>
         <div className="flex items-center gap-2">
           <span className="font-medium">EGP {product.priceAfterDiscount || product.price}</span>
           {product.priceAfterDiscount && (
             <span className="text-sm text-muted-foreground line-through">EGP {product.price}</span>
           )}
         </div>
         <div className="flex items-center gap-1 mt-1">
           <span className="text-xs text-muted-foreground">⭐ {product.ratingsAverage}</span>
           <span className="text-xs text-muted-foreground">({product.ratingsQuantity})</span>
         </div>
       </div>
     </Link>
   );
 }