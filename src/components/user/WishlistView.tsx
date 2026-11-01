import React from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from './FoodCard';
import { Heart, UtensilsCrossed, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, foods, setActivePage } = useApp();

  const wishlistedFoods = foods.filter((food) => wishlist.includes(food.id));

  if (wishlistedFoods.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 font-heading">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Save your favorite pizzas, burgers, momos, and desserts to easily order them anytime!
          </p>
          <button
            onClick={() => setActivePage('search')}
            className="w-full py-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Discover Food Menu</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600 fill-current" />
            <span>My Favorite Dishes ({wishlistedFoods.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Instant 1-click ordering for your saved foodie cravings.
          </p>
        </div>

        <button
          onClick={() => setActivePage('search')}
          className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
        >
          <span>Explore All Dishes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistedFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};
