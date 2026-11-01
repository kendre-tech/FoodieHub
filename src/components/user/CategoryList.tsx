import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers } from 'lucide-react';

export const CategoryList: React.FC = () => {
  const { categories, selectedCategoryFilter, setSelectedCategoryFilter, setActivePage } = useApp();

  const handleSelect = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Cuisines</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
            Explore 9 Food Categories
          </h2>
        </div>

        <button
          onClick={() => {
            setSelectedCategoryFilter('all');
            setActivePage('search');
          }}
          className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors"
        >
          View All 62 Items →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategoryFilter === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`group flex flex-col items-center p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                isSelected
                  ? 'bg-rose-50 border-rose-400 shadow-md scale-105'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-slate-100 shadow-xs mb-2.5 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <h3 className={`text-xs sm:text-sm font-bold transition-colors line-clamp-1 ${
                isSelected ? 'text-rose-600' : 'text-slate-800 group-hover:text-rose-600'
              }`}>
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-600 mt-0.5 font-medium">
                {cat.itemCount} Items
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
