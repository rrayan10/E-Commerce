 import { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import { ArrowRight, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { productsAPI, categoriesAPI, brandsAPI, APIProduct, APICategory, APIBrand } from '@/services/api';
 import { APIProductCard } from '@/components/product/APIProductCard';
 
 export default function Index() {
   const [featuredProducts, setFeaturedProducts] = useState<APIProduct[]>([]);
   const [categories, setCategories] = useState<APICategory[]>([]);
   const [brands, setBrands] = useState<APIBrand[]>([]);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const [productsRes, categoriesRes, brandsRes] = await Promise.all([
           productsAPI.getAll({ limit: 8 }),
           categoriesAPI.getAll(),
           brandsAPI.getAll({ limit: 4 }),
         ]);
         setFeaturedProducts(productsRes.data);
         setCategories(categoriesRes.data);
         setBrands(brandsRes.data);
       } catch (error) {
         console.error('Failed to fetch data:', error);
       } finally {
         setIsLoading(false);
       }
     };
     
     fetchData();
   }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
            alt="Fashion hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
        <div className="relative text-center text-background px-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl mb-4 animate-fade-in">
            New Season
          </h1>
          <p className="text-lg sm:text-xl mb-8 opacity-90 animate-slide-up">
            Curated essentials for the modern wardrobe
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/products">
              Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16 lg:py-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl lg:text-3xl">Shop by Category</h2>
          <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
         {isLoading ? (
           <div className="flex justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
             {categories.slice(0, 4).map((category) => (
               <Link
                 key={category._id}
                 to={`/categories/${category._id}`}
                 className="group relative aspect-[3/4] overflow-hidden"
               >
                 <img
                   src={category.image}
                   alt={category.name}
                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-background">
                   <h3 className="font-display text-xl lg:text-2xl mb-1">{category.name}</h3>
                 </div>
               </Link>
             ))}
           </div>
         )}
      </section>

      {/* Featured Products */}
      <section className="container py-16 lg:py-24 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl lg:text-3xl">Featured</h2>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
         {isLoading ? (
           <div className="flex justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
             {featuredProducts.map((product) => (
               <APIProductCard key={product._id} product={product} />
             ))}
           </div>
         )}
      </section>

      {/* Brands */}
      <section className="container py-16 lg:py-24 border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl lg:text-3xl">Our Brands</h2>
          <Link to="/brands" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
         {isLoading ? (
           <div className="flex justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin" />
           </div>
         ) : (
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {brands.map((brand) => (
               <Link
                 key={brand._id}
                 to={`/brands/${brand._id}`}
                 className="group text-center"
               >
                 <div className="aspect-square overflow-hidden bg-secondary mb-4 rounded-lg">
                   <img
                     src={brand.image}
                     alt={brand.name}
                     className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                   />
                 </div>
                 <h3 className="font-medium text-sm">{brand.name}</h3>
               </Link>
             ))}
           </div>
         )}
      </section>

      {/* Newsletter */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container max-w-xl text-center">
          <h2 className="font-display text-2xl lg:text-3xl mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe for exclusive access to new collections, styling tips, and special offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" className="px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
