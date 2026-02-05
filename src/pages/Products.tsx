 import { useState, useEffect } from 'react';
 import { useSearchParams } from 'react-router-dom';
 import { SlidersHorizontal, X, Loader2 } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { productsAPI, categoriesAPI, brandsAPI, APIProduct, APICategory, APIBrand, ProductsParams } from '@/services/api';
 import { APIProductCard } from '@/components/product/APIProductCard';
 import { cn } from '@/lib/utils';
 
 export default function Products() {
   const [searchParams, setSearchParams] = useSearchParams();
   const [filtersOpen, setFiltersOpen] = useState(false);
   const [products, setProducts] = useState<APIProduct[]>([]);
   const [categories, setCategories] = useState<APICategory[]>([]);
   const [brands, setBrands] = useState<APIBrand[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [totalResults, setTotalResults] = useState(0);
   
   const searchQuery = searchParams.get('search') || '';
   const selectedCategory = searchParams.get('category') || '';
   const selectedBrand = searchParams.get('brand') || '';
   const sortBy = searchParams.get('sort') || 'newest';
 
   useEffect(() => {
     const fetchFilters = async () => {
       try {
         const [categoriesRes, brandsRes] = await Promise.all([
           categoriesAPI.getAll(),
           brandsAPI.getAll(),
         ]);
         setCategories(categoriesRes.data);
         setBrands(brandsRes.data);
       } catch (error) {
         console.error('Failed to fetch filters:', error);
       }
     };
     fetchFilters();
   }, []);
 
   useEffect(() => {
     const fetchProducts = async () => {
       setIsLoading(true);
       try {
         const params: ProductsParams = { limit: 40 };
         
         if (searchQuery) params.keyword = searchQuery;
         if (selectedCategory) params.category = selectedCategory;
         if (selectedBrand) params.brand = selectedBrand;
         
         switch (sortBy) {
           case 'price-asc':
             params.sort = 'price';
             break;
           case 'price-desc':
             params.sort = '-price';
             break;
           case 'newest':
           default:
             params.sort = '-createdAt';
         }
         
         const response = await productsAPI.getAll(params);
         setProducts(response.data);
         setTotalResults(response.results);
       } catch (error) {
         console.error('Failed to fetch products:', error);
       } finally {
         setIsLoading(false);
       }
     };
     
     fetchProducts();
   }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand;

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl lg:text-4xl">All Products</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <p className="text-muted-foreground">
               {totalResults} {totalResults === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={cn(
            'fixed inset-0 z-50 bg-background p-6 lg:static lg:block lg:w-64 lg:shrink-0 lg:p-0',
            filtersOpen ? 'block' : 'hidden lg:block'
          )}>
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="font-display text-xl">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => updateFilter('search', e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Category</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                     key={category._id}
                     onClick={() => updateFilter('category', selectedCategory === category._id ? '' : category._id)}
                    className={cn(
                      'block w-full text-left text-sm py-1 transition-colors',
                       selectedCategory === category._id
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Brand</label>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <button
                     key={brand._id}
                     onClick={() => updateFilter('brand', selectedBrand === brand._id ? '' : brand._id)}
                    className={cn(
                      'block w-full text-left text-sm py-1 transition-colors',
                       selectedBrand === brand._id
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            )}

            <Button
              className="w-full mt-4 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            >
              Show Results
            </Button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
             {isLoading ? (
               <div className="flex justify-center py-12">
                 <Loader2 className="h-8 w-8 animate-spin" />
               </div>
             ) : products.length === 0 ? (
               <div className="text-center py-12">
                 <p className="text-muted-foreground">No products found</p>
               </div>
             ) : (
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                 {products.map((product) => (
                   <APIProductCard key={product._id} product={product} />
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
