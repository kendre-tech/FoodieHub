import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  Clock,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  MessageSquare,
  Flame,
  CheckCircle,
} from 'lucide-react';

export const FoodDetailModal: React.FC = () => {
  const {
    selectedFood,
    setSelectedFood,
    addToCart,
    orderNow,
    wishlist,
    toggleWishlist,
    addReview,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!selectedFood) return null;

  const isWishlisted = wishlist.includes(selectedFood.id);
  const discountPercent =
    selectedFood.originalPrice > selectedFood.price
      ? Math.round(
          ((selectedFood.originalPrice - selectedFood.price) / selectedFood.originalPrice) * 100
        )
      : 0;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(selectedFood.id, userRating, reviewComment.trim());
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedFood(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-950 hover:bg-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Large Food Image Column */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-slate-100 overflow-hidden">
            {!imageError ? (
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-50 to-amber-50 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl mb-2">🍽️</span>
                <span className="text-lg font-bold text-slate-800">{selectedFood.name}</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none md:hidden" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              {/* Veg Indicator */}
              <div
                className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-md border border-emerald-600/40"
                title="100% Pure Vegetarian"
              >
                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
              </div>

              {discountPercent > 0 && (
                <span className="bg-rose-600 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-md">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(selectedFood.id)}
              className={`absolute top-4 right-16 md:right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 z-10 ${
                isWishlisted
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white/90 text-slate-700 hover:text-rose-600 shadow-md'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* Bottom info pills on image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
              <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{selectedFood.prepTime}</span>
              </span>

              {selectedFood.calories && (
                <span className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedFood.calories}</span>
                </span>
              )}
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Item Number */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-rose-600 tracking-wider uppercase bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {selectedFood.category}
                </span>
                <span className="text-slate-400 font-mono text-xs">Item #{selectedFood.number} of 62</span>
              </div>

              {/* Title & Rating */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-heading leading-tight">
                  {selectedFood.name}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-emerald-600 text-white font-bold text-xs px-2 py-0.5 rounded shadow-xs">
                    <span>{selectedFood.rating}</span>
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedFood.ratingCount} Customer Ratings
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> FSSAI Pure Veg
                  </span>
                </div>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-2 pb-3 border-b border-slate-100">
                <span className="text-3xl font-black text-slate-900 tabular-nums">
                  ₹{selectedFood.price}
                </span>
                {selectedFood.originalPrice > selectedFood.price && (
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    ₹{selectedFood.originalPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Save ₹{selectedFood.originalPrice - selectedFood.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedFood.description}
                </p>
              </div>

              {/* Tags */}
              {selectedFood.tags && selectedFood.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedFood.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">Select Quantity</span>
                <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:text-rose-600 hover:bg-slate-50 flex items-center justify-center font-bold shadow-xs active:scale-95 transition-all"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold text-slate-900 w-6 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:text-rose-600 hover:bg-slate-50 flex items-center justify-center font-bold shadow-xs active:scale-95 transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Customer Reviews Section */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
                    <span>Customer Reviews ({selectedFood.reviews?.length || 0})</span>
                  </h4>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    {showReviewForm ? 'Cancel' : '+ Write Review'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setUserRating(star)}
                            className="p-0.5 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-4 h-4 ${star <= userRating ? 'fill-current' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your taste experience (freshness, flavor, spice level)..."
                      rows={2}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white focus:outline-rose-500 resize-none"
                      required
                    />

                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700"
                    >
                      Post Review
                    </button>
                  </form>
                )}

                {/* Existing Reviews List */}
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {selectedFood.reviews && selectedFood.reviews.length > 0 ? (
                    selectedFood.reviews.map((rev) => (
                      <div key={rev.id} className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{rev.userName}</span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <span>{rev.rating}</span>
                            <Star className="w-3 h-3 fill-current" />
                          </div>
                        </div>
                        <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{rev.comment}</p>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{rev.date}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            </div>

            {/* MANDATORY BUTTON RULE: Exactly TWO buttons:
                1. Add to Cart
                2. Order Now
                NO BUY NOW ANYWHERE! */}
            <div className="pt-4 mt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
              {/* Button 1: Add to Cart */}
              <button
                onClick={() => {
                  addToCart(selectedFood, quantity);
                  setSelectedFood(null);
                }}
                disabled={!selectedFood.isAvailable}
                className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 active:scale-95 border border-rose-300 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{selectedFood.price * quantity})</span>
              </button>

              {/* Button 2: Order Now */}
              <button
                onClick={() => {
                  orderNow(selectedFood, quantity);
                }}
                disabled={!selectedFood.isAvailable}
                className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-rose-600 hover:bg-rose-700 active:scale-95 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Order Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
