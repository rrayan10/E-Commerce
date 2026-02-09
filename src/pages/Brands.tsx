 import { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import { ArrowRight, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { brandsAPI, APIBrand } from '@/services/api';
 
 export default function Brands() {
   const [brands, setBrands] = useState<APIBrand[]>([]);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const fetchBrands = async () => {
       try {
         const response = await brandsAPI.getAll();
         setBrands(response.data);
       } catch (error) {
         console.error('Failed to fetch brands:', error);
       } finally {
         setIsLoading(false);
       }
     };
     fetchBrands();
   }, []);
 
   return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Our Brands</h1>
          <p className="text-muted-foreground">Discover exceptional craftsmanship from our curated partners</p>
        </div>

         {isLoading ? (
           <div className="flex justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin" />
           </div>
         ) : (
           <div className="grid md:grid-cols-2 gap-8">
             {brands.map((brand) => (
               <Link
                 key={brand._id}
                 to={`/brands/${brand._id}`}
                 className="group flex gap-6 p-6 bg-secondary/30 hover:bg-secondary/50 transition-colors rounded-lg"
               >
                 <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                   <img
                     src={brand.image}
                     alt={brand.name}
                     className="h-full w-full object-cover"
                   />
                 </div>
                 <div className="flex-1">
                   <h2 className="font-display text-xl mb-2">{brand.name}</h2>
                   <span className="text-sm font-medium flex items-center">
                     View Products <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                   </span>
                 </div>
               </Link>
             ))}
           </div>
         )}
      </div>
    </Layout>
  );
}
 