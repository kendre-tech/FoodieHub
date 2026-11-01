import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Star, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export const RestaurantsView: React.FC = () => {
  const { restaurants, setSelectedCategoryFilter, setActivePage } = useApp();

  const handleRestaurantClick = (cuisine: string) => {
    // Pick the primary cuisine or show all
    const primaryCat = cuisine.split(',')[0].trim();
    setSelectedCategoryFilter(primaryCat);
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Hyperlocal Dining in Hoodi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
          Popular Partner Restaurants
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Top-rated kitchens and culinary brands delivering across Hoodi, Mahadevapura, and Whitefield.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            onClick={() => handleRestaurantClick(rest.cuisine)}
            className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {rest.isPromoted && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Promoted
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" /> {rest.deliveryTime}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded font-medium">
                    {rest.distance} away
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                    {rest.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-emerald-600 text-white font-bold text-xs px-2 py-0.5 rounded shadow-xs">
                    <span>{rest.rating}</span>
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>

                <p className="text-xs text-rose-600 font-semibold">{rest.cuisine}</p>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{rest.address}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Min Order: <strong>₹{rest.minOrder}</strong></span>
              <span className="font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Dishes <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
