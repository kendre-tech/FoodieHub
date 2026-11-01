import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, DeliveryAddress } from '../../types';
import {
  ShieldCheck,
  MapPin,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowRight,
  CheckCircle,
  Plus,
  Clock,
  Sparkles,
  Lock,
  QrCode,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryCharge,
    discountAmount,
    taxAmount,
    finalTotal,
    appliedCoupon,
    selectedAddress,
    setSelectedAddress,
    currentUser,
    addUserAddress,
    requestCurrentLocation,
    placeOrder,
    setActivePage,
    settings,
  } = useApp();

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('UPI');
  const [upiId, setUpiId] = useState('dhanashri@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 8921 4452 9012');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [cardName, setCardName] = useState('Dhanashri Kendre');
  const [instructions, setInstructions] = useState('Please ring bell once. Leave with security if unavailable.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);
  const [locLoading, setLocLoading] = useState(false);

  // New Address Form State
  const [newAddrType, setNewAddrType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [newFlat, setNewFlat] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState('Hoodi');
  const [newLandmark, setNewLandmark] = useState('');
  const [newPincode, setNewPincode] = useState('560048');

  const paymentOptions: { id: PaymentMethod; label: string; icon: any; desc: string; badge?: string }[] = [
    {
      id: 'UPI',
      label: 'UPI Payment',
      icon: QrCode,
      desc: 'Pay using any UPI App (Instant Verification)',
      badge: 'Fastest',
    },
    {
      id: 'Google Pay',
      label: 'Google Pay',
      icon: Smartphone,
      desc: 'Fast, secure 1-tap checkout with GPay',
    },
    {
      id: 'PhonePe',
      label: 'PhonePe',
      icon: Smartphone,
      desc: 'Direct UPI flow via PhonePe app',
    },
    {
      id: 'Paytm',
      label: 'Paytm',
      icon: Smartphone,
      desc: 'Paytm Wallet, Postpaid or UPI',
    },
    {
      id: 'Debit Card',
      label: 'Debit Card',
      icon: CreditCard,
      desc: 'All Indian bank debit cards accepted (Visa, RuPay, MC)',
    },
    {
      id: 'Credit Card',
      label: 'Credit Card',
      icon: CreditCard,
      desc: 'Visa, Mastercard, Amex, Diners Club',
    },
    {
      id: 'Cash on Delivery',
      label: 'Cash on Delivery (COD)',
      icon: Banknote,
      desc: 'Pay cash or UPI scan when food arrives at your door',
      badge: 'Zero Risk',
    },
  ];

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setActivePage('search');
      return;
    }

    setIsSubmitting(true);
    try {
      await placeOrder(selectedPayment, instructions);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlat || !newStreet) return;

    addUserAddress({
      type: newAddrType,
      name: currentUser?.name || 'Dhanashri Kendre',
      phone: currentUser?.phone || '+91 98201 45890',
      flatNo: newFlat,
      street: newStreet,
      landmark: newLandmark,
      area: newArea,
      city: 'Bengaluru',
      pincode: newPincode,
    });

    setShowNewAddressModal(false);
    setNewFlat('');
    setNewStreet('');
  };

  const handleDetectGPS = async () => {
    setLocLoading(true);
    await requestCurrentLocation();
    setLocLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
          Checkout & Complete Payment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review delivery details, select payment method, and confirm your order in Hoodi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Address & Payment Methods */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Delivery Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <MapPin className="w-5 h-5" />
                <span className="text-slate-900 text-base font-black font-heading">
                  1. Delivery Address
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDetectGPS}
                  disabled={locLoading}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <MapPin className={`w-3.5 h-3.5 text-rose-600 ${locLoading ? 'animate-bounce' : ''}`} />
                  <span>{locLoading ? 'Detecting...' : 'Use Current Location'}</span>
                </button>

                <button
                  onClick={() => setShowNewAddressModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>
            </div>

            {/* Saved Addresses List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentUser?.addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded">
                        {addr.type}
                      </span>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-rose-600 fill-current" />
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{addr.name} · {addr.phone}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {addr.flatNo}, {addr.street}
                      {addr.landmark && <span className="block text-slate-400">Landmark: {addr.landmark}</span>}
                      <span className="block text-slate-500 font-medium">{addr.area}, {addr.city} - {addr.pincode}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Special Instructions */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery Instructions for Driver
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Ring bell once, leave at door, don't honk..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-rose-500 font-medium"
              />
            </div>
          </div>

          {/* Section 2: Payment Options (MANDATORY SECTION 7) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-600" />
                <h2 className="text-slate-900 text-base font-black font-heading">
                  2. Payment Methods
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
              </span>
            </div>

            {/* 7 Payment Methods Radio Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedPayment === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedPayment(opt.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{opt.label}</span>
                        {opt.badge && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{opt.desc}</p>
                    </div>

                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-rose-600 bg-rose-600' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Payment Method Input Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              {selectedPayment === 'UPI' && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">Enter UPI ID / VPA</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. username@okhdfcbank"
                      className="flex-1 text-xs font-mono p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-rose-500"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                    >
                      Verify VPA
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    A payment request for ₹{finalTotal} will be triggered upon clicking Place Order.
                  </p>
                </div>
              )}

              {(selectedPayment === 'Google Pay' || selectedPayment === 'PhonePe' || selectedPayment === 'Paytm') && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-rose-600 text-sm">
                    {selectedPayment.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{selectedPayment} Express Checkout</h4>
                    <p className="text-[11px] text-slate-500">
                      You will be prompted to approve ₹{finalTotal} securely via your {selectedPayment} account.
                    </p>
                  </div>
                </div>
              )}

              {(selectedPayment === 'Debit Card' || selectedPayment === 'Credit Card') && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-800">Card Details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-slate-500 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full text-xs font-mono p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-rose-500"
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Valid Thru (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs font-mono p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-rose-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full text-xs font-mono p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-rose-500"
                        placeholder="3 digits"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-slate-500 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-rose-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === 'Cash on Delivery' && (
                <div className="flex items-start gap-3">
                  <Banknote className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Cash on Delivery Confirmed</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Please keep exactly ₹{finalTotal} in cash or you can scan the delivery partner's QR code on arrival in Hoodi.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 sticky top-24">
            <h3 className="text-base font-black text-slate-900 font-heading">
              Order Summary ({cart.length} items)
            </h3>

            {/* Mini Items List */}
            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 pr-1 text-xs">
              {cart.map((item) => (
                <div key={item.foodId} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-slate-900 tabular-nums">{item.quantity}x</span>
                    <span className="truncate text-slate-700">{item.food.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums shrink-0 ml-2">
                    ₹{item.food.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
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
                  {deliveryCharge === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryCharge}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Taxes & GST ({settings.taxPercentage}%)</span>
                <span className="font-bold text-slate-900 tabular-nums">₹{taxAmount}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-base font-black text-slate-900">
                <span>Total Payable</span>
                <span className="text-2xl font-black text-rose-600 tabular-nums">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Selected Payment Confirmation Ribbon */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-500">Method:</span>
              <span className="font-bold text-slate-900">{selectedPayment}</span>
            </div>

            {/* Place Order Primary Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Placing Order...' : `Place Order (₹${finalTotal})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Estimated Delivery: 25-30 Mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add New Address */}
      {showNewAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-heading">Add Delivery Address</h3>

            <form onSubmit={handleSaveNewAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Address Label</label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewAddrType(type)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold ${
                        newAddrType === type
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Flat / House / Floor No.</label>
                <input
                  type="text"
                  required
                  value={newFlat}
                  onChange={(e) => setNewFlat(e.target.value)}
                  placeholder="e.g. Flat 301, Marvel Residency"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Street / Building</label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="e.g. Hoodi Main Road, ITPL Cross"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={newLandmark}
                  onChange={(e) => setNewLandmark(e.target.value)}
                  placeholder="Near Shell Petrol Bunk"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Area</label>
                  <input
                    type="text"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewAddressModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
