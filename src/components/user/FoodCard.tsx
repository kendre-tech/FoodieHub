import React, { useState } from 'react';
import { FoodItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Heart, Plus, Minus, Clock, Flame, ShoppingBag } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const {
    cart,
    addToCart,
    updateCartQuantity,
    orderNow,
    wishlist,
    toggleWishlist,
    setSelectedFood,
  } = useApp();

  const [imageError, setImageError] = useState(false);

  const cartItem = cart.find((item) => item.foodId === food.id);
  const isWishlisted = wishlist.includes(food.id);

  const discountPercent = food.originalPrice > food.price
    ? Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedFood(food)}>
        {!imageError ? (
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-50 to-amber-50 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-3xl mb-1">🍲</span>
            <span className="text-xs font-semibold text-slate-700">{food.name}</span>
          </div>
        )}

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges: Veg indicator & Discount */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {/* FSSAI Veg Symbol */}
          <div className="w-5 h-5 bg-white/95 rounded flex items-center justify-center shadow-xs border border-emerald-600/30" title="100% Pure Vegetarian">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
          </div>

          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white font-bold text-[11px] px-2 py-0.5 rounded shadow-sm">
              {discountPercent}% OFF
            </span>
          )}

          {food.isBestSeller && (
            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-current" />
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(food.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom overlay info on image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-medium">
            <Clock className="w-3 h-3 text-amber-300" />
            <span>{food.prepTime}</span>
          </div>

          <div className="flex items-center gap-1 bg-emerald-600/95 font-bold px-1.5 py-0.5 rounded text-white text-xs shadow-xs">
            <span>{food.rating}</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>

        {/* Out of Stock Banner */}
        {!food.isAvailable && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-rose-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded shadow-md">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-rose-600 uppercase tracking-wider text-[11px]">{food.category}</span>
            <span className="text-slate-400">#{food.number}</span>
          </div>

          <h3
            onClick={() => setSelectedFood(food)}
            className="font-bold text-slate-900 text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-1 cursor-pointer"
            title={food.name}
          >
            {food.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Price & Primary Action Buttons */}
        <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                ₹{food.price}
              </span>
              {food.originalPrice > food.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{food.originalPrice}
                </span>
              )}
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              ({food.ratingCount} reviews)
            </span>
          </div>

          {/* TWO BUTTONS RULE: 1. Add to Cart  2. Order Now  (NO Buy Now!) */}
          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart button (or quantity stepper if already added) */}
            {cartItem ? (
              <div className="flex items-center justify-between bg-rose-50 border border-rose-300 rounded-xl px-2 py-1.5">
                <button
                  onClick={() => updateCartQuantity(food.id, cartItem.quantity - 1)}
                  className="w-6 h-6 rounded-lg bg-white text-rose-600 flex items-center justify-center font-bold hover:bg-rose-600 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-rose-600 tabular-nums">{cartItem.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(food.id, cartItem.quantity + 1)}
                  className="w-6 h-6 rounded-lg bg-white text-rose-600 flex items-center justify-center font-bold hover:bg-rose-600 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(food, 1)}
                disabled={!food.isAvailable}
                className="w-full py-2 px-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 active:scale-95 border border-rose-200 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            )}

            {/* Order Now button (opens checkout directly) */}
            <button
              onClick={() => orderNow(food, 1)}
              disabled={!food.isAvailable}
              className="w-full py-2 px-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl shadow-xs hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
