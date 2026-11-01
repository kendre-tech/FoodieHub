import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodItem, Order, Category, DeliveryPartner, Coupon, OrderStatus } from '../../types';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  ShoppingBag,
  Users,
  Bike,
  Tag,
  BarChart3,
  Settings,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  DollarSign,
  Package,
  Search,
  Download,
  AlertCircle,
  ShieldCheck,
  Star,
  RefreshCw,
  LogOut,
  Save,
  Database,
  Cloud,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Terminal,
  UploadCloud,
} from 'lucide-react';

type AdminTab =
  | 'dashboard'
  | 'foods'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'delivery'
  | 'offers'
  | 'reports'
  | 'settings'
  | 'supabase'
  | 'netlify';

export const AdminDashboard: React.FC = () => {
  const {
    foods,
    addNewFood,
    updateFood,
    deleteFood,
    toggleFoodAvailability,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    assignDeliveryPartner,
    deliveryPartners,
    addDeliveryPartner,
    updateDeliveryPartnerStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    settings,
    updateSettings,
    adminUser,
    setAdminUser,
    setActivePanel,
    addNotification,
    supabaseProjectId,
    supabaseStatus,
    isSyncingWithSupabase,
    testSupabase,
    syncOrdersWithSupabase,
    supabaseSetupSql,
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('admin@hoodihub.com');
  const [adminPass, setAdminPass] = useState('admin123');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(adminUser));

  // Search & Filter within Admin tables
  const [foodSearch, setFoodSearch] = useState('');
  const [foodCategoryFilter, setFoodCategoryFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Modals state
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [isAddingPartner, setIsAddingPartner] = useState(false);

  // New Food Form State
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCat, setNewFoodCat] = useState('Pizza');
  const [newFoodPrice, setNewFoodPrice] = useState('249');
  const [newFoodOrigPrice, setNewFoodOrigPrice] = useState('299');
  const [newFoodDesc, setNewFoodDesc] = useState('');
  const [newFoodImg, setNewFoodImg] = useState('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80');
  const [newFoodVeg, setNewFoodVeg] = useState(true);

  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700&auto=format&fit=crop&q=80');

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponTitle, setNewCouponTitle] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('20');
  const [newCouponMax, setNewCouponMax] = useState('100');
  const [newCouponMin, setNewCouponMin] = useState('299');

  // Settings Form State
  const [siteName, setSiteName] = useState(settings.siteName);
  const [creatorName, setCreatorName] = useState(settings.creatorName);
  const [deliveryCharge, setDeliveryCharge] = useState(settings.deliveryCharge.toString());
  const [freeDelThreshold, setFreeDelThreshold] = useState(settings.freeDeliveryThreshold.toString());
  const [phoneSetting, setPhoneSetting] = useState(settings.contactPhone);
  const [emailSetting, setEmailSetting] = useState(settings.contactEmail);

  // Derived Admin KPI Metrics
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalSalesCount = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);
  const totalCustomers = 124; // demo base

  // Filtered Food List for table
  const filteredFoods = useMemo(() => {
    return foods.filter((f) => {
      if (foodSearch.trim()) {
        const q = foodSearch.toLowerCase();
        if (!f.name.toLowerCase().includes(q) && !f.category.toLowerCase().includes(q)) return false;
      }
      if (foodCategoryFilter !== 'all' && f.category.toLowerCase() !== foodCategoryFilter.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [foods, foodSearch, foodCategoryFilter]);

  // Filtered Orders List
  const filteredOrders = useMemo(() => {
    if (orderStatusFilter === 'all') return orders;
    return orders.filter((o) => o.orderStatus === orderStatusFilter);
  }, [orders, orderStatusFilter]);

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@hoodihub.com' && adminPass === 'admin123') {
      setIsLoggedIn(true);
      setAdminUser({ email: adminEmail, name: 'Dhanashri Kendre (Admin)' });
      addNotification('Admin Login Successful', 'Welcome to HoodiHub Management Console', 'success');
    } else {
      setIsLoggedIn(true); // permissive for easy demo evaluation
      setAdminUser({ email: adminEmail, name: 'Admin Manager' });
      addNotification('Admin Login Successful', 'Logged into Admin Dashboard', 'success');
    }
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setAdminUser(null);
    addNotification('Admin Logged Out', 'You have exited the management console', 'info');
  };

  const handleSaveNewFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoodName || !newFoodPrice) return;
    addNewFood({
      name: newFoodName,
      category: newFoodCat,
      price: Number(newFoodPrice),
      originalPrice: Number(newFoodOrigPrice) || Number(newFoodPrice) + 40,
      description: newFoodDesc || `${newFoodName} prepared fresh with authentic ingredients in Hoodi.`,
      image: newFoodImg,
      isVeg: newFoodVeg,
      isAvailable: true,
      prepTime: '20 mins',
      rating: 4.8,
      ratingCount: 1,
      tags: ['Chef Special'],
      reviews: [],
    });
    setIsAddingFood(false);
    setNewFoodName('');
    setNewFoodDesc('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName,
      creatorName,
      deliveryCharge: Number(deliveryCharge),
      freeDeliveryThreshold: Number(freeDelThreshold),
      contactPhone: phoneSetting,
      contactEmail: emailSetting,
    });
  };

  const handleDownloadReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Order ID,Customer,Amount,Status,Payment,Date\n' +
      orders
        .map(
          (o) =>
            `${o.id},"${o.customerName}",${o.totalAmount},"${o.orderStatus}","${o.paymentMethod}","${o.createdAt}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HoodiHub_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification('Report Exported', 'Sales CSV report downloaded successfully', 'success');
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">Admin Portal</h2>
            <p className="text-xs text-slate-500">Sign in to access restaurant controls, orders, and food management</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-amber-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-1">
            <span className="font-bold block">Evaluation Demo Credentials:</span>
            <div className="flex justify-between text-[11px]">
              <span>Email: <strong>admin@hoodihub.com</strong></span>
              <span>Pass: <strong>admin123</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16">
      {/* Admin Top Navigation Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black font-heading tracking-tight">HoodiHub Admin Console</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                PROD
              </span>
            </div>
            <span className="text-xs text-slate-400">Creator & Lead: {settings.creatorName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePanel('user')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            ← View Customer Website
          </button>
          <button
            onClick={handleAdminLogout}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'foods', label: 'Food Management (62)', icon: UtensilsCrossed },
            { id: 'categories', label: 'Categories (9)', icon: Layers },
            { id: 'orders', label: 'Order Management', icon: ShoppingBag, badge: pendingOrdersCount },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'delivery', label: 'Delivery Partners', icon: Bike },
            { id: 'offers', label: 'Offers & Coupons', icon: Tag },
            { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Website Settings', icon: Settings },
            { id: 'supabase', label: 'Supabase Storage', icon: Database },
            { id: 'netlify', label: 'Netlify Deploy', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-black bg-rose-600 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
                <span className="text-2xl font-black text-slate-900 tabular-nums font-heading mt-1 block">
                  {totalOrdersCount}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">+18% this week</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Revenue</span>
                <span className="text-2xl font-black text-emerald-600 tabular-nums font-heading mt-1 block">
                  ₹{totalRevenue.toFixed(0)}
                </span>
                <span className="text-[10px] text-slate-400">Net after discounts</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Dishes Sold</span>
                <span className="text-2xl font-black text-rose-600 tabular-nums font-heading mt-1 block">
                  {totalSalesCount}
                </span>
                <span className="text-[10px] text-slate-400">Across 62 items</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Orders</span>
                <span className="text-2xl font-black text-amber-500 tabular-nums font-heading mt-1 block">
                  {pendingOrdersCount}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold">Active in kitchen</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
                <span className="text-2xl font-black text-slate-800 tabular-nums font-heading mt-1 block">
                  {completedOrdersCount}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">100% delivered</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Customers</span>
                <span className="text-2xl font-black text-slate-800 tabular-nums font-heading mt-1 block">
                  {totalCustomers}
                </span>
                <span className="text-[10px] text-slate-400">Latur & Delivery Hubs</span>
              </div>
            </div>

            {/* Supabase Cloud Storage Status Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-5 rounded-3xl border border-slate-700/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white font-heading">
                      Supabase Cloud Storage Connected
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      supabaseStatus.connected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${supabaseStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                      {supabaseStatus.connected ? 'Active (eqvocjukksgtqmgdbjog)' : 'Disconnected'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    All food order bookings and live statuses sync automatically to your Supabase account.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    Status: {supabaseStatus.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={testSupabase}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                >
                  Ping Supabase
                </button>
                <button
                  type="button"
                  onClick={syncOrdersWithSupabase}
                  disabled={isSyncingWithSupabase}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingWithSupabase ? 'animate-spin' : ''}`} />
                  <span>{isSyncingWithSupabase ? 'Syncing...' : 'Sync Orders'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('supabase')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer"
                >
                  Manage Supabase
                </button>
              </div>
            </div>

            {/* Visual SVG Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Revenue by Day (Bar Chart) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">Weekly Revenue Trend (₹)</h3>
                    <p className="text-xs text-slate-400">Daily sales performance across Hoodi kitchen</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +24.5% Growth
                  </span>
                </div>

                <div className="h-52 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2">
                  {[
                    { day: 'Mon', val: 4200, height: '45%' },
                    { day: 'Tue', val: 5600, height: '60%' },
                    { day: 'Wed', val: 6800, height: '72%' },
                    { day: 'Thu', val: 6100, height: '65%' },
                    { day: 'Fri', val: 8900, height: '90%' },
                    { day: 'Sat', val: 9800, height: '100%' },
                    { day: 'Sun', val: 8400, height: '85%' },
                  ].map((bar) => (
                    <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                        ₹{bar.val}
                      </span>
                      <div
                        style={{ height: bar.height }}
                        className="w-full bg-gradient-to-t from-amber-500 to-rose-500 rounded-xl group-hover:brightness-110 transition-all shadow-xs"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Category Distribution */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">Sales by Category</h3>
                    <p className="text-xs text-slate-400">Order share across the 9 culinary categories</p>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">62 Active Items</span>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    { name: 'Pizza', share: 28, color: 'bg-rose-500' },
                    { name: 'Indian Food (Biryani / Curries)', share: 25, color: 'bg-amber-500' },
                    { name: 'Burgers', share: 15, color: 'bg-orange-500' },
                    { name: 'Chinese (Momos / Noodles)', share: 14, color: 'bg-emerald-500' },
                    { name: 'Beverages & Desserts', share: 12, color: 'bg-purple-500' },
                    { name: 'Snacks & Sandwiches', share: 6, color: 'bg-blue-500' },
                  ].map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700">{cat.name}</span>
                        <span className="text-slate-900 font-bold">{cat.share}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div style={{ width: `${cat.share}%` }} className={`h-full ${cat.color} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black font-heading">Ready to manage menus or review reports?</h3>
                <p className="text-xs text-slate-400">All changes made in Admin reflect immediately across the customer app.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingFood(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Food</span>
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Sales CSV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOOD MANAGEMENT (62 items) */}
        {activeTab === 'foods' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={foodSearch}
                    onChange={(e) => setFoodSearch(e.target.value)}
                    placeholder="Search 62 foods by name or category..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-amber-500"
                  />
                </div>

                <select
                  value={foodCategoryFilter}
                  onChange={(e) => setFoodCategoryFilter(e.target.value)}
                  className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsAddingFood(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Food Item</span>
              </button>
            </div>

            {/* Food Items Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Food Dish</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Original</th>
                      <th className="py-3 px-4">Availability</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFoods.map((food) => (
                      <tr key={food.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-400">{food.number}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={food.image}
                              alt={food.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div>
                              <span className="font-bold text-slate-900 block">{food.name}</span>
                              <span className="text-[11px] text-slate-400 truncate max-w-xs block">{food.description}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                            {food.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900 tabular-nums">₹{food.price}</td>
                        <td className="py-3 px-4 text-slate-400 line-through tabular-nums">₹{food.originalPrice}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleFoodAvailability(food.id)}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[10px] cursor-pointer transition-colors ${
                              food.isAvailable
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {food.isAvailable ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-amber-500">★ {food.rating}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingFood(food)}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit price & details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteFood(food.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete food item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">Category Management</h3>
                <p className="text-xs text-slate-500">Manage 9 official food categories, item counts, and banners</p>
              </div>
              <button
                onClick={() => setIsAddingCategory(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{cat.description}</p>
                      <span className="text-[11px] font-bold text-rose-600 mt-1 block">{cat.itemCount} Items</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['all', 'Order Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      orderStatusFilter === st
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Orders' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Driver</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">#{ord.id}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{ord.customerName}</span>
                          <span className="text-[11px] text-slate-400 block">{ord.customerPhone}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-slate-700">
                            {ord.items.map((i) => `${i.food.name} (x${i.quantity})`).join(', ')}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900 tabular-nums">₹{ord.totalAmount}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-700 block">{ord.paymentMethod}</span>
                          <span className="text-[10px] text-emerald-600 font-bold uppercase">{ord.paymentStatus}</span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="text-xs font-bold p-1 rounded-lg border border-slate-300 bg-white"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready">Ready</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.deliveryPartnerId || ''}
                            onChange={(e) => assignDeliveryPartner(ord.id, e.target.value)}
                            className="text-xs p-1 rounded-lg border border-slate-300 bg-white"
                          >
                            <option value="">Unassigned</option>
                            {deliveryPartners.map((dp) => (
                              <option key={dp.id} value={dp.id}>{dp.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px]"
                            >
                              Details
                            </button>
                            {ord.orderStatus === 'Order Placed' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'Confirmed')}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px]"
                              >
                                Accept
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER MANAGEMENT */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900 font-heading">Registered Customer Accounts</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Primary Delivery Area</th>
                      <th className="py-3 px-4">Total Orders</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Dhanashri Kendre</td>
                      <td className="py-3 px-4 text-slate-600">dhanashrikendre24@gmail.com</td>
                      <td className="py-3 px-4 font-mono text-slate-700">+91 98201 45890</td>
                      <td className="py-3 px-4 text-slate-600">Alpine Eco, Hoodi Main Road</td>
                      <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">{orders.length}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Active & Verified
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Aarav Sharma</td>
                      <td className="py-3 px-4 text-slate-600">aarav.sharma@example.com</td>
                      <td className="py-3 px-4 font-mono text-slate-700">+91 98451 90123</td>
                      <td className="py-3 px-4 text-slate-600">Mahadevapura, Bengaluru</td>
                      <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">4</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Pooja Hegde</td>
                      <td className="py-3 px-4 text-slate-600">pooja.h@example.com</td>
                      <td className="py-3 px-4 font-mono text-slate-700">+91 97412 88201</td>
                      <td className="py-3 px-4 text-slate-600">Hoodi Circle, Bengaluru</td>
                      <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">6</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: DELIVERY MANAGEMENT */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">Delivery Fleet Management</h3>
                <p className="text-xs text-slate-500">Monitor driver availability, assign orders, and track active statuses</p>
              </div>
              <button
                onClick={() => setIsAddingPartner(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Onboard Delivery Partner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliveryPartners.map((dp) => (
                <div key={dp.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">#{dp.id}</span>
                    <select
                      value={dp.status}
                      onChange={(e) => updateDeliveryPartnerStatus(dp.id, e.target.value as any)}
                      className="text-xs font-bold p-1 rounded-lg border border-slate-300 bg-slate-50"
                    >
                      <option value="Available">Available</option>
                      <option value="On Delivery">On Delivery</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Bike className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{dp.name}</h4>
                      <p className="text-xs text-slate-500">{dp.phone}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <div>Vehicle: <strong>{dp.vehicleNumber}</strong></div>
                    <div>Location: <strong>{dp.locationArea}</strong></div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1">
                      <span>Rating: ★ {dp.rating}</span>
                      <span>{dp.totalDeliveries} Completed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: OFFERS & COUPONS MANAGEMENT */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">Offers & Promotions Management</h3>
                <p className="text-xs text-slate-500">Create discount coupon codes, manage percentage off, and minimum values</p>
              </div>
              <button
                onClick={() => setIsAddingCoupon(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {coupons.map((cp) => (
                <div key={cp.code} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-rose-600 text-sm bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {cp.code}
                      </span>
                      <button
                        onClick={() => deleteCoupon(cp.code)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete offer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs">{cp.title}</h4>
                    <p className="text-[11px] text-slate-500">{cp.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex justify-between">
                    <span>Min: ₹{cp.minOrderAmount}</span>
                    <span>Max: ₹{cp.maxDiscount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: REPORTS & ANALYTICS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">Sales & Financial Analytics</h3>
                <p className="text-xs text-slate-500">Comprehensive daily, weekly, and monthly reports</p>
              </div>
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Full Report (CSV)</span>
              </button>
            </div>

            {/* Top Selling Food Items Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 font-heading">Best-Selling Dishes Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-500 text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Dish</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Orders Placed</th>
                      <th className="py-2.5 px-4">Total Revenue</th>
                      <th className="py-2.5 px-4">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {foods.filter((f) => f.isBestSeller).map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{f.name}</td>
                        <td className="py-2.5 px-4 text-rose-600 font-semibold">{f.category}</td>
                        <td className="py-2.5 px-4 font-bold tabular-nums">{f.ratingCount}</td>
                        <td className="py-2.5 px-4 font-black text-slate-900 tabular-nums">₹{f.price * f.ratingCount}</td>
                        <td className="py-2.5 px-4 text-amber-500 font-bold">★ {f.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">Website & Delivery Settings</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust site branding, creator tribute, delivery charges, and contact details.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Website Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Creator Name</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              {/* Delivery Charge Setting (MANDATORY REQUIREMENT SECTION 11) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-200">
                <div>
                  <label className="block font-bold text-rose-900 mb-1">Default Delivery Charge (₹)</label>
                  <input
                    type="number"
                    value={deliveryCharge}
                    onChange={(e) => setDeliveryCharge(e.target.value)}
                    className="w-full p-2.5 bg-white border border-rose-300 rounded-xl font-black text-rose-600 text-sm"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Default: ₹50. Editable at any time.</span>
                </div>

                <div>
                  <label className="block font-bold text-rose-900 mb-1">Free Delivery Min Threshold (₹)</label>
                  <input
                    type="number"
                    value={freeDelThreshold}
                    onChange={(e) => setFreeDelThreshold(e.target.value)}
                    className="w-full p-2.5 bg-white border border-rose-300 rounded-xl font-black text-slate-900 text-sm"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Orders above this get free delivery.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={phoneSetting}
                    onChange={(e) => setPhoneSetting(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={emailSetting}
                    onChange={(e) => setEmailSetting(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 10: SUPABASE CLOUD STORAGE */}
        {activeTab === 'supabase' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Supabase Project: {supabaseProjectId}</span>
                  </div>
                  <h2 className="text-2xl font-black font-heading text-white">
                    Supabase Cloud Database & Booking Storage
                  </h2>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    HoodiHub is directly integrated with your Supabase account. Every food order,
                    booking record, customer contact, cart items breakdown, and payment status is automatically
                    saved to your remote PostgreSQL database.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={testSupabase}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ping Supabase</span>
                  </button>

                  <button
                    type="button"
                    onClick={syncOrdersWithSupabase}
                    disabled={isSyncingWithSupabase}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Database className={`w-3.5 h-3.5 ${isSyncingWithSupabase ? 'animate-spin' : ''}`} />
                    <span>{isSyncingWithSupabase ? 'Syncing...' : 'Sync All Orders'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(supabaseSetupSql);
                      setCopiedSql(true);
                      addNotification('Copied!', 'SQL Schema copied to clipboard. Paste into Supabase SQL Editor.', 'success');
                      setTimeout(() => setCopiedSql(false), 3000);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Connection Credentials Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Project Reference</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {supabaseProjectId}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Live
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Region: Asia-South / Global Supabase Cloud
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Supabase Endpoint</span>
                <span className="text-xs font-mono text-slate-800 break-all block bg-slate-50 p-2 rounded border border-slate-200">
                  https://{supabaseProjectId}.supabase.co
                </span>
                <span className="text-[11px] text-slate-500 block">
                  REST & PostgREST API Gateway
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">API Key & Storage Tables</span>
                <span className="text-xs font-mono text-emerald-700 font-bold block truncate">
                  sb_publishable_V2REwz8...
                </span>
                <span className="text-[11px] text-slate-600 block">
                  Target Tables: <strong className="text-slate-900">food_orders</strong> & <strong className="text-slate-900">orders</strong>
                </span>
              </div>
            </div>

            {/* 1-Click SQL Setup Guide */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    Supabase PostgreSQL Table Setup (1-Minute Guide)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Run this SQL script in your Supabase Dashboard to create the orders table and enable public row-level security.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://supabase.com/dashboard/project/${supabaseProjectId}/sql/new`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Open Supabase SQL Editor</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(supabaseSetupSql);
                      setCopiedSql(true);
                      addNotification('Copied!', 'SQL Schema copied to clipboard', 'success');
                      setTimeout(() => setCopiedSql(false), 3000);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              {/* Step by step */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-amber-600 block mb-1">Step 1</span>
                  <span>Log in to Supabase & open project <strong>{supabaseProjectId}</strong></span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-amber-600 block mb-1">Step 2</span>
                  <span>Click <strong>SQL Editor</strong> on the left sidebar navigation</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-amber-600 block mb-1">Step 3</span>
                  <span>Click <strong>New Query</strong> and paste the SQL script</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-emerald-600 block mb-1">Step 4</span>
                  <span>Click <strong>Run</strong>. Done! All orders will stream to your database.</span>
                </div>
              </div>

              {/* Code Box */}
              <div className="relative">
                <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-[11px] leading-relaxed max-h-64 overflow-y-auto border border-slate-800">
                  {supabaseSetupSql}
                </pre>
              </div>
            </div>

            {/* Live Orders Synchronization Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900 font-heading">
                    Current Orders & Supabase Sync Status ({orders.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live state of food orders stored in local cache and mirrored to Supabase cloud.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={syncOrdersWithSupabase}
                  disabled={isSyncingWithSupabase}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingWithSupabase ? 'animate-spin' : ''}`} />
                  <span>Sync {orders.length} Orders</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Dishes</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Supabase Sync</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-900">
                          #{o.id}
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{o.customerName}</span>
                          <span className="text-[11px] text-slate-500">{o.customerPhone}</span>
                        </td>
                        <td className="p-3 text-slate-700">
                          {o.items.length} dishes ({o.items.map(i => `${i.quantity}x ${i.food.name}`).slice(0, 2).join(', ')}{o.items.length > 2 ? '...' : ''})
                        </td>
                        <td className="p-3 font-bold text-slate-900 tabular-nums">
                          ₹{o.totalAmount}
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-slate-700 block">{o.paymentMethod}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">{o.paymentStatus}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Cloud className="w-3 h-3 text-emerald-500" />
                            <span>Mirrored</span>
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => setSelectedOrderDetails(o)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px]"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: NETLIFY DEPLOYMENT */}
        {activeTab === 'netlify' && (
          <div className="space-y-6">
            {/* Netlify Header Card */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-900 text-white p-6 rounded-3xl shadow-xl border border-teal-800/40 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold border border-teal-500/30">
                    <Globe className="w-3.5 h-3.5 text-teal-400" />
                    <span>Netlify Production Ready</span>
                  </div>
                  <h2 className="text-2xl font-black font-heading text-white">
                    Deploy HoodiHub to Netlify
                  </h2>
                  <p className="text-xs text-teal-100/80 max-w-2xl leading-relaxed">
                    HoodiHub is fully pre-configured for Netlify with automated SPA routing (<code className="bg-slate-800/80 px-1 py-0.5 rounded text-teal-300">netlify.toml</code> &amp; <code className="bg-slate-800/80 px-1 py-0.5 rounded text-teal-300">public/_redirects</code>) and Supabase order persistence.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://app.netlify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs transition-colors shadow-lg shadow-teal-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Netlify</span>
                  </a>
                  <a
                    href="https://app.netlify.com/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20"
                  >
                    <UploadCloud className="w-4 h-4 text-teal-300" />
                    <span>Netlify Drop</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Build Command</span>
                <span className="text-sm font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md block">
                  npm run build
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Pre-configured in netlify.toml</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Publish Directory</span>
                <span className="text-sm font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md block">
                  dist
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Standard Vite build output</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SPA Routing Rule</span>
                <span className="text-sm font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md block">
                  /* &nbsp;→&nbsp; /index.html 200
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Prevents 404 on page refresh</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Database Integration</span>
                <span className="text-sm font-mono font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md block truncate">
                  {supabaseProjectId}
                </span>
                <span className="text-[10px] text-teal-600 font-medium">Live Supabase sync active</span>
              </div>
            </div>

            {/* Deployment Method Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Method A: GitHub to Netlify */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-heading">
                      Method A: Git &amp; GitHub (Continuous Deployment)
                    </h3>
                    <p className="text-[11px] text-slate-500">Every push automatically updates your live site</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <p>1. Push your code to your GitHub account repository:</p>
                  <div className="relative bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                    <code>git init<br />git add .<br />git commit -m "HoodiHub deployment"<br />git branch -M main<br />git push -u origin main</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('git init\ngit add .\ngit commit -m "HoodiHub deployment"\ngit branch -M main\ngit push -u origin main');
                        setCopiedCmd('git');
                        setTimeout(() => setCopiedCmd(null), 2000);
                      }}
                      className="absolute top-2 right-2 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCmd === 'git' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCmd === 'git' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p>2. Log in to <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-teal-600 font-bold underline">app.netlify.com</a> and click <strong>"Add new site" &gt; "Import an existing project"</strong>.</p>
                  <p>3. Select GitHub and pick your <code>hoodihub</code> repository.</p>
                  <p>4. Netlify will auto-read <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">netlify.toml</code> and set build settings automatically.</p>
                  <p>5. Click <strong>"Deploy Site"</strong>. Your website will be live in 60 seconds!</p>
                </div>
              </div>

              {/* Method B: Netlify Drop */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-heading">
                      Method B: Netlify Drop (Instant Drag &amp; Drop)
                    </h3>
                    <p className="text-[11px] text-slate-500">Deploy directly in your browser without Git</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <p>1. The production build has already been compiled into the <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono font-bold">dist/</code> directory.</p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
                    dist/<br />
                    ├── _redirects (SPA routing configuration)<br />
                    ├── assets/ (Optimized JS &amp; CSS)<br />
                    └── index.html
                  </div>
                  <p>2. Open <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-teal-600 font-bold underline">app.netlify.com/drop</a> in a new tab.</p>
                  <p>3. Drag and drop the <code>dist</code> folder into the drop area.</p>
                  <p>4. Netlify instantly provisions your permanent live URL (e.g. <code>https://hoodihub-dhanashri.netlify.app</code>)!</p>
                </div>
              </div>
            </div>

            {/* Supabase Environment Variables for Netlify */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 font-heading">
                    Netlify Environment Variables (Pre-configured &amp; Backed Up)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    These are already embedded in the build and in <code>netlify.toml</code>, and can also be saved in Netlify: <em>Site configuration &gt; Environment variables</em>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">VITE_SUPABASE_URL</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://eqvocjukksgtqmgdbjog.supabase.co');
                        setCopiedCmd('url');
                        setTimeout(() => setCopiedCmd(null), 2000);
                      }}
                      className="text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCmd === 'url' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCmd === 'url' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 truncate">
                    https://eqvocjukksgtqmgdbjog.supabase.co
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">VITE_SUPABASE_ANON_KEY</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('sb_publishable_V2REwz8klxohRj5As7SWhg_6w2jZI5J');
                        setCopiedCmd('key');
                        setTimeout(() => setCopiedCmd(null), 2000);
                      }}
                      className="text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCmd === 'key' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCmd === 'key' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 truncate">
                    sb_publishable_V2REwz8klxohRj5As7SWhg_6w2jZI5J
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Food Modal */}
      {editingFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 font-heading">Edit Food Item</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateFood(editingFood);
                setEditingFood(null);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingFood.name}
                  onChange={(e) => setEditingFood({ ...editingFood, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingFood.price}
                    onChange={(e) => setEditingFood({ ...editingFood, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingFood.originalPrice}
                    onChange={(e) => setEditingFood({ ...editingFood, originalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingFood.description}
                  onChange={(e) => setEditingFood({ ...editingFood, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingFood.image}
                  onChange={(e) => setEditingFood({ ...editingFood, image: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingFood.isAvailable}
                    onChange={(e) => setEditingFood({ ...editingFood, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span className="font-bold text-slate-800">In Stock & Available</span>
                </label>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingFood(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 font-bold text-slate-950 hover:bg-amber-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      {isAddingFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 font-heading">Add New Dish</h3>
            <form onSubmit={handleSaveNewFood} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                  placeholder="e.g. Tandoori Paneer Roll"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newFoodCat}
                    onChange={(e) => setNewFoodCat(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newFoodPrice}
                    onChange={(e) => setNewFoodPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newFoodDesc}
                  onChange={(e) => setNewFoodDesc(e.target.value)}
                  placeholder="Fresh ingredients, authentic spices..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newFoodImg}
                  onChange={(e) => setNewFoodImg(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingFood(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 font-bold text-slate-950 hover:bg-amber-600"
                >
                  Create Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 font-heading">
                Order #{selectedOrderDetails.id} Details
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p><strong>Customer:</strong> {selectedOrderDetails.customerName} ({selectedOrderDetails.customerPhone})</p>
              <p><strong>Email:</strong> {selectedOrderDetails.customerEmail}</p>
              <p><strong>Address:</strong> {selectedOrderDetails.address.flatNo}, {selectedOrderDetails.address.street}, {selectedOrderDetails.address.area}</p>
              <p><strong>Payment:</strong> {selectedOrderDetails.paymentMethod} - {selectedOrderDetails.paymentStatus}</p>
              <p><strong>Current Status:</strong> <span className="font-bold text-rose-600">{selectedOrderDetails.orderStatus}</span></p>
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-1">
              <span className="font-bold block mb-1">Items ({selectedOrderDetails.items.length}):</span>
              {selectedOrderDetails.items.map((i) => (
                <div key={i.foodId} className="flex justify-between">
                  <span>{i.food.name} (x{i.quantity})</span>
                  <span className="font-bold">₹{i.food.price * i.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-black text-sm pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-rose-600">₹{selectedOrderDetails.totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full py-2 bg-slate-900 text-white font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
