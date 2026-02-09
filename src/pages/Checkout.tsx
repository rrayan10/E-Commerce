 import { useState } from 'react';
 import { useNavigate, Link } from 'react-router-dom';
 import { useForm } from 'react-hook-form';
 import { zodResolver } from '@hookform/resolvers/zod';
 import { z } from 'zod';
 import { CreditCard, Banknote, Loader2, CheckCircle, ShoppingBag } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { useCart } from '@/contexts/CartContext';
 import { useAuth } from '@/contexts/AuthContext';
 import { useToast } from '@/hooks/use-toast';
 import { ordersAPI } from '@/services/api';
 import { cn } from '@/lib/utils';
 
 const checkoutSchema = z.object({
   details: z.string().min(5, 'Address details are required'),
   phone: z.string().min(10, 'Please enter a valid phone number'),
   city: z.string().min(2, 'City is required'),
 });
 
 type CheckoutFormData = z.infer<typeof checkoutSchema>;
 
 export default function Checkout() {
   const navigate = useNavigate();
   const { toast } = useToast();
   const { items, getSubtotal, clearCart, cartId } = useCart();
   const { user } = useAuth();
   const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
   const [isLoading, setIsLoading] = useState(false);
   const [orderComplete, setOrderComplete] = useState(false);
   const [orderId, setOrderId] = useState('');
 
   const subtotal = getSubtotal();
   const shipping = subtotal > 200 ? 0 : 15;
   const total = subtotal + shipping;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
     if (!cartId) {
       toast({ title: 'Error', description: 'Cart not found', variant: 'destructive' });
       return;
     }
 
    setIsLoading(true);

     try {
       const shippingAddress = {
         details: data.details,
         phone: data.phone,
         city: data.city,
       };
 
       if (paymentMethod === 'cash') {
         const response = await ordersAPI.createCashOrder(cartId, shippingAddress);
         await clearCart();
         setOrderId(response.data._id);
         setOrderComplete(true);
       } else {
         // Online payment - redirect to Stripe checkout
         const returnUrl = window.location.origin;
         const response = await ordersAPI.checkoutSession(cartId, shippingAddress, returnUrl);
         window.location.href = response.session.url;
       }
     } catch (error) {
       toast({ 
         title: 'Error', 
         description: error instanceof Error ? error.message : 'Failed to create order', 
         variant: 'destructive' 
       });
     } finally {
       setIsLoading(false);
     }
  };

   if (!user) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
             <ShoppingBag className="h-8 w-8 text-muted-foreground" />
           </div>
           <h1 className="font-display text-2xl lg:text-3xl mb-4">Please Sign In</h1>
           <p className="text-muted-foreground mb-8">Sign in to checkout.</p>
           <Button asChild>
             <Link to="/login">Sign In</Link>
           </Button>
         </div>
       </Layout>
     );
   }
 
   if (items.length === 0 && !orderComplete) {
     return (
       <Layout>
         <div className="container py-16 lg:py-24 text-center">
           <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
             <ShoppingBag className="h-8 w-8 text-muted-foreground" />
           </div>
           <h1 className="font-display text-2xl lg:text-3xl mb-4">Your Cart is Empty</h1>
           <p className="text-muted-foreground mb-8">Add items to your cart before checkout.</p>
           <Button asChild>
             <Link to="/products">Start Shopping</Link>
           </Button>
         </div>
       </Layout>
     );
  }

  if (orderComplete) {
    return (
      <Layout>
        <div className="container max-w-lg py-16 lg:py-24 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-display text-3xl lg:text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-muted-foreground mb-8">
             Order ID: {orderId}
          </p>
          {paymentMethod === 'cash' && (
            <p className="text-sm bg-secondary p-4 rounded-lg mb-8">
               Please have EGP {total.toFixed(2)} ready for cash on delivery.
            </p>
          )}
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 lg:py-12">
        <h1 className="font-display text-3xl lg:text-4xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Shipping Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl mb-6">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                   <div className="space-y-2 sm:col-span-2">
                     <Label htmlFor="details">Address Details</Label>
                     <Input
                       id="details"
                       placeholder="Street address, building, floor, etc."
                       {...register('details')}
                       className={errors.details ? 'border-destructive' : ''}
                     />
                     {errors.details && (
                       <p className="text-sm text-destructive">{errors.details.message}</p>
                     )}
                   </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      className={errors.city ? 'border-destructive' : ''}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-display text-xl mb-6">Payment Method</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={cn(
                      'flex items-center gap-4 p-4 border rounded-lg transition-colors text-left',
                      paymentMethod === 'online'
                        ? 'border-foreground bg-secondary/50'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Pay Online</p>
                      <p className="text-sm text-muted-foreground">Credit/Debit Card</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={cn(
                      'flex items-center gap-4 p-4 border rounded-lg transition-colors text-left',
                      paymentMethod === 'cash'
                        ? 'border-foreground bg-secondary/50'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Banknote className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive</p>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'online' && (
                  <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      This is a demo store. No actual payment will be processed.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h2 className="font-display text-xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                   {items.map((item) => (
                     <div key={item._id} className="flex gap-3">
                      <div className="w-16 aspect-[3/4] bg-secondary overflow-hidden shrink-0">
                        <img
                           src={item.product.imageCover}
                           alt={item.product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium truncate">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">
                           Qty: {item.count}
                        </p>
                         <p className="text-sm font-medium mt-1">EGP {item.price * item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                     <span>EGP {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                     <span>{shipping === 0 ? 'Free' : `EGP ${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                     <span>EGP {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6" size="lg" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
 