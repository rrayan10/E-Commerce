import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';
import { getBrandById, getCategoryById } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const brand = getBrandById(product.brandId);
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <Link to={`/products/${product.slug}`} className={cn('group block', className)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-medium px-2 py-1">
            Sale
          </span>
        )}
        <button
          onClick={handleWishlistClick}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            inWishlist 
              ? 'bg-foreground text-background' 
              : 'bg-background/80 text-foreground opacity-0 group-hover:opacity-100'
          )}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-4 w-4', inWishlist && 'fill-current')} />
        </button>
      </div>
      <div className="space-y-1">
        {brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{brand.name}</p>
        )}
        <h3 className="text-sm font-medium">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-1 pt-1">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-3 h-3 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-muted-foreground ml-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
