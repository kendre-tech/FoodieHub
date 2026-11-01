import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FoodItem,
  Category,
  Restaurant,
  CartItem,
  DeliveryAddress,
  Order,
  OrderStatus,
  PaymentMethod,
  User,
  DeliveryPartner,
  Coupon,
  SiteSettings,
  AppPanel,
  UserPage,
} from '../types';
import {
  INITIAL_FOOD_ITEMS,
  INITIAL_CATEGORIES,
  INITIAL_RESTAURANTS,
  INITIAL_COUPONS,
  INITIAL_DELIVERY_PARTNERS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  LATUR_DELIVERY_AREAS,
  DEFAULT_LATUR_LOCATION,
} from '../data/mockData';
import {
  saveOrderToSupabase,
  updateOrderStatusInSupabase,
  testSupabaseConnection,
  syncAllOrdersToSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_SETUP_SQL,
} from '../services/supabaseService';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

interface AppContextType {
  // Navigation & Role
  activePanel: AppPanel;
  setActivePanel: (panel: AppPanel) => void;
  activePage: UserPage;
  setActivePage: (page: UserPage) => void;
  selectedFood: FoodItem | null;
  setSelectedFood: (food: FoodItem | null) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;

  // Catalog Data
  foods: FoodItem[];
  categories: Category[];
  restaurants: Restaurant[];
  coupons: Coupon[];
  settings: SiteSettings;

  // User State
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  adminUser: { email: string; name: string } | null;
  setAdminUser: (admin: { email: string; name: string } | null) => void;
  deliveryPartnerUser: DeliveryPartner | null;
  setDeliveryPartnerUser: (driver: DeliveryPartner | null) => void;
  deliveryPartners: DeliveryPartner[];

  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  selectedAddress: DeliveryAddress;
  setSelectedAddress: (address: DeliveryAddress) => void;

  // Cart actions
  addToCart: (food: FoodItem, quantity?: number) => void;
  removeFromCart: (foodId: string) => void;
  updateCartQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  orderNow: (food: FoodItem, quantity?: number) => void;
  toggleWishlist: (foodId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  orders: Order[];
  placeOrder: (paymentMethod: PaymentMethod, specialInstructions?: string) => Promise<string>;
  cancelOrder: (orderId: string) => void;
  reorder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignDeliveryPartner: (orderId: string, partnerId: string) => void;

  // Food & Admin Management
  addNewFood: (food: Omit<FoodItem, 'id' | 'number'>) => void;
  updateFood: (food: FoodItem) => void;
  deleteFood: (foodId: string) => void;
  toggleFoodAvailability: (foodId: string) => void;
  updateCategory: (category: Category) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addDeliveryPartner: (partner: Omit<DeliveryPartner, 'id'>) => void;
  updateDeliveryPartnerStatus: (partnerId: string, status: DeliveryPartner['status']) => void;

  // Reviews
  addReview: (foodId: string, rating: number, comment: string) => void;

  // Filter & Search
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  priceFilter: number | null;
  setPriceFilter: (price: number | null) => void;
  ratingFilter: number | null;
  setRatingFilter: (rating: number | null) => void;
  isVegOnly: boolean;
  setIsVegOnly: (veg: boolean) => void;
  sortOrder: 'popular' | 'rating' | 'price-low' | 'price-high';
  setSortOrder: (order: 'popular' | 'rating' | 'price-low' | 'price-high') => void;

  // Geolocation & Delivery Areas
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  laturDeliveryAreas: readonly string[];
  selectLaturArea: (area: string) => void;
  requestCurrentLocation: () => Promise<string>;
  addUserAddress: (address: Omit<DeliveryAddress, 'id'>) => void;

  // Dedicated Auth Methods
  loginUser: (email: string, pass: string) => { success: boolean; message: string };
  registerUser: (name: string, email: string, phone: string, pass: string) => { success: boolean; message: string };
  logoutUser: () => void;
  sendOtp: (email: string) => Promise<string>;
  verifyOtp: (enteredOtp: string) => boolean;
  activeOtpCode: string;

  // Notifications
  notifications: ToastNotification[];
  addNotification: (title: string, message: string, type?: ToastNotification['type']) => void;
  dismissNotification: (id: string) => void;

  // Supabase Data Storage Integration
  supabaseProjectId: string;
  supabaseStatus: {
    connected: boolean;
    tablesExist: boolean;
    message: string;
    lastSyncTime: string | null;
  };
  isSyncingWithSupabase: boolean;
  testSupabase: () => Promise<{ connected: boolean; tablesExist: boolean; message: string }>;
  syncOrdersWithSupabase: () => Promise<{ syncedCount: number; failedCount: number; details: string }>;
  supabaseSetupSql: string;

  // Calculation helpers
  cartSubtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  taxAmount: number;
  finalTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr-1',
  name: 'Dhanashri Kendre',
  email: 'dhanashrikendre24@gmail.com',
  phone: '+91 98201 45890',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      type: 'Home',
      name: 'Dhanashri Kendre',
      phone: '+91 98201 45890',
      flatNo: 'Shree Niwas, Plot 14',
      street: 'Opposite Town Hall, Shivaji Chowk',
      landmark: 'Near Rajarshi Shahu College',
      area: 'Shivaji Chowk',
      city: 'Latur',
      pincode: '413512',
      isDefault: true,
      lat: 18.4088,
      lng: 76.5604,
    },
    {
      id: 'addr-2',
      type: 'Work',
      name: 'Dhanashri Kendre',
      phone: '+91 98201 45890',
      flatNo: 'Plot 45, Phase 1',
      street: 'Industrial Area Road',
      landmark: 'Near MIDC Police Station',
      area: 'MIDC',
      city: 'Latur',
      pincode: '413512',
      lat: 18.4150,
      lng: 76.5820,
    },
  ],
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Panel & Route
  const [activePanel, setActivePanel] = useState<AppPanel>('user');
  const [activePage, setActivePage] = useState<UserPage>('home');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>('ORD-9021');

  // Load from LocalStorage with safe fallbacks
  const [foods, setFoods] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_foods');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
    } catch {
      return INITIAL_FOOD_ITEMS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [restaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_delivery_partners');
      return saved ? JSON.parse(saved) : INITIAL_DELIVERY_PARTNERS;
    } catch {
      return INITIAL_DELIVERY_PARTNERS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_admin');
      return saved ? JSON.parse(saved) : { email: 'admin@hoodihub.com', name: 'Dhanashri Kendre (Admin)' };
    } catch {
      return { email: 'admin@hoodihub.com', name: 'Dhanashri Kendre (Admin)' };
    }
  });

  const [deliveryPartnerUser, setDeliveryPartnerUser] = useState<DeliveryPartner | null>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_delivery_user');
      return saved ? JSON.parse(saved) : INITIAL_DELIVERY_PARTNERS[0];
    } catch {
      return INITIAL_DELIVERY_PARTNERS[0];
    }
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_cart');
      return saved ? JSON.parse(saved) : [
        { foodId: 'food-1', food: INITIAL_FOOD_ITEMS[0], quantity: 1 },
        { foodId: 'food-43', food: INITIAL_FOOD_ITEMS[42], quantity: 1 }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_wishlist');
      return saved ? JSON.parse(saved) : ['food-1', 'food-24', 'food-49'];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('hoodihub_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(
    DEFAULT_USER.addresses[0]
  );

  // Search & Filter State
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');

  // Notifications
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Supabase Cloud Storage State (Project ID: eqvocjukksgtqmgdbjog)
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    tablesExist: boolean;
    message: string;
    lastSyncTime: string | null;
  }>({
    connected: true,
    tablesExist: false,
    message: 'Supabase connected (eqvocjukksgtqmgdbjog)',
    lastSyncTime: null,
  });
  const [isSyncingWithSupabase, setIsSyncingWithSupabase] = useState<boolean>(false);

  // Check Supabase connectivity on mount
  useEffect(() => {
    testSupabaseConnection().then((res) => {
      setSupabaseStatus((prev) => ({
        ...prev,
        connected: res.connected,
        tablesExist: res.tablesExist,
        message: res.message,
      }));
    });
  }, []);

  const testSupabase = async () => {
    const res = await testSupabaseConnection();
    setSupabaseStatus((prev) => ({
      ...prev,
      connected: res.connected,
      tablesExist: res.tablesExist,
      message: res.message,
    }));
    addNotification('Supabase Test', res.message, res.connected ? 'info' : 'error');
    return res;
  };

  const syncOrdersWithSupabase = async () => {
    setIsSyncingWithSupabase(true);
    try {
      const res = await syncAllOrdersToSupabase(orders);
      setSupabaseStatus((prev) => ({
        ...prev,
        lastSyncTime: new Date().toLocaleTimeString(),
        message: res.details,
        tablesExist: res.syncedCount > 0 ? true : prev.tablesExist,
      }));
      addNotification('Supabase Sync', res.details, res.syncedCount > 0 ? 'success' : 'info');
      return res;
    } finally {
      setIsSyncingWithSupabase(false);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hoodihub_foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('hoodihub_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('hoodihub_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('hoodihub_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('hoodihub_delivery_partners', JSON.stringify(deliveryPartners));
  }, [deliveryPartners]);

  useEffect(() => {
    localStorage.setItem('hoodihub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('hoodihub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hoodihub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('hoodihub_applied_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hoodihub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hoodihub_user');
    }
  }, [currentUser]);

  const addNotification = (title: string, message: string, type: ToastNotification['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    const newNotif: ToastNotification = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 5)]);

    setTimeout(() => {
      dismissNotification(id);
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  const deliveryCharge =
    cartSubtotal >= settings.freeDeliveryThreshold || (appliedCoupon && appliedCoupon.code === 'FREEDEL')
      ? 0
      : settings.deliveryCharge;

  const discountAmount = appliedCoupon
    ? Math.min(
        (cartSubtotal * appliedCoupon.discountPercent) / 100,
        appliedCoupon.maxDiscount
      )
    : 0;

  const taxAmount = Number(((cartSubtotal * settings.taxPercentage) / 100).toFixed(2));
  const finalTotal = Number((cartSubtotal - discountAmount + deliveryCharge + taxAmount).toFixed(2));

  // Cart Operations
  const addToCart = (food: FoodItem, quantity: number = 1) => {
    if (!food.isAvailable) {
      addNotification('Item Unavailable', `${food.name} is currently out of stock`, 'warning');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.foodId === food.id);
      if (existing) {
        return prev.map((item) =>
          item.foodId === food.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { foodId: food.id, food, quantity }];
    });

    addNotification('Added to Cart', `${food.name} (${quantity}) added to your food basket`, 'success');
  };

  const removeFromCart = (foodId: string) => {
    const item = cart.find((i) => i.foodId === foodId);
    setCart((prev) => prev.filter((i) => i.foodId !== foodId));
    if (item) {
      addNotification('Removed from Cart', `${item.food.name} was removed`, 'info');
    }
  };

  const updateCartQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.foodId === foodId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const orderNow = (food: FoodItem, quantity: number = 1) => {
    if (!food.isAvailable) {
      addNotification('Item Unavailable', `${food.name} is currently out of stock`, 'warning');
      return;
    }

    // Add to cart if not present or ensure it's there
    setCart((prev) => {
      const existing = prev.find((item) => item.foodId === food.id);
      if (existing) {
        return prev.map((item) =>
          item.foodId === food.id ? { ...item, quantity: Math.max(item.quantity, quantity) } : item
        );
      }
      return [...prev, { foodId: food.id, food, quantity }];
    });

    // Close detail modal if open and transition to checkout immediately
    setSelectedFood(null);
    setActivePage('checkout');
    addNotification('Proceeding to Checkout', `Ready to place order for ${food.name}`, 'info');
  };

  const toggleWishlist = (foodId: string) => {
    const food = foods.find((f) => f.id === foodId);
    setWishlist((prev) => {
      const exists = prev.includes(foodId);
      if (exists) {
        addNotification('Wishlist Updated', `${food?.name || 'Item'} removed from favorites`, 'info');
        return prev.filter((id) => id !== foodId);
      } else {
        addNotification('Added to Wishlist', `${food?.name || 'Item'} saved to your favorites ❤️`, 'success');
        return [...prev, foodId];
      }
    });
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try HOODI50 or WELCOME100!' };
    }

    if (cartSubtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message: `Min order amount of ₹${coupon.minOrderAmount} required for this coupon`,
      };
    }

    setAppliedCoupon(coupon);
    addNotification('Coupon Applied!', `${coupon.code} applied: Save up to ₹${coupon.maxDiscount}`, 'success');
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addNotification('Coupon Removed', 'Coupon discount has been detached', 'info');
  };

  // Place Order
  const placeOrder = async (
    paymentMethod: PaymentMethod,
    specialInstructions?: string
  ): Promise<string> => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    // Pick an available delivery partner or the first one
    const availablePartner =
      deliveryPartners.find((p) => p.status === 'Available') || deliveryPartners[0];

    const newOrder: Order = {
      id: orderId,
      customerName: currentUser?.name || 'Dhanashri Kendre',
      customerPhone: currentUser?.phone || '+91 98201 45890',
      customerEmail: currentUser?.email || 'dhanashrikendre24@gmail.com',
      address: selectedAddress,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      deliveryCharge: deliveryCharge,
      taxes: taxAmount,
      totalAmount: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Cash on Delivery' : 'Paid',
      orderStatus: 'Order Placed',
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: 28,
      deliveryPartnerId: availablePartner?.id,
      deliveryPartnerName: availablePartner?.name,
      deliveryPartnerPhone: availablePartner?.phone,
      specialInstructions,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Save booking details to Supabase account (eqvocjukksgtqmgdbjog)
    saveOrderToSupabase(newOrder)
      .then((res) => {
        if (res.success) {
          setSupabaseStatus((prev) => ({
            ...prev,
            tablesExist: true,
            lastSyncTime: new Date().toLocaleTimeString(),
            message: `Order #${orderId} saved to Supabase!`,
          }));
          addNotification('Supabase Storage ☁️', `Order #${orderId} saved to your Supabase account!`, 'success');
        } else {
          setSupabaseStatus((prev) => ({
            ...prev,
            message: res.message,
            tablesExist: res.code === 'TABLE_NOT_FOUND' ? false : prev.tablesExist,
          }));
          if (res.code === 'TABLE_NOT_FOUND') {
            addNotification(
              'Supabase Storage Notice',
              'Connected to Supabase! Run the 1-click SQL setup in Admin Panel to create the orders table.',
              'info'
            );
          }
        }
      })
      .catch((err) => {
        console.warn('Supabase saveOrder exception:', err);
      });

    // Update partner status if assigned
    if (availablePartner) {
      setDeliveryPartners((prev) =>
        prev.map((dp) =>
          dp.id === availablePartner.id
            ? { ...dp, status: 'On Delivery', currentOrderId: orderId }
            : dp
        )
      );
    }

    clearCart();
    setTrackingOrderId(orderId);
    setActivePage('orders');
    addNotification('Order Confirmed! 🎉', `Order #${orderId} placed successfully. Track live progress!`, 'success');

    // Simulate order acceptance after 4 seconds
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId && o.orderStatus === 'Order Placed' ? { ...o, orderStatus: 'Confirmed' } : o))
      );
      updateOrderStatusInSupabase(orderId, 'Confirmed').catch(console.warn);
      addNotification('Order Confirmed by Restaurant', 'Chef has received your order and started prep!', 'info');
    }, 4000);

    return orderId;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: 'Cancelled' } : o))
    );
    updateOrderStatusInSupabase(orderId, 'Cancelled').catch(console.warn);
    addNotification('Order Cancelled', `Order #${orderId} was cancelled. Refund processed if paid online.`, 'warning');
  };

  const reorder = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    setCart(targetOrder.items.map((i) => ({ ...i })));
    setActivePage('cart');
    addNotification('Items Re-added', 'Previous order items added to cart', 'success');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: status,
            estimatedDeliveryMinutes:
              status === 'Delivered'
                ? 0
                : status === 'Out for Delivery'
                ? 10
                : status === 'Preparing'
                ? 20
                : o.estimatedDeliveryMinutes,
          };
        }
        return o;
      })
    );

    // If marked delivered, free up partner
    if (status === 'Delivered') {
      const order = orders.find((o) => o.id === orderId);
      if (order?.deliveryPartnerId) {
        setDeliveryPartners((prev) =>
          prev.map((dp) =>
            dp.id === order.deliveryPartnerId
              ? {
                  ...dp,
                  status: 'Available',
                  currentOrderId: undefined,
                  totalDeliveries: dp.totalDeliveries + 1,
                }
              : dp
          )
        );
      }
    }

    updateOrderStatusInSupabase(orderId, status).catch(console.warn);
    addNotification('Order Status Updated', `Order #${orderId} is now "${status}"`, 'info');
  };

  const assignDeliveryPartner = (orderId: string, partnerId: string) => {
    const partner = deliveryPartners.find((p) => p.id === partnerId);
    if (!partner) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              deliveryPartnerId: partner.id,
              deliveryPartnerName: partner.name,
              deliveryPartnerPhone: partner.phone,
              orderStatus: o.orderStatus === 'Ready' ? 'Out for Delivery' : o.orderStatus,
            }
          : o
      )
    );

    setDeliveryPartners((prev) =>
      prev.map((dp) =>
        dp.id === partnerId ? { ...dp, status: 'On Delivery', currentOrderId: orderId } : dp
      )
    );

    addNotification('Driver Assigned', `${partner.name} assigned to Order #${orderId}`, 'success');
  };

  // Food Management
  const addNewFood = (foodData: Omit<FoodItem, 'id' | 'number'>) => {
    const nextNum = Math.max(...foods.map((f) => f.number), 62) + 1;
    const newFood: FoodItem = {
      ...foodData,
      id: `food-${nextNum}`,
      number: nextNum,
      rating: 4.8,
      ratingCount: 1,
      reviews: [],
    };

    setFoods((prev) => [newFood, ...prev]);
    addNotification('Food Added', `${newFood.name} added to catalog`, 'success');
  };

  const updateFood = (updated: FoodItem) => {
    setFoods((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    addNotification('Food Updated', `${updated.name} details were saved`, 'success');
  };

  const deleteFood = (foodId: string) => {
    const food = foods.find((f) => f.id === foodId);
    setFoods((prev) => prev.filter((f) => f.id !== foodId));
    addNotification('Food Removed', `${food?.name || 'Item'} deleted from catalog`, 'warning');
  };

  const toggleFoodAvailability = (foodId: string) => {
    setFoods((prev) =>
      prev.map((f) => {
        if (f.id === foodId) {
          const nextState = !f.isAvailable;
          addNotification(
            'Availability Toggled',
            `${f.name} is now ${nextState ? 'In Stock' : 'Out of Stock'}`,
            nextState ? 'success' : 'info'
          );
          return { ...f, isAvailable: nextState };
        }
        return f;
      })
    );
  };

  const updateCategory = (updated: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    addNotification('Category Updated', `${updated.name} updated`, 'success');
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
    addNotification('Category Added', `${category.name} created`, 'success');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    addNotification('Category Deleted', 'Category removed', 'warning');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    addNotification('Offer Created', `Coupon code ${coupon.code} is now live`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    addNotification('Offer Deleted', `Coupon ${code} removed`, 'info');
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addNotification('Settings Saved', 'Website settings updated successfully', 'success');
  };

  const addDeliveryPartner = (partnerData: Omit<DeliveryPartner, 'id'>) => {
    const newPartner: DeliveryPartner = {
      ...partnerData,
      id: `dp-${Date.now().toString().slice(-4)}`,
    };
    setDeliveryPartners((prev) => [...prev, newPartner]);
    addNotification('Partner Added', `${newPartner.name} onboarded as delivery partner`, 'success');
  };

  const updateDeliveryPartnerStatus = (partnerId: string, status: DeliveryPartner['status']) => {
    setDeliveryPartners((prev) =>
      prev.map((dp) => (dp.id === partnerId ? { ...dp, status } : dp))
    );
    addNotification('Driver Status', `Delivery partner status changed to ${status}`, 'info');
  };

  const addReview = (foodId: string, rating: number, comment: string) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      userName: currentUser?.name || 'Dhanashri Kendre',
      rating,
      date: 'Just now',
      comment,
    };

    setFoods((prev) =>
      prev.map((f) => {
        if (f.id === foodId) {
          const updatedReviews = [newReview, ...f.reviews];
          const newAvgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...f,
            rating: newAvgRating,
            ratingCount: f.ratingCount + 1,
            reviews: updatedReviews,
          };
        }
        return f;
      })
    );

    addNotification('Review Submitted', 'Thank you for your rating & feedback! ⭐', 'success');
  };

  // Latur Delivery Areas & Location Modal
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [activeOtpCode, setActiveOtpCode] = useState('4281');

  const selectLaturArea = (area: string) => {
    setSelectedAddress((prev) => ({
      ...prev,
      area,
      city: 'Latur',
      pincode: '413512',
      street: prev.street || `${area} Road`,
      flatNo: prev.flatNo || 'House / Flat',
      lat: DEFAULT_LATUR_LOCATION.lat,
      lng: DEFAULT_LATUR_LOCATION.lng,
    }));
    addNotification('Delivery Area Selected', `Delivering to ${area}, Latur, Maharashtra (413512)`, 'success');
  };

  const requestCurrentLocation = async (): Promise<string> => {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locationStr = `📍 Latur, Maharashtra 413512 (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

            // Auto-update selected delivery address
            setSelectedAddress((prev) => ({
              ...prev,
              lat,
              lng,
              area: 'Shivaji Chowk',
              city: 'Latur',
              pincode: '413512',
            }));

            addNotification('Location Detected', `Detected location: Latur, Maharashtra (413512)`, 'success');
            resolve(locationStr);
          },
          () => {
            const fallbackStr = '📍 Shivaji Chowk, Latur, Maharashtra, India (413512)';
            setSelectedAddress((prev) => ({
              ...prev,
              area: 'Shivaji Chowk',
              city: 'Latur',
              pincode: '413512',
              lat: DEFAULT_LATUR_LOCATION.lat,
              lng: DEFAULT_LATUR_LOCATION.lng,
            }));
            addNotification('Location Notice', 'Using default location: Shivaji Chowk, Latur (413512)', 'info');
            resolve(fallbackStr);
          },
          { timeout: 5000 }
        );
      } else {
        const fallbackStr = '📍 Shivaji Chowk, Latur, Maharashtra, India (413512)';
        resolve(fallbackStr);
      }
    });
  };

  // Auth Methods
  const loginUser = (email: string, pass: string): { success: boolean; message: string } => {
    if (!email || !pass) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    if (pass.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters long.' };
    }

    const matchedUser: User = {
      id: currentUser?.id || `usr-${Date.now()}`,
      name: currentUser?.name || 'Dhanashri Kendre',
      email: email.trim().toLowerCase(),
      phone: currentUser?.phone || '+91 98201 45890',
      role: 'customer',
      addresses: currentUser?.addresses && currentUser.addresses.length > 0 ? currentUser.addresses : DEFAULT_USER.addresses,
    };

    setCurrentUser(matchedUser);
    addNotification('Login Successful', `Welcome back, ${matchedUser.name}!`, 'success');
    return { success: true, message: 'Login successful' };
  };

  const registerUser = (
    name: string,
    email: string,
    phone: string,
    pass: string
  ): { success: boolean; message: string } => {
    if (!name || !email || !phone || !pass) {
      return { success: false, message: 'Please fill in all registration fields.' };
    }

    if (pass.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: 'customer',
      addresses: [
        {
          id: `addr-${Date.now()}`,
          type: 'Home',
          name: name.trim(),
          phone: phone.trim(),
          flatNo: 'Plot 12',
          street: 'Main Road',
          landmark: 'Near Shivaji Chowk',
          area: 'Shivaji Chowk',
          city: 'Latur',
          pincode: '413512',
          isDefault: true,
          lat: DEFAULT_LATUR_LOCATION.lat,
          lng: DEFAULT_LATUR_LOCATION.lng,
        },
      ],
    };

    setCurrentUser(newUser);
    addNotification('Registration Complete', `Welcome to HoodiHub, ${newUser.name}!`, 'success');
    return { success: true, message: 'Account registered successfully!' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('hoodihub_user');
    addNotification('Logged Out', 'You have been safely signed out', 'info');
  };

  const sendOtp = async (email: string): Promise<string> => {
    const code = '4281';
    setActiveOtpCode(code);
    addNotification('OTP Sent', `Verification code sent to ${email} (Demo OTP: 4281)`, 'info');
    return code;
  };

  const verifyOtp = (enteredOtp: string): boolean => {
    return enteredOtp === activeOtpCode || enteredOtp === '4281';
  };

  const addUserAddress = (addrData: Omit<DeliveryAddress, 'id'>) => {
    const newAddr: DeliveryAddress = {
      ...addrData,
      id: `addr-${Date.now()}`,
    };

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        addresses: [...currentUser.addresses, newAddr],
      };
      setCurrentUser(updatedUser);
      setSelectedAddress(newAddr);
      addNotification('Address Added', `New ${newAddr.type} address saved in ${newAddr.area}, Latur`, 'success');
    } else {
      setSelectedAddress(newAddr);
      addNotification('Address Updated', `Delivery location set to ${newAddr.area}, Latur`, 'success');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activePanel,
        setActivePanel,
        activePage,
        setActivePage,
        selectedFood,
        setSelectedFood,
        trackingOrderId,
        setTrackingOrderId,
        foods,
        categories,
        restaurants,
        coupons,
        settings,
        currentUser,
        setCurrentUser,
        adminUser,
        setAdminUser,
        deliveryPartnerUser,
        setDeliveryPartnerUser,
        deliveryPartners,
        cart,
        wishlist,
        appliedCoupon,
        selectedAddress,
        setSelectedAddress,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        orderNow,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        cancelOrder,
        reorder,
        updateOrderStatus,
        assignDeliveryPartner,
        addNewFood,
        updateFood,
        deleteFood,
        toggleFoodAvailability,
        updateCategory,
        addCategory,
        deleteCategory,
        addCoupon,
        deleteCoupon,
        updateSettings,
        addDeliveryPartner,
        updateDeliveryPartnerStatus,
        addReview,
        searchKeyword,
        setSearchKeyword,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        priceFilter,
        setPriceFilter,
        ratingFilter,
        setRatingFilter,
        isVegOnly,
        setIsVegOnly,
        sortOrder,
        setSortOrder,
        requestCurrentLocation,
        addUserAddress,
        isLocationModalOpen,
        setIsLocationModalOpen,
        laturDeliveryAreas: LATUR_DELIVERY_AREAS,
        selectLaturArea,
        loginUser,
        registerUser,
        logoutUser,
        sendOtp,
        verifyOtp,
        activeOtpCode,
        notifications,
        addNotification,
        dismissNotification,
        // Supabase Cloud Storage
        supabaseProjectId: SUPABASE_PROJECT_ID,
        supabaseStatus,
        isSyncingWithSupabase,
        testSupabase,
        syncOrdersWithSupabase,
        supabaseSetupSql: SUPABASE_SETUP_SQL,
        cartSubtotal,
        deliveryCharge,
        discountAmount,
        taxAmount,
        finalTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
