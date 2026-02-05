 import { useState, useEffect } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
 import { Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { categoriesAPI, productsAPI, APICategory, APIProduct } from '@/services/api';
 import { APIProductCard } from '@/components/product/APIProductCard';
 
 export default function CategoryDetails() {
   const { slug } = useParams();
   const navigate = useNavigate();
   const [category, setCategory] = useState<APICategory | null>(null);
   const [products, setProducts] = useState<APIProduct[]>([]);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const fetchData = async () => {
       if (!slug) return;
       
       setIsLoading(true);
       try {
         const [categoryRes, productsRes] = await Promise.all([
           categoriesAPI.getById(slug),
           productsAPI.getAll({ category: slug, limit: 40 }),
         ]);
         setCategory(categoryRes.data);
         setProducts(productsRes.data);
       } catch (error) {
         console.error('Failed to fetch category:', error);
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
 
   if (!category) {
     return (
       <Layout>
         <div className="container py-16 text-center">
           <h1 className="font-display text-2xl mb-4">Category Not Found</h1>
           <Button onClick={() => navigate('/categories')}>Browse Categories</Button>
         </div>
       </Layout>
     );
   }

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center text-background">
          <div className="text-center">
            <h1 className="font-display text-4xl lg:text-5xl mb-2">{category.name}</h1>
          </div>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/categories')} className="hover:text-foreground">Categories</button>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

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
