 import { useNavigate, Link } from 'react-router-dom';
 import { User, ShoppingBag, Heart, Key, LogOut } from 'lucide-react';
 import { Layout } from '@/components/layout/Layout';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { useAuth } from '@/contexts/AuthContext';
 
 export default function Account() {
   const { user, logout } = useAuth();
   const navigate = useNavigate();
 
   if (!user) {
     navigate('/login');
     return null;
   }
 
   const handleLogout = () => {
     logout();
     navigate('/');
   };
 
   return (
     <Layout>
       <div className="container py-12 lg:py-16">
         <div className="max-w-2xl mx-auto">
           <div className="mb-8">
             <h1 className="font-display text-3xl lg:text-4xl mb-2">My Account</h1>
             <p className="text-muted-foreground">
               Welcome back, {user.name}
             </p>
           </div>
 
           <div className="grid gap-4">
             <Card>
               <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                   <User className="h-6 w-6" />
                 </div>
                 <div>
                   <CardTitle className="text-lg">{user.name}</CardTitle>
                   <CardDescription>{user.email}</CardDescription>
                 </div>
               </CardHeader>
             </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/orders">
                <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Orders</h3>
                      <p className="text-sm text-muted-foreground">View order history</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/wishlist">
                <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wishlist</h3>
                      <p className="text-sm text-muted-foreground">Saved items</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/change-password">
                <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">Change password</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="hover:bg-destructive/10 transition-colors cursor-pointer" onClick={handleLogout}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-medium text-destructive">Sign Out</h3>
                    <p className="text-sm text-muted-foreground">Log out of your account</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
