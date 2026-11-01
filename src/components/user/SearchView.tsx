import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from './FoodCard';
import { Search, Filter, SlidersHorizontal, RotateCcw, UtensilsCrossed } from 'lucide-react';

export const SearchView: React.FC = () => {
  const {
    foods,
    categories,
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
  } = useApp();

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      // Keyword match
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = food.name.toLowerCase().includes(query);
        const matchesCat = food.category.toLowerCase().includes(query);
        const matchesDesc = food.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // Category match
      if (selectedCategoryFilter !== 'all') {
        if (food.category.toLowerCase() !== selectedCategoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Price filter
      if (priceFilter) {
        if (priceFilter === 150 && food.price > 150) return false;
        if (priceFilter === 250 && (food.price <= 150 || food.price > 250)) return false;
        if (priceFilter === 300 && food.price <= 250) return false;
      }

      // Rating filter
      if (ratingFilter && food.rating < ratingFilter) {
        return false;
      }

      // Veg only
      if (isVegOnly && !food.isVeg) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price - b.price;
      if (sortOrder === 'price-high') return b.price - a.price;
      if (sortOrder === 'rating') return b.rating - a.rating;
      return b.ratingCount - a.ratingCount; // popular
    });
  }, [foods, searchKeyword, selectedCategoryFilter, priceFilter, ratingFilter, isVegOnly, sortOrder]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCategoryFilter('all');
    setPriceFilter(null);
    setRatingFilter(null);
    setIsVegOnly(false);
    setSortOrder('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search dishes by name (e.g. Margherita, Hakka Noodles, Biryani, Cold Coffee)..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-rose-500 font-medium"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-rose-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={handleResetFilters}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              selectedCategoryFilter === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Cuisines (62)
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategoryFilter.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name} ({cat.itemCount})
            </button>
          ))}
        </div>

        {/* Secondary Filters: Price, Rating & Veg */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters:
          </span>

          {/* Price Filters */}
          <button
            onClick={() => setPriceFilter(priceFilter === 150 ? null : 150)}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              priceFilter === 150
                ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Under ₹150
          </button>
          <button
            onClick={() => setPriceFilter(priceFilter === 250 ? null : 250)}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              priceFilter === 250
                ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            ₹150 - ₹250
          </button>
          <button
            onClick={() => setPriceFilter(priceFilter === 300 ? null : 300)}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              priceFilter === 300
                ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Above ₹250
          </button>

          {/* Rating filter */}
          <button
            onClick={() => setRatingFilter(ratingFilter === 4.8 ? null : 4.8)}
            className={`px-2.5 py-1 rounded-lg border font-medium ${
              ratingFilter === 4.8
                ? 'bg-rose-50 border-rose-400 text-rose-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            ★ 4.8 & Above
          </button>

          {/* Pure Veg only Toggle */}
          <button
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 ${
              isVegOnly
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Pure Veg</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-heading">
            {selectedCategoryFilter === 'all' ? 'All Dishes' : selectedCategoryFilter}
          </h2>
          <p className="text-xs text-slate-500">
            Showing {filteredFoods.length} delicious {filteredFoods.length === 1 ? 'dish' : 'dishes'} in Hoodi
          </p>
        </div>

        {filteredFoods.length < foods.length && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Food Cards Grid */}
      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No matching dishes found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search keyword or clearing active filters to see all 62 items.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
