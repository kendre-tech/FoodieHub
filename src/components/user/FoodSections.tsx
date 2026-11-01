import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from './FoodCard';
import { Flame, Sparkles, ThumbsUp, Star, Award, MessageSquare } from 'lucide-react';

export const FoodSections: React.FC = () => {
  const { foods, setActivePage, setSelectedCategoryFilter } = useApp();
  const [activeTab, setActiveTab] = useState<'bestseller' | 'popular' | 'recommended'>('bestseller');

  const bestSellers = foods.filter((f) => f.isBestSeller).slice(0, 8);
  const popularDishes = foods.filter((f) => f.isPopular).slice(0, 8);
  const recommendedDishes = foods.filter((f) => f.rating >= 4.8).slice(0, 8);

  const displayedFoods =
    activeTab === 'bestseller'
      ? bestSellers
      : activeTab === 'popular'
      ? popularDishes
      : recommendedDishes;

  const customerReviews = [
    {
      id: 'rev-1',
      name: 'Pooja Hegde',
      area: 'Hoodi Circle, Bengaluru',
      rating: 5,
      date: '2 days ago',
      orderItem: 'Cheese Burst Pizza & Cold Coffee',
      comment:
        'HoodiHub is now our go-to dinner app! The delivery partner arrived in 22 mins sharp. The pizza was steaming hot and the cold coffee was frothy and thick. Super impressed!',
    },
    {
      id: 'rev-2',
      name: 'Aarav Sharma',
      area: 'Mahadevapura, Bengaluru',
      rating: 5,
      date: 'Yesterday',
      orderItem: 'Hyderabadi Veg Biryani & Paneer Tikka',
      comment:
        'Authentic Nizami aroma! The earthen handi biryani and juicy tandoori paneer tikka tasted like a 5-star restaurant. Live tracking on the map was spot on.',
    },
    {
      id: 'rev-3',
      name: 'Meera Iyer',
      area: 'Whitefield Road, Bengaluru',
      rating: 5,
      date: '3 days ago',
      orderItem: 'Chocolate Lava Cake & Peri Peri Fries',
      comment:
        'Hot molten lava cake dripping with chocolate ganache + spicy peri-peri fries! Perfect late night craving combo. Dhanashri Kendre and team have built a fantastic platform.',
    },
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Popular & Best-Selling Dishes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-current" />
              <span>Crowd Favorites</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Trending Dishes in Hoodi
            </h2>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'bestseller'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔥 Best-Selling
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'popular'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✨ Popular Dishes
            </button>
            <button
              onClick={() => setActiveTab('recommended')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'recommended'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⭐ Recommended
            </button>
          </div>
        </div>

        {/* 4-Column Grid of Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setActivePage('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs transition-all"
          >
            Explore Complete Menu (62 Gourmet Dishes) →
          </button>
        </div>
      </section>

      {/* Trust & Highlights Strip */}
      <section className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl font-black font-heading">25 Mins</span>
              <p className="text-xs text-rose-100 mt-1 font-medium">Lightning Fast Hyperlocal Delivery</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl font-black font-heading">62 Dishes</span>
              <p className="text-xs text-rose-100 mt-1 font-medium">Authentic 9 Category Food Variety</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl font-black font-heading">100% Veg</span>
              <p className="text-xs text-rose-100 mt-1 font-medium">FSSAI Certified Fresh & Hygienic</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
              <span className="text-3xl font-black font-heading">Live GPS</span>
              <p className="text-xs text-rose-100 mt-1 font-medium">Real-Time Delivery Partner Tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Real Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Loved by Foodies across Bengaluru
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Read authentic feedback from delighted customers ordering everyday on HoodiHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <span className="text-[11px] text-slate-400">{rev.area}</span>
                </div>
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {rev.orderItem}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
