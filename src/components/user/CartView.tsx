import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  UtensilsCrossed,
  Check,
  X,
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    deliveryCharge,
    discountAmount,
    taxAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    selectedAddress,
    setActivePage,
    settings,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleQuickCouponClick = (code: string) => {
    const res = applyCoupon(code);
    setCouponMessage({ text: res.message, isError: !res.success });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-slate-900 font-heading">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Good food is always cooking! Explore our 62 delicious dishes across 9 categories and satisfy your cravings now.
          </p>
          <button
            onClick={() => setActivePage('search')}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Browse 62 Gourmet Dishes</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-rose-600" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your basket
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.foodId} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                {/* Food Image */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.food.image}
                    alt={item.food.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-3.5 h-3.5 bg-white rounded flex items-center justify-center border border-emerald-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </div>
                    <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                      {item.food.category}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {item.food.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                      ₹{item.food.price}
                    </span>
                    <span className="text-xs text-slate-400">× {item.quantity}</span>
                    <span className="text-xs font-bold text-rose-600 tabular-nums">
                      = ₹{item.food.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => updateCartQuantity(item.foodId, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:text-rose-600 flex items-center justify-center font-bold shadow-xs active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-900 w-5 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.foodId, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white text-slate-700 hover:text-rose-600 flex items-center justify-center font-bold shadow-xs active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.foodId)}
                    className="text-xs text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Location Preview */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Delivering to: {selectedAddress.type} ({selectedAddress.name})
                </span>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {selectedAddress.flatNo}, {selectedAddress.street}, {selectedAddress.area}, {selectedAddress.city} - {selectedAddress.pincode}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('profile')}
              className="text-xs font-bold text-rose-600 hover:underline shrink-0"
            >
              Change
            </button>
          </div>
        </div>

        {/* Right Column: Coupons & Bill Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupon Code Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-rose-600" />
              <span>Apply Discount Coupon</span>
            </h3>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Check className="w-3.5 h-3.5" />
                    <span>'{appliedCoupon.code}' Applied!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    You saved ₹{discountAmount} on this order.
                  </p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 p-1"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter Coupon (e.g. HOODI50)"
                  className="flex-1 text-xs uppercase font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-bold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMessage && (
              <p className={`text-xs font-medium ${couponMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                {couponMessage.text}
              </p>
            )}

            {/* Quick Available Coupons */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Available Coupons:
              </span>
              <div className="space-y-1.5">
                {coupons.slice(0, 3).map((cp) => (
                  <div
                    key={cp.code}
                    onClick={() => handleQuickCouponClick(cp.code)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200/80 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <span className="font-mono font-bold text-rose-600">{cp.code}</span>
                      <p className="text-[11px] text-slate-500">{cp.title}</p>
                    </div>
                    <span className="text-xs font-bold text-rose-600">Apply</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bill Details Breakdown */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 font-heading">Bill Details</h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Item Total (Subtotal)</span>
                <span className="font-bold text-slate-900 tabular-nums">₹{cartSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="tabular-nums">- ₹{discountAmount}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 uppercase font-bold">Free</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Restaurant GST & Service Taxes ({settings.taxPercentage}%)</span>
                <span className="font-bold text-slate-900 tabular-nums">₹{taxAmount}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-base font-black text-slate-900">
                <span>To Pay</span>
                <span className="text-2xl font-black text-rose-600 tabular-nums">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => setActivePage('checkout')}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Safe & Secure Payment Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
