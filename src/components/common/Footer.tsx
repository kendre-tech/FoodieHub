import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Bike,
  Award,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePanel, setActivePage, setSelectedCategoryFilter, settings } = useApp();

  const handleCategoryClick = (catName: string) => {
    setActivePanel('user');
    setSelectedCategoryFilter(catName);
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Creator Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white font-heading">
                  Hoodi<span className="text-rose-500">Hub</span>
                </span>
                <p className="text-xs text-rose-400 font-medium">Food Ordering & Delivery</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              HoodiHub is Latur's premier hyper-local food discovery and delivery platform.
              Crafted with passion to bring hot, hygienic, and restaurant-quality gourmet meals
              right to your doorstep across Shivaji Chowk, Gandhi Chowk, Ausa Road, and all of Latur.
            </p>

            {/* Prominent Creator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl">
              <Award className="w-4 h-4 text-amber-400" />
              <div className="text-xs">
                <span className="text-slate-400">Created by </span>
                <span className="font-bold text-white tracking-wide">{settings.creatorName}</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('restaurants');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Popular Restaurants
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('offers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Special Offers & Deals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('search');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Search 62 Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Order History & Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePanel('user');
                    setActivePage('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  My Profile & Addresses
                </button>
              </li>
            </ul>
          </div>

          {/* 9 Food Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Food Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Pizza', 'Burgers', 'Chinese', 'Indian Food', 'Sandwiches', 'Pasta', 'Snacks', 'Beverages', 'Desserts'].map(
                (cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className="hover:text-rose-400 transition-colors flex items-center justify-between w-full text-left"
                    >
                      <span>{cat}</span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Operations & Portal Panels */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Portals & Control</h4>
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setActivePanel('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-amber-500/50 hover:bg-slate-850 transition-all text-xs"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Admin Dashboard</div>
                  <div className="text-[11px] text-slate-400">Manage foods, orders, prices</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setActivePanel('delivery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-emerald-500/50 hover:bg-slate-850 transition-all text-xs"
              >
                <Bike className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Delivery Partner Panel</div>
                  <div className="text-[11px] text-slate-400">Driver route & order updates</div>
                </div>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Open 24/7 across Latur (413512)</span>
              </div>
              <p className="text-[11px] text-slate-500">Average prep & delivery under 30 minutes</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Exclusive Creator Tribute */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <span className="text-white font-semibold">HoodiHub</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-slate-300">
            <span>Built with dedication & culinary love by</span>
            <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Dhanashri Kendre
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>FSSAI Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
