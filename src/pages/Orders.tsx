import { Link } from 'react-router-dom';
import { Package, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface Order {
  id: string;
  items: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    productName: string;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'online' | 'cash';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
}

const statusColors = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-primary/10 text-primary border-primary/20',
  shipped: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-success/10 text-success border-success/20',
};

export default function Orders() {
  const { user } = useAuth();

  // Get orders from localStorage
  const orders: Order[] = JSON.parse(localStorage.getItem('fashion_store_orders') || '[]')
    .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="font-display text-2xl mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">Sign in to view your orders.</p>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container py-16 lg:py-24 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl lg:text-3xl mb-4">No Orders Yet</h1>
          <p className="text-muted-foreground mb-8">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl mb-2">My Orders</h1>
          <p className="text-muted-foreground">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-border rounded-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-muted-foreground"> × {item.quantity}</span>
                    </div>
                    <span className="text-muted-foreground">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
                <p>
                  Ship to: {order.shippingAddress.firstName} {order.shippingAddress.lastName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="mt-1">
                  Payment: {order.paymentMethod === 'online' ? 'Paid Online' : 'Cash on Delivery'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
 