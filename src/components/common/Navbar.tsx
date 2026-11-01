import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Search,
  Heart,
  ShoppingBag,
  Clock,
  User as UserIcon,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  Bike,
  Percent,
  Compass,
  ChevronDown,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePanel,
    setActivePanel,
    activePage,
    setActivePage,
    cart,
    wishlist,
    selectedAddress,
    setIsLocationModalOpen,
    currentUser,
    logoutUser,
    setSearchKeyword,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishCount = wishlist.length;

  const navLinks = [
    { id: 'home', label: 'Home', icon: UtensilsCrossed },
    { id: 'restaurants', label: 'Restaurants', icon: Compass },
    { id: 'offers', label: 'Offers', icon: Percent },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishCount },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartItemCount },
    { id: 'orders', label: 'My Orders', icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top Banner with Location highlights & Panel Switcher */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium text-white">HoodiHub Express</span>
          <span className="hidden sm:inline text-slate-400">
            · Serving Latur, Maharashtra (413512) · Delivery: ₹50
          </span>
        </div>

        {/* Panel Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          <button
            onClick={() => {
              setActivePanel('user');
              setActivePage('home');
            }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activePanel === 'user'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Customer Food Ordering Panel"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>User Panel</span>
          </button>

          <button
            onClick={() => setActivePanel('admin')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activePanel === 'admin'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Restaurant & Admin Management Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </button>

          <button
            onClick={() => setActivePanel('delivery')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activePanel === 'delivery'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Delivery Partner Dashboard & GPS Navigation"
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Delivery Panel</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-3 lg:gap-5 shrink-0">
            <button
              onClick={() => {
                setActivePanel('user');
                setActivePage('home');
              }}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                    Hoodi<span className="text-rose-600">Hub</span>
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 uppercase tracking-wider">
                    Latur
                  </span>
                </div>
              </div>
            </button>

            {/* Location Selector (Opens Latur Location Selection Modal) */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 max-w-[240px] truncate group cursor-pointer"
              title="Click to select Latur delivery area or detect GPS location"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <div className="truncate text-left leading-tight">
                <span className="font-bold text-slate-900 block truncate">
                  {selectedAddress.area || 'Shivaji Chowk'}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  Latur, MH (413512)
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 shrink-0 ml-1" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePanel === 'user' && activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage(link.id as any);
                    if (link.id === 'search') {
                      setSearchKeyword('');
                    }
                  }}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-rose-600 bg-rose-50/80 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
                  <span>{link.label}</span>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[11px] font-bold bg-rose-600 text-white rounded-full min-w-[18px] text-center shadow-xs">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Auth Action Buttons: Login / Register OR Profile Menu */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('profile');
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    activePanel === 'user' && activePage === 'profile'
                      ? 'border-rose-400 bg-rose-50 text-rose-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={logoutUser}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('login');
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activePanel === 'user' && activePage === 'login'
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('register');
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Bar: Location, Cart & Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="p-1.5 text-slate-700 hover:text-rose-600 rounded-lg hover:bg-slate-100 flex items-center gap-1 text-xs font-bold"
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              <span className="max-w-[70px] truncate">{selectedAddress.area || 'Latur'}</span>
            </button>

            <button
              onClick={() => {
                setActivePanel('user');
                setActivePage('cart');
              }}
              className="relative p-2 text-slate-700 hover:text-rose-600 rounded-lg hover:bg-slate-100"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-rose-600 text-white rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3">
          {/* Location button for mobile */}
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-700 min-w-0">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="truncate">{selectedAddress.area}, Latur (413512)</span>
            </div>
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded"
            >
              Change
            </button>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePanel === 'user' && activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage(link.id as any);
                    setMobileMenuOpen(false);
                    if (link.id === 'search') {
                      setSearchKeyword('');
                    }
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-xs font-bold bg-rose-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Auth Section */}
          <div className="pt-2 border-t border-slate-100">
            {currentUser ? (
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-400 block">{currentUser.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setActivePage('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 px-2 py-1"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-rose-600 px-2 py-1"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('register');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-center text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Panel Switcher on Mobile */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Switch Application Panel
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setActivePanel('user');
                  setActivePage('home');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-xs font-semibold text-center rounded-lg border ${
                  activePanel === 'user'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                User Panel
              </button>
              <button
                onClick={() => {
                  setActivePanel('admin');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-xs font-semibold text-center rounded-lg border ${
                  activePanel === 'admin'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Admin Panel
              </button>
              <button
                onClick={() => {
                  setActivePanel('delivery');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 text-xs font-semibold text-center rounded-lg border ${
                  activePanel === 'delivery'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Delivery Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
