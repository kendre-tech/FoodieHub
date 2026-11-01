import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Bike,
  Phone,
  UtensilsCrossed,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  Store,
  ChevronRight,
  Database,
} from 'lucide-react';

interface OrderTrackingProps {
  orderId?: string;
  onBack?: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingProps> = ({ orderId, onBack }) => {
  const { orders, trackingOrderId, cancelOrder, updateOrderStatus, setActivePage } = useApp();

  const currentId = orderId || trackingOrderId || orders[0]?.id;
  const order = orders.find((o) => o.id === currentId);

  // Delivery driver simulation coordinate along path 0% to 100%
  const [driverProgress, setDriverProgress] = useState(65);

  useEffect(() => {
    if (!order) return;
    if (order.orderStatus === 'Out for Delivery') {
      const interval = setInterval(() => {
        setDriverProgress((prev) => (prev >= 95 ? 95 : prev + 1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [order?.orderStatus]);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No active order to track</h3>
          <p className="text-xs text-slate-500">Please choose an order from your history or place a new one.</p>
          <button
            onClick={() => setActivePage('orders')}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  const STAGES: OrderStatus[] = [
    'Order Placed',
    'Confirmed',
    'Preparing',
    'Ready',
    'Out for Delivery',
    'Delivered',
  ];

  const getStageIndex = (status: OrderStatus) => STAGES.indexOf(status);
  const currentStageIndex = getStageIndex(order.orderStatus);

  const isCancelled = order.orderStatus === 'Cancelled';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              #{order.id}
            </span>
            <span className="text-xs text-slate-400">
              Placed {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-heading mt-1">
            {isCancelled
              ? 'Order Cancelled'
              : order.orderStatus === 'Delivered'
              ? 'Food Delivered! Enjoy your meal 😋'
              : 'Live Order Tracking'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
            >
              ← Back to Orders
            </button>
          )}

          {!isCancelled && order.orderStatus !== 'Delivered' && currentStageIndex <= 1 && (
            <button
              onClick={() => cancelOrder(order.id)}
              className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-600 text-xs font-bold hover:bg-rose-50"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Delivery Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stylized Live Simulated GPS Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
            {/* SVG Interactive Map Canvas */}
            <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
              {/* City Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Background fill */}
              <rect width="800" height="500" fill="#0f172a" />
              <rect width="800" height="500" fill="url(#grid)" />

              {/* Waterway / Bengaluru Lake contour */}
              <path
                d="M 60 400 Q 180 340 240 420 T 420 460"
                fill="none"
                stroke="#1e3a5f"
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.4"
              />

              {/* Major Roads in Latur */}
              <path d="M 50 150 L 750 150" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
              <text x="60" y="140" fill="#64748b" fontSize="10" fontWeight="bold">SHIVAJI CHOWK MAIN ROAD</text>

              <path d="M 400 50 L 400 450" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <text x="410" y="70" fill="#64748b" fontSize="10" fontWeight="bold">AUSA ROAD</text>

              <path d="M 120 450 L 680 80" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              <text x="500" y="190" fill="#64748b" fontSize="9" fontWeight="bold">GANDHI CHOWK ROAD</text>

              {/* Active Delivery Route Path (Restaurant -> Customer) */}
              <path
                id="deliveryPath"
                d="M 150 150 Q 280 150 350 240 T 620 360"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />

              {/* Restaurant Marker (Point A) */}
              <g transform="translate(150, 150)">
                <circle r="22" fill="#e11d48" opacity="0.25" className="animate-ping" />
                <circle r="16" fill="#e11d48" />
                <circle r="6" fill="#ffffff" />
                <rect x="-70" y="-45" width="140" height="24" rx="6" fill="#0f172a" stroke="#e11d48" strokeWidth="1.5" />
                <text x="0" y="-29" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  HoodiHub Kitchen (Latur)
                </text>
              </g>

              {/* Customer Destination Marker (Point B) */}
              <g transform="translate(620, 360)">
                <circle r="20" fill="#10b981" opacity="0.3" />
                <circle r="14" fill="#10b981" />
                <circle r="5" fill="#ffffff" />
                <rect x="-60" y="-42" width="120" height="24" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="0" y="-26" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Your Address
                </text>
              </g>

              {/* Animated Scooter / Driver Marker */}
              {order.orderStatus === 'Out for Delivery' && (
                <g transform={`translate(${150 + (620 - 150) * (driverProgress / 100)}, ${150 + (360 - 150) * (driverProgress / 100)})`}>
                  <circle r="20" fill="#3b82f6" opacity="0.3" className="animate-pulse" />
                  <circle r="14" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                  <text x="0" y="4" fill="#ffffff" fontSize="11" textAnchor="middle">🛵</text>
                  <rect x="-55" y="-36" width="110" height="20" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                  <text x="0" y="-22" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {order.deliveryPartnerName?.split(' ')[0] || 'Ramesh'} (Latur on way)
                  </text>
                </g>
              )}
            </svg>

            {/* Live Status Overlay Ribbon */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-white text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>GPS Live Location: Shivaji Chowk, Latur (413512)</span>
              </div>

              {!isCancelled && (
                <div className="bg-rose-600/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {order.orderStatus === 'Delivered'
                      ? 'Arrived'
                      : `Est: ${order.estimatedDeliveryMinutes} Mins`}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Demo Controls for Testing Stages */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <span className="text-slate-400">Quick Test Controls:</span>
              <div className="flex items-center gap-1 overflow-x-auto">
                {STAGES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateOrderStatus(order.id, s)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                      order.orderStatus === s ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Partner Details Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-xl shadow-md">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">
                  Assigned Delivery Partner
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {order.deliveryPartnerName || 'Ramesh Shinde (MH-24 EV Scooter)'}
                </h4>
                <p className="text-xs text-slate-500">
                  Rating: 4.9 ★ · 540+ safe deliveries in Latur
                </p>
              </div>
            </div>

            <a
              href={`tel:${order.deliveryPartnerPhone || '+919845122345'}`}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Driver</span>
            </a>
          </div>
        </div>

        {/* Right Column: Order Stages Pipeline & Item Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Stages Progress Tracker */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 font-heading">
              Order Progress
            </h3>

            {isCancelled ? (
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>This order was cancelled. Any debited amount is being refunded.</span>
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {STAGES.map((stage, idx) => {
                  const isDone = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;

                  return (
                    <div key={stage} className="relative flex items-center gap-3.5 z-10">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isCurrent
                            ? 'bg-rose-600 text-white ring-4 ring-rose-100 shadow-md animate-pulse'
                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <span
                          className={`text-xs font-bold block ${
                            isCurrent
                              ? 'text-rose-600 text-sm'
                              : isDone
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {stage}
                        </span>
                        {isCurrent && (
                          <span className="text-[11px] text-slate-500 block">
                            {stage === 'Order Placed' && 'Waiting for kitchen acknowledgment'}
                            {stage === 'Confirmed' && 'Restaurant accepted and queued your order'}
                            {stage === 'Preparing' && 'Fresh ingredients cooking with chef care'}
                            {stage === 'Ready' && 'Packed & hot in thermal bag for driver'}
                            {stage === 'Out for Delivery' && 'Driver is speeding through Shivaji Chowk & Ausa Rd'}
                            {stage === 'Delivered' && 'Handed over at your doorstep'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Receipt & Delivery Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 font-heading">
              Items Ordered
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {order.items.map((item) => (
                <div key={item.foodId} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 tabular-nums">{item.quantity}x</span>
                    <span className="text-slate-800">{item.food.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ₹{item.food.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>- ₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-slate-900">
                  {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST</span>
                <span className="font-bold text-slate-900">₹{order.taxes}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-rose-600 tabular-nums">₹{order.totalAmount}</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500">
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod} ({order.paymentStatus})
              </p>
              <p className="mt-1">
                <strong>Delivery Address:</strong> {order.address.flatNo}, {order.address.street}, {order.address.area}
              </p>
            </div>

            {/* Supabase Storage Confirmation Badge */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase Cloud Storage Active</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                eqvocjukksgtqmgdbjog
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
