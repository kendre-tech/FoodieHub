import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Sparkles, Copy, Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export const OffersView: React.FC = () => {
  const { coupons, applyCoupon, setActivePage } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
          <Tag className="w-4 h-4" />
          <span>Save More on Every Bite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1">
          HoodiHub Offers & Discount Vouchers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Apply verified coupon codes on checkout to enjoy flat discounts, cashback, and free delivery in Bengaluru.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-3xl border-2 border-dashed border-rose-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    {coupon.discountPercent}% Instant Off
                  </span>
                  <h3 className="text-lg font-black text-slate-900 font-heading mt-2">
                    {coupon.title}
                  </h3>
                </div>

                {/* Copy/Apply Button */}
                <button
                  onClick={() => handleApply(coupon.code)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <Tag className="w-3.5 h-3.5 text-rose-400" />
                  <span>{copiedCode === coupon.code ? 'Applied!' : 'Apply Code'}</span>
                  {copiedCode === coupon.code ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {coupon.description}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 font-medium">
                <span>Min Order: ₹{coupon.minOrderAmount}</span>
                <span>·</span>
                <span>Max Discount: ₹{coupon.maxDiscount}</span>
                <span>·</span>
                <span>Valid until Dec 2026</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">Coupon:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
                  {coupon.code}
                </span>
              </div>

              <button
                onClick={() => {
                  applyCoupon(coupon.code);
                  setActivePage('search');
                }}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <span>Use on Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
