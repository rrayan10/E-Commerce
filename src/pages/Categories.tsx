 import { useState, useEffect } from 'react';
 import { Link } from 'react-router-dom';
 import { ArrowRight, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { categoriesAPI, APICategory } from '@/services/api';
 
 export default function Categories() {
   const [categories, setCategories] = useState<APICategory[]>([]);
   const [isLoading, setIsLoading] = useState(true);
 
   useEffect(() => {
     const fetchCategories = async () => {
       try {
         const response = await categoriesAPI.getAll();
         setCategories(response.data);
       } catch (error) {
         console.error('Failed to fetch categories:', error);
       } finally {
         setIsLoading(false);
       }
     };
     fetchCategories();
   }, []);
 
   return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Categories</h1>
          <p className="text-muted-foreground">Browse our curated collections</p>
        </div>

         {isLoading ? (
           <div className="flex justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin" />
           </div>
         ) : (
           <div className="grid md:grid-cols-2 gap-6">
             {categories.map((category) => (
               <Link
                 key={category._id}
                 to={`/categories/${category._id}`}
                 className="group relative aspect-[4/3] overflow-hidden"
               >
                 <img
                   src={category.image}
                   alt={category.name}
                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-background p-6">
                   <h2 className="font-display text-3xl lg:text-4xl mb-2">{category.name}</h2>
                   <span className="flex items-center text-sm font-medium">
                     Shop Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
 