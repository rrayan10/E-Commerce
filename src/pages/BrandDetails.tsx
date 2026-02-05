 import { useState, useEffect } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
 import { Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { brandsAPI, productsAPI, APIBrand, APIProduct } from '@/services/api';
 import { APIProductCard } from '@/components/product/APIProductCard';
 
 export default function BrandDetails() {
   const { slug } = useParams();
   const navigate = useNavigate();
   const [brand, setBrand] = useState<APIBrand | null>(null);
   const [products, setProducts] = useState<APIProduct[]>([]);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const fetchData = async () => {
       if (!slug) return;
       
       setIsLoading(true);
       try {
         const [brandRes, productsRes] = await Promise.all([
           brandsAPI.getById(slug),
           productsAPI.getAll({ brand: slug, limit: 40 }),
         ]);
         setBrand(brandRes.data);
         setProducts(productsRes.data);
       } catch (error) {
         console.error('Failed to fetch brand:', error);
       } finally {
         setIsLoading(false);
       }
     };
     
     fetchData();
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
 
   if (!brand) {
     return (
       <Layout>
         <div className="container py-16 text-center">
           <h1 className="font-display text-2xl mb-4">Brand Not Found</h1>
           <Button onClick={() => navigate('/brands')}>Browse Brands</Button>
         </div>
       </Layout>
     );
   }

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/brands')} className="hover:text-foreground">Brands</button>
          <span className="mx-2">/</span>
          <span className="text-foreground">{brand.name}</span>
        </nav>

        {/* Brand Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 pb-12 border-b border-border">
          <div className="w-32 h-32 shrink-0 overflow-hidden rounded-lg bg-secondary">
            <img
               src={brand.image}
              alt={brand.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-display text-3xl lg:text-4xl mb-3">{brand.name}</h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
           {products.map((product) => (
             <APIProductCard key={product._id} product={product} />
           ))}
         </div>
      </div>
    </Layout>
  );
}
