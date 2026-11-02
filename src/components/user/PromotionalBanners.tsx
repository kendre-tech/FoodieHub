import React from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import bannerSpecialOffer from '../../assets/images/banner_special_offer_1793505373202.jpg';
import bannerBiryani from '../../assets/images/banner_biryani_specials_1793505373810.jpg';
import bannerDessert from '../../assets/images/banner_dessert_fest_1793505373885.jpg';

export const PromotionalBanners: React.FC = () => {
  const { setSelectedCategoryFilter, setActivePage, applyCoupon } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const banners = [
    {
      id: 'b1',
      title: '50% OFF up to ₹100',
      subtitle: 'Gourmet Feast in Hoodi',
      code: 'HOODI50',
      category: 'all',
      image: bannerSpecialOffer || '/images/banner_special_offer_1793505373202.jpg',
      fallback: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
      badgeColor: 'bg-rose-600',
      tag: 'Grand Welcome Deal',
    },
    {
      id: 'b2',
      title: 'Nizami Dum Biryani Fest',
      subtitle: 'Flat ₹100 OFF with Handi Flavors',
      code: 'WELCOME100',
      category: 'Indian Food',
      image: bannerBiryani || '/images/banner_biryani_specials_1793505373810.jpg',
      fallback: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
      badgeColor: 'bg-amber-600',
      tag: 'Royal Heritage',
    },
    {
      id: 'b3',
      title: 'Sweet Tooth Festival',
      subtitle: 'Molten Lava Cakes & Brownies',
      code: 'FESTIVE20',
      category: 'Desserts',
      image: bannerDessert || '/images/banner_dessert_fest_1793505373885.jpg',
      fallback: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
      badgeColor: 'bg-purple-600',
      tag: 'Sweet Indulgence',
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleBannerClick = (category: string) => {
    setSelectedCategoryFilter(category);
    setActivePage('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Food Promotions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
            Exclusive Offers & Handpicked Deals
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 bg-slate-900 min-h-[220px] flex flex-col justify-end"
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-80"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== banner.fallback) {
                  e.currentTarget.src = banner.fallback;
                }
              }}
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            {/* Content Over Banner */}
            <div className="relative z-10 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider text-white px-2.5 py-1 rounded-md shadow-sm ${banner.badgeColor}`}>
                  {banner.tag}
                </span>

                <button
                  onClick={() => handleCopyCode(banner.code)}
                  className="flex items-center gap-1 bg-white/90 hover:bg-white text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md transition-all active:scale-95 shadow-sm"
                  title="Click to copy & apply coupon code"
                >
                  <Tag className="w-3 h-3 text-rose-600" />
                  <span>{banner.code}</span>
                  {copiedCode === banner.code ? (
                    <Check className="w-3 h-3 text-emerald-600 ml-0.5" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 ml-0.5" />
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-tight font-heading group-hover:text-rose-300 transition-colors">
                  {banner.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{banner.subtitle}</p>
              </div>

              <button
                onClick={() => handleBannerClick(banner.category)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-rose-400 transition-colors pt-1 cursor-pointer"
              >
                <span>Order with Discount</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
