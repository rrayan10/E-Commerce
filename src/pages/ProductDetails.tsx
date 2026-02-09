 import { useState, useEffect } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
 import { Heart, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { productsAPI, APIProduct } from '@/services/api';
 import { useCart } from '@/contexts/CartContext';
 import { useWishlist } from '@/contexts/WishlistContext';
 import { useAuth } from '@/contexts/AuthContext';
 import { useToast } from '@/hooks/use-toast';
 import { cn } from '@/lib/utils';
 import { APIProductCard } from '@/components/product/APIProductCard';
 
 export default function ProductDetails() {
   const { slug } = useParams();
   const navigate = useNavigate();
   const { toast } = useToast();
   const { addItem, isLoading: cartLoading } = useCart();
   const { isInWishlist, toggleItem, isLoading: wishlistLoading } = useWishlist();
   const { user } = useAuth();
 
   const [product, setProduct] = useState<APIProduct | null>(null);
   const [relatedProducts, setRelatedProducts] = useState<APIProduct[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
   useEffect(() => {
     const fetchProduct = async () => {
       if (!slug) return;
       
       setIsLoading(true);
       try {
         const response = await productsAPI.getById(slug);
         setProduct(response.data);
         
         // Fetch related products from same category
         if (response.data.category) {
           const relatedResponse = await productsAPI.getAll({ 
             category: response.data.category._id,
             limit: 5 
           });
           setRelatedProducts(relatedResponse.data.filter(p => p._id !== response.data._id).slice(0, 4));
         }
       } catch (error) {
         console.error('Failed to fetch product:', error);
       } finally {
         setIsLoading(false);
       }
     };
     
     fetchProduct();
   }, [slug]);
 
   if (isLoading) {
     return (
       <Layout>
         <div className="container py-16 text-center">
           <Loader2 className="h-8 w-8 animate-spin mx-auto" />
         </div>
       </Layout>
     );
   }
 
   if (!product) {
     return (
       <Layout>
         <div className="container py-16 text-center">
           <h1 className="font-display text-2xl mb-4">Product Not Found</h1>
           <Button onClick={() => navigate('/products')}>Browse Products</Button>
         </div>
       </Layout>
     );
   }
 
   const inWishlist = isInWishlist(product._id);
   const allImages = [product.imageCover, ...product.images];
 
   const handleAddToCart = async () => {
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
 
   const handleWishlistToggle = async () => {
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

  const nextImage = () => {
     setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
     setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/products')} className="hover:text-foreground">Products</button>
           {product.category && (
            <>
              <span className="mx-2">/</span>
               <button onClick={() => navigate(`/categories/${product.category._id}`)} className="hover:text-foreground">
                 {product.category.name}
              </button>
            </>
          )}
          <span className="mx-2">/</span>
           <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
              <img
                 src={allImages[currentImageIndex]}
                 alt={product.title}
                className="h-full w-full object-cover"
              />
               {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
               {product.priceAfterDiscount && (
                <span className="absolute top-4 left-4 bg-foreground text-background text-xs font-medium px-3 py-1">
                  Sale
                </span>
              )}
            </div>
             {allImages.length > 1 && (
              <div className="flex gap-2">
                 {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'w-20 aspect-[3/4] overflow-hidden border-2 transition-colors',
                      currentImageIndex === index ? 'border-foreground' : 'border-transparent'
                    )}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
             {product.brand && (
              <button
                 onClick={() => navigate(`/brands/${product.brand._id}`)}
                className="text-sm text-muted-foreground uppercase tracking-wide hover:text-foreground"
              >
                 {product.brand.name}
              </button>
            )}

             <h1 className="font-display text-3xl lg:text-4xl">{product.title}</h1>

            <div className="flex items-center gap-3">
               <span className="text-2xl font-medium">EGP {product.priceAfterDiscount || product.price}</span>
               {product.priceAfterDiscount && (
                 <span className="text-xl text-muted-foreground line-through">EGP {product.price}</span>
              )}
            </div>
 
             <div className="flex items-center gap-2">
               <span className="text-sm">⭐ {product.ratingsAverage}</span>
               <span className="text-sm text-muted-foreground">({product.ratingsQuantity} reviews)</span>
               <span className="text-sm text-muted-foreground">• {product.sold} sold</span>
             </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
               <Button onClick={handleAddToCart} size="lg" className="flex-1" disabled={cartLoading}>
                 {cartLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                 onClick={handleWishlistToggle}
                className={cn(inWishlist && 'bg-secondary')}
                 disabled={wishlistLoading}
              >
                <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
              </Button>
            </div>

            {/* Stock Status */}
            <p className={cn(
              'text-sm',
               product.quantity > 0 ? 'text-success' : 'text-destructive'
            )}>
               {product.quantity > 0 ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24 pt-12 border-t border-border">
            <h2 className="font-display text-2xl lg:text-3xl mb-8">You May Also Like</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
               {relatedProducts.map((product) => (
                 <APIProductCard key={product._id} product={product} />
               ))}
             </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
  