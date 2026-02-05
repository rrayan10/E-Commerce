import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const registerSchema = z.object({
   name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
   password: z.string().min(6, 'Password must be at least 6 characters').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
   phone: z.string().min(10, 'Phone must be at least 10 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
     const result = await registerUser(data.name, data.email, data.password, data.phone);
    setIsLoading(false);

    if (result.success) {
      toast({ title: 'Welcome!', description: 'Your account has been created.' });
      navigate('/account');
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-16 lg:py-24">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl lg:text-4xl mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join ShopMart for a curated shopping experience</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
           <div className="space-y-2">
             <Label htmlFor="name">Full Name</Label>
             <Input
               id="name"
               placeholder="John Doe"
               {...register('name')}
               className={errors.name ? 'border-destructive' : ''}
             />
             {errors.name && (
               <p className="text-sm text-destructive">{errors.name.message}</p>
             )}
           </div>
 
           <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
 
           <div className="space-y-2">
             <Label htmlFor="phone">Phone</Label>
             <Input
               id="phone"
               type="tel"
               placeholder="01010700701"
               {...register('phone')}
               className={errors.phone ? 'border-destructive' : ''}
             />
             {errors.phone && (
               <p className="text-sm text-destructive">{errors.phone.message}</p>
             )}
           </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-destructive' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Layout>
  );
}
