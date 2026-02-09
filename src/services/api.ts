 // Route E-commerce API Service
 // Base URL: https://ecommerce.routemisr.com/api/v1
 
 const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';
 
 // Helper function for API calls
 async function apiCall<T>(
   endpoint: string,
   options: RequestInit = {}
 ): Promise<T> {
   const token = localStorage.getItem('userToken');
   
   const headers: HeadersInit = {
     'Content-Type': 'application/json',
     ...options.headers,
   };
   
   if (token) {
     (headers as Record<string, string>)['token'] = token;
   }
   
   const response = await fetch(`${BASE_URL}${endpoint}`, {
     ...options,
     headers,
   });
   
   const data = await response.json();
   
   if (!response.ok) {
     throw new Error(data.message || 'Something went wrong');
   }
   
   return data;
 }
 
 // ============== AUTH API ==============
 
 export interface SignupData {
   name: string;
   email: string;
   password: string;
   rePassword: string;
   phone: string;
 }
 
 export interface SigninData {
   email: string;
   password: string;
 }
 
 export interface AuthResponse {
   message: string;
   user: {
     name: string;
     email: string;
     role: string;
   };
   token: string;
 }
 
 export interface ForgotPasswordResponse {
   statusMsg: string;
   message: string;
 }
 
 export interface VerifyResetCodeResponse {
   status: string;
 }
 
 export interface ResetPasswordData {
   email: string;
   newPassword: string;
 }
 
 export interface ChangePasswordData {
   currentPassword: string;
   password: string;
   rePassword: string;
 }
 
 export const authAPI = {
   signup: (data: SignupData) => 
     apiCall<AuthResponse>('/auth/signup', {
       method: 'POST',
       body: JSON.stringify(data),
     }),
     
   signin: (data: SigninData) => 
     apiCall<AuthResponse>('/auth/signin', {
       method: 'POST',
       body: JSON.stringify(data),
     }),
     
   forgotPassword: (email: string) => 
     apiCall<ForgotPasswordResponse>('/auth/forgotPasswords', {
       method: 'POST',
       body: JSON.stringify({ email }),
     }),
     
   verifyResetCode: (resetCode: string) => 
     apiCall<VerifyResetCodeResponse>('/auth/verifyResetCode', {
       method: 'POST',
       body: JSON.stringify({ resetCode }),
     }),
     
   resetPassword: (data: ResetPasswordData) => 
     apiCall<AuthResponse>('/auth/resetPassword', {
       method: 'PUT',
       body: JSON.stringify(data),
     }),
     
   changePassword: (data: ChangePasswordData) => 
     apiCall<AuthResponse>('/users/changeMyPassword', {
       method: 'PUT',
       body: JSON.stringify(data),
     }),
     
   verifyToken: () => 
     apiCall<{ message: string; decoded: { id: string; name: string; role: string } }>('/auth/verifyToken'),
 };
 
 // ============== CATEGORIES API ==============
 
 export interface APICategory {
   _id: string;
   name: string;
   slug: string;
   image: string;
   createdAt: string;
   updatedAt: string;
 }
 
 export interface CategoriesResponse {
   results: number;
   metadata: {
     currentPage: number;
     numberOfPages: number;
     limit: number;
   };
   data: APICategory[];
 }
 
 export interface CategoryResponse {
   data: APICategory;
 }
 
 export const categoriesAPI = {
   getAll: (params?: { limit?: number; page?: number }) => {
     const query = new URLSearchParams();
     if (params?.limit) query.append('limit', params.limit.toString());
     if (params?.page) query.append('page', params.page.toString());
     const queryString = query.toString();
     return apiCall<CategoriesResponse>(`/categories${queryString ? `?${queryString}` : ''}`);
   },
   
   getById: (id: string) => 
     apiCall<CategoryResponse>(`/categories/${id}`),
     
   getSubcategories: (categoryId: string) => 
     apiCall<{ results: number; data: APISubCategory[] }>(`/categories/${categoryId}/subcategories`),
 };
 
 // ============== SUBCATEGORIES API ==============
 
 export interface APISubCategory {
   _id: string;
   name: string;
   slug: string;
   category: string;
   createdAt: string;
   updatedAt: string;
 }
 
 export interface SubCategoriesResponse {
   results: number;
   metadata: {
     currentPage: number;
     numberOfPages: number;
     limit: number;
   };
   data: APISubCategory[];
 }
 
 export const subcategoriesAPI = {
   getAll: (params?: { limit?: number }) => {
     const query = params?.limit ? `?limit=${params.limit}` : '';
     return apiCall<SubCategoriesResponse>(`/subcategories${query}`);
   },
   
   getById: (id: string) => 
     apiCall<{ data: APISubCategory }>(`/subcategories/${id}`),
 };
 
 // ============== BRANDS API ==============
 
 export interface APIBrand {
   _id: string;
   name: string;
   slug: string;
   image: string;
   createdAt: string;
   updatedAt: string;
 }
 
 export interface BrandsResponse {
   results: number;
   metadata: {
     currentPage: number;
     numberOfPages: number;
     limit: number;
   };
   data: APIBrand[];
 }
 
 export interface BrandResponse {
   data: APIBrand;
 }
 
 export const brandsAPI = {
   getAll: (params?: { limit?: number; page?: number }) => {
     const query = new URLSearchParams();
     if (params?.limit) query.append('limit', params.limit.toString());
     if (params?.page) query.append('page', params.page.toString());
     const queryString = query.toString();
     return apiCall<BrandsResponse>(`/brands${queryString ? `?${queryString}` : ''}`);
   },
   
   getById: (id: string) => 
     apiCall<BrandResponse>(`/brands/${id}`),
 };
 
 // ============== PRODUCTS API ==============
 
 export interface APIProduct {
   _id: string;
   title: string;
   slug: string;
   description: string;
   quantity: number;
   price: number;
   priceAfterDiscount?: number;
   imageCover: string;
   images: string[];
   category: {
     _id: string;
     name: string;
     slug: string;
     image: string;
   };
   brand: {
     _id: string;
     name: string;
     slug: string;
     image: string;
   };
   ratingsAverage: number;
   ratingsQuantity: number;
   sold: number;
   createdAt: string;
   updatedAt: string;
   id: string;
 }
 
 export interface ProductsResponse {
   results: number;
   metadata: {
     currentPage: number;
     numberOfPages: number;
     limit: number;
     nextPage?: number;
   };
   data: APIProduct[];
 }
 
 export interface ProductResponse {
   data: APIProduct;
 }
 
 export interface ProductsParams {
   limit?: number;
   page?: number;
   sort?: string;
   keyword?: string;
   brand?: string;
   category?: string;
   'price[gte]'?: number;
   'price[lte]'?: number;
 }
 
 export const productsAPI = {
   getAll: (params?: ProductsParams) => {
     const query = new URLSearchParams();
     if (params) {
       Object.entries(params).forEach(([key, value]) => {
         if (value !== undefined) {
           query.append(key, value.toString());
         }
       });
     }
     const queryString = query.toString();
     return apiCall<ProductsResponse>(`/products${queryString ? `?${queryString}` : ''}`);
   },
   
   getById: (id: string) => 
     apiCall<ProductResponse>(`/products/${id}`),
 };
 
 // ============== WISHLIST API ==============
 
 export interface WishlistResponse {
   status: string;
   count: number;
   data: APIProduct[];
 }
 
 export interface AddToWishlistResponse {
   status: string;
   message: string;
   data: string[];
 }
 
 export const wishlistAPI = {
   get: () => 
     apiCall<WishlistResponse>('/wishlist'),
     
   add: (productId: string) => 
     apiCall<AddToWishlistResponse>('/wishlist', {
       method: 'POST',
       body: JSON.stringify({ productId }),
     }),
     
   remove: (productId: string) => 
     apiCall<{ status: string; message: string; data: string[] }>(`/wishlist/${productId}`, {
       method: 'DELETE',
     }),
 };
 
 // ============== CART API ==============
 
 export interface APICartItem {
   count: number;
   _id: string;
   product: APIProduct;
   price: number;
 }
 
 export interface APICart {
   _id: string;
   cartOwner: string;
   products: APICartItem[];
   totalCartPrice: number;
   createdAt: string;
   updatedAt: string;
 }
 
 export interface CartResponse {
   status: string;
   numOfCartItems: number;
   cartId?: string;
   data: APICart;
 }
 
 export interface AddToCartResponse {
   status: string;
   message: string;
   numOfCartItems: number;
   cartId: string;
   data: APICart;
 }
 
 export const cartAPI = {
   get: () => 
     apiCall<CartResponse>('/cart'),
     
   add: (productId: string) => 
     apiCall<AddToCartResponse>('/cart', {
       method: 'POST',
       body: JSON.stringify({ productId }),
     }),
     
   updateQuantity: (productId: string, count: number) => 
     apiCall<CartResponse>(`/cart/${productId}`, {
       method: 'PUT',
       body: JSON.stringify({ count: count.toString() }),
     }),
     
   remove: (productId: string) => 
     apiCall<CartResponse>(`/cart/${productId}`, {
       method: 'DELETE',
     }),
     
   clear: () => 
     apiCall<{ message: string }>('/cart', {
       method: 'DELETE',
     }),
 };
 
 // ============== ORDERS API ==============
 
 export interface ShippingAddressData {
   details: string;
   phone: string;
   city: string;
 }
 
 export interface APIOrder {
   _id: string;
   user: string;
   cartItems: {
     count: number;
     _id: string;
     product: APIProduct;
     price: number;
   }[];
   totalOrderPrice: number;
   paymentMethodType: string;
   isPaid: boolean;
   isDelivered: boolean;
   createdAt: string;
   updatedAt: string;
   shippingAddress: ShippingAddressData;
 }
 
 export interface OrdersResponse {
   results: number;
   data: APIOrder[];
 }
 
 export interface CheckoutSessionResponse {
   status: string;
   session: {
     url: string;
   };
 }
 
 export const ordersAPI = {
   createCashOrder: (cartId: string, shippingAddress: ShippingAddressData) => 
     apiCall<{ status: string; data: APIOrder }>(`/orders/${cartId}`, {
       method: 'POST',
       body: JSON.stringify({ shippingAddress }),
     }),
     
   checkoutSession: (cartId: string, shippingAddress: ShippingAddressData, returnUrl: string) => 
     apiCall<CheckoutSessionResponse>(`/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`, {
       method: 'POST',
       body: JSON.stringify({ shippingAddress }),
     }),
     
   getUserOrders: (userId: string) => 
     apiCall<APIOrder[]>(`/orders/user/${userId}`),
     
   getAllOrders: () => 
     apiCall<OrdersResponse>('/orders/'),
 };
 
 // ============== ADDRESSES API ==============
 
 export interface AddressData {
   name: string;
   details: string;
   phone: string;
   city: string;
 }
 
 export interface APIAddress {
   _id: string;
   name: string;
   details: string;
   phone: string;
   city: string;
 }
 
 export interface AddressesResponse {
   status: string;
   data: {
     addresses: APIAddress[];
   };
 }
 
 export const addressesAPI = {
   getAll: () => 
     apiCall<AddressesResponse>('/addresses'),
     
   add: (data: AddressData) => 
     apiCall<{ status: string; message: string; data: { addresses: APIAddress[] } }>('/addresses', {
       method: 'POST',
       body: JSON.stringify(data),
     }),
     
   remove: (addressId: string) => 
     apiCall<{ status: string; data: { addresses: APIAddress[] } }>(`/addresses/${addressId}`, {
       method: 'DELETE',
     }),
     
   getById: (addressId: string) => 
     apiCall<{ status: string; data: APIAddress }>(`/addresses/${addressId}`),
 };
 