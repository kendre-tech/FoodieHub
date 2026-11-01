import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderTrackingView } from './OrderTrackingView';
import {
  Clock,
  RotateCcw,
  Bike,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  UtensilsCrossed,
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, reorder, trackingOrderId, setTrackingOrderId, setActivePage, setSelectedFood } = useApp();
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(trackingOrderId);

  if (activeTrackingId) {
    return (
      <OrderTrackingView
        orderId={activeTrackingId}
        onBack={() => {
          setActiveTrackingId(null);
          setTrackingOrderId(null);
        }}
      />
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 font-heading">No Orders Yet</h2>
          <p className="text-xs text-slate-500">
            You haven't placed any delicious food orders yet. Explore our 62 menu dishes!
          </p>
          <button
            onClick={() => setActivePage('search')}
            className="w-full py-3 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors"
          >
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading flex items-center gap-2">
            <Clock className="w-6 h-6 text-rose-600" />
            <span>My Orders & History</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track live deliveries, reorder your favorite meals, or view detailed receipts.
          </p>
        </div>

        <button
          onClick={() => setActivePage('search')}
          className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold hover:bg-rose-100"
        >
          + Order More Food
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.orderStatus === 'Delivered';
          const isCancelled = order.orderStatus === 'Cancelled';
          const isActive = !isDelivered && !isCancelled;

          return (
            <div
              key={order.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all shadow-sm hover:shadow-md ${
                isActive ? 'border-rose-300 ring-2 ring-rose-50' : 'border-slate-200/90'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    #{order.id}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                      isDelivered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isCancelled
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse'
                    }`}
                  >
                    {isDelivered && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isCancelled && <XCircle className="w-3.5 h-3.5" />}
                    {isActive && <Bike className="w-3.5 h-3.5" />}
                    <span>{order.orderStatus}</span>
                  </span>
                </div>
              </div>

              {/* Items List Preview */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items.map((item) => (
                  <div key={item.foodId} className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => setSelectedFood(item.food)}
                    />
                    <div className="min-w-0 flex-1">
                      <h4
                        onClick={() => setSelectedFood(item.food)}
                        className="text-xs font-bold text-slate-900 truncate cursor-pointer hover:text-rose-600"
                      >
                        {item.food.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {item.quantity} x ₹{item.food.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  <span>Total Paid: </span>
                  <span className="text-base font-black text-slate-900 tabular-nums">
                    ₹{order.totalAmount}
                  </span>
                  <span className="text-slate-400 ml-2">via {order.paymentMethod}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Track Order Button */}
                  {isActive && (
                    <button
                      onClick={() => setActiveTrackingId(order.id)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Track Order Live</span>
                    </button>
                  )}

                  {/* Reorder Button */}
                  <button
                    onClick={() => reorder(order.id)}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>

                  {/* View Details */}
                  {!isActive && (
                    <button
                      onClick={() => setActiveTrackingId(order.id)}
                      className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
