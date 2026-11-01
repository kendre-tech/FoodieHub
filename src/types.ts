export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface FoodItem {
  id: string;
  number: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  ratingCount: number;
  description: string;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
  prepTime: string;
  calories?: string;
  tags: string[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  distance: string;
  minOrder: number;
  image: string;
  address: string;
  isPromoted?: boolean;
}

export interface CartItem {
  foodId: string;
  food: FoodItem;
  quantity: number;
}

export interface DeliveryAddress {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  flatNo: string;
  street: string;
  landmark?: string;
  area: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
  lat?: number;
  lng?: number;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod =
  | 'UPI'
  | 'Google Pay'
  | 'PhonePe'
  | 'Paytm'
  | 'Debit Card'
  | 'Credit Card'
  | 'Cash on Delivery';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: DeliveryAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  taxes: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'Cash on Delivery';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  specialInstructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'delivery';
  addresses: DeliveryAddress[];
  savedCardLast4?: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleNumber: string;
  rating: number;
  totalDeliveries: number;
  status: 'Available' | 'On Delivery' | 'Offline';
  currentOrderId?: string;
  locationArea: string;
}

export interface Coupon {
  code: string;
  title: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderAmount: number;
  description: string;
  expiryDate: string;
}

export interface SiteSettings {
  siteName: string;
  creatorName: string;
  tagline: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  taxPercentage: number;
  currencySymbol: string;
}

export type AppPanel = 'user' | 'admin' | 'delivery';

export type UserPage =
  | 'home'
  | 'restaurants'
  | 'offers'
  | 'search'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'profile'
  | 'food-detail'
  | 'login'
  | 'register';
