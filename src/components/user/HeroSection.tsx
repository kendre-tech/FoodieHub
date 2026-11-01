import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    foods,
    searchKeyword,
    setSearchKeyword,
    setSelectedFood,
    setActivePage,
    setSelectedCategoryFilter,
    requestCurrentLocation,
    selectedAddress,
    setIsLocationModalOpen,
    selectLaturArea,
    laturDeliveryAreas,
  } = useApp();

  const [inputVal, setInputVal] = useState(searchKeyword);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locLoading, setLocLoading] = useState(false);

  const heroImage = '/src/assets/images/hero_food_platter_1793505373019.jpg';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(inputVal);
    setActivePage('search');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (food: any) => {
    setSelectedFood(food);
    setShowSuggestions(false);
  };

  const matchingSuggestions = inputVal.trim()
    ? foods
        .filter(
          (f) =>
            f.name.toLowerCase().includes(inputVal.toLowerCase()) ||
            f.category.toLowerCase().includes(inputVal.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const quickCategories = ['Pizza', 'Burgers', 'Chinese', 'Indian Food', 'Desserts'];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-12 lg:py-16">
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={heroImage}
          alt="Gourmet Food Feast HoodiHub"
          className="w-full h-full object-cover scale-105 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Search & Filters */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Latur's #1 Gourmet Food Ordering Platform · 413512</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-heading">
              Craving Delicious Food in Latur?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-400 to-amber-400">
                Hot & Delivered in 30 Mins.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Explore 62 signature chef-crafted dishes spanning artisan pizzas, juicy burgers,
              steaming dimsums, rich royal biryanis, and indulgent desserts delivered across Latur, Maharashtra.
            </p>

            {/* Search Bar with Live Suggestions */}
            <div className="relative max-w-xl">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-2xl border border-white/20">
                <div className="flex items-center gap-2 pl-3 flex-1">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search for Margherita, Biryani, Burgers, Pasta..."
                    className="w-full text-slate-900 placeholder:text-slate-400 text-sm py-2 focus:outline-hidden font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Search Food</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && matchingSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-30 text-slate-900 divide-y divide-slate-100">
                  {matchingSuggestions.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => handleSuggestionClick(food)}
                      className="p-3 hover:bg-rose-50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-10 h-10 rounded-lg object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{food.name}</h4>
                          <span className="text-[11px] text-slate-500">{food.category} · #{food.number}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900">₹{food.price}</span>
                        <span className="block text-[10px] text-emerald-600 font-semibold">★ {food.rating}</span>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={handleSearchSubmit}
                    className="p-2.5 bg-slate-50 text-center text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    View all matching results for "{inputVal}"
                  </div>
                </div>
              )}
            </div>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                Popular:
              </span>
              {quickCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategoryFilter(cat);
                    setActivePage('search');
                  }}
                  className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-800 transition-colors font-medium cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Latur Delivery Areas Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Latur Hubs:
              </span>
              {laturDeliveryAreas.slice(0, 5).map((area) => (
                <button
                  key={area}
                  onClick={() => selectLaturArea(area)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedAddress.area === area
                      ? 'bg-rose-600/30 border-rose-500 text-rose-200'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  {area}
                </button>
              ))}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-[11px] text-rose-400 hover:underline font-semibold ml-1 cursor-pointer"
              >
                + More Areas
              </button>
            </div>

            {/* Location Access Banner */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <button
                onClick={async () => {
                  setLocLoading(true);
                  await requestCurrentLocation();
                  setLocLoading(false);
                }}
                disabled={locLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-rose-400 font-semibold transition-all cursor-pointer"
              >
                <MapPin className={`w-3.5 h-3.5 ${locLoading ? 'animate-bounce text-emerald-400' : ''}`} />
                <span>{locLoading ? 'Detecting Latur GPS...' : 'Use Current Location'}</span>
              </button>

              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer"
              >
                <span>Delivering to: <strong className="text-rose-400 font-semibold">{selectedAddress.area || 'Shivaji Chowk, Latur'}</strong> ({selectedAddress.pincode || '413512'})</span>
                <span className="text-[10px] text-slate-400 underline">Change</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Platter Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl group">
              <img
                src={heroImage}
                alt="HoodiHub Food Spread"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Today's Highlight</span>
                  <h4 className="text-sm font-bold text-white">Hyderabadi Dum Biryani & Pizza Feast</h4>
                  <p className="text-[11px] text-slate-300">Use code <strong className="text-rose-400 font-mono">HOODI50</strong> for 50% OFF</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Indian Food');
                    setActivePage('search');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 cursor-pointer"
                >
                  Explore
                </button>
              </div>
            </div>

            {/* Micro KPI Strip */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="block text-base sm:text-lg font-black text-rose-400 font-heading">25-30m</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Fast Delivery</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="block text-base sm:text-lg font-black text-amber-400 font-heading">62 Items</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">9 Categories</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="block text-base sm:text-lg font-black text-emerald-400 font-heading">4.8 ★</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">10k+ Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
