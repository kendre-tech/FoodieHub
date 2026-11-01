import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  Bike,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  Navigation,
  Clock,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  LogOut,
  UtensilsCrossed,
  ArrowRight,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

export const DeliveryPartnerDashboard: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    deliveryPartnerUser,
    setDeliveryPartnerUser,
    setActivePanel,
    addNotification,
    settings,
  } = useApp();

  const [driverEmail, setDriverEmail] = useState('driver@hoodihub.com');
  const [driverPass, setDriverPass] = useState('driver123');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(deliveryPartnerUser));
  const [driverLocation, setDriverLocation] = useState('Hoodi Circle, Bengaluru');

  // Filter orders assigned to this partner or pending dispatch
  const assignedOrders = orders.filter(
    (o) =>
      o.orderStatus !== 'Delivered' &&
      o.orderStatus !== 'Cancelled' &&
      (o.deliveryPartnerId === deliveryPartnerUser?.id || !o.deliveryPartnerId)
  );

  const completedOrders = orders.filter(
    (o) => o.orderStatus === 'Delivered' && o.deliveryPartnerId === deliveryPartnerUser?.id
  );

  const handleDriverLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setDeliveryPartnerUser({
      id: 'dp-1',
      name: 'Ramesh Naik',
      phone: '+91 98451 22345',
      email: driverEmail,
      vehicleNumber: 'KA-03-HA-4592 (EV Scooter)',
      rating: 4.9,
      totalDeliveries: 428,
      status: 'Available',
      locationArea: 'Hoodi Circle',
    });
    addNotification('Driver Login Successful', 'Welcome to Delivery Partner Console', 'success');
  };

  const handleDriverLogout = () => {
    setIsLoggedIn(false);
    setDeliveryPartnerUser(null);
    addNotification('Driver Logged Out', 'You are now offline', 'info');
  };

  const handleAcceptDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'Out for Delivery');
    addNotification('Delivery Accepted', `Order #${orderId} accepted. Safe ride!`, 'success');
  };

  const handleRejectDelivery = (orderId: string) => {
    addNotification('Delivery Declined', `Order #${orderId} returned to kitchen dispatch pool`, 'info');
  };

  const handleMarkDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'Delivered');
    addNotification('Delivery Completed 🎉', `Order #${orderId} successfully delivered! Earnings updated.`, 'success');
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Bike className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">Delivery Partner Portal</h2>
            <p className="text-xs text-slate-500">Sign in to view assigned delivery runs and GPS navigation</p>
          </div>

          <form onSubmit={handleDriverLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Driver Email</label>
              <input
                type="email"
                required
                value={driverEmail}
                onChange={(e) => setDriverEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={driverPass}
                onChange={(e) => setDriverPass(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-emerald-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Start Shift (Sign In)
            </button>
          </form>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
            <span className="font-bold block">Evaluation Demo Login:</span>
            <div className="flex justify-between text-[11px]">
              <span>Email: <strong>driver@hoodihub.com</strong></span>
              <span>Pass: <strong>driver123</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/60 pb-16">
      {/* Top Bar for Delivery Partner */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
            <Bike className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black font-heading tracking-tight">HoodiHub Driver Fleet</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Partner: {deliveryPartnerUser?.name || 'Ramesh Naik'} · {deliveryPartnerUser?.vehicleNumber}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePanel('user')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            ← Customer App
          </button>
          <button
            onClick={handleDriverLogout}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Shift</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Driver Stats & Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Orders</span>
            <span className="text-2xl font-black text-rose-600 tabular-nums font-heading mt-1 block">
              {assignedOrders.length}
            </span>
            <span className="text-[10px] text-slate-400">Active runs</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Today's Earnings</span>
            <span className="text-2xl font-black text-emerald-600 tabular-nums font-heading mt-1 block">
              ₹{(completedOrders.length * 55 + 180).toFixed(0)}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">+₹50 per delivery</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl font-black text-slate-900 tabular-nums font-heading mt-1 block">
              {(deliveryPartnerUser?.totalDeliveries || 420) + completedOrders.length}
            </span>
            <span className="text-[10px] text-slate-400">All-time lifetime</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Partner Rating</span>
            <span className="text-2xl font-black text-amber-500 tabular-nums font-heading mt-1 block">
              4.9 ★
            </span>
            <span className="text-[10px] text-slate-400">Top Rated Partner</span>
          </div>
        </div>

        {/* Current Active Deliveries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 font-heading flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-600" />
              <span>Assigned Deliveries ({assignedOrders.length})</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              Current Zone: Hoodi - Mahadevapura Hub
            </span>
          </div>

          {assignedOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignedOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 shadow-md space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      #{ord.id}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 animate-pulse">
                      {ord.orderStatus}
                    </span>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{ord.customerName}</span>
                      <a
                        href={`tel:${ord.customerPhone}`}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call Customer</span>
                      </a>
                    </div>
                    <p className="text-slate-500 font-mono">{ord.customerPhone}</p>
                  </div>

                  {/* Delivery Address */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Delivery Drop Location</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-5">
                      {ord.address.flatNo}, {ord.address.street}, {ord.address.area}, {ord.address.city} - {ord.address.pincode}
                    </p>
                    {ord.address.landmark && (
                      <p className="text-[11px] text-amber-700 pl-5 font-medium">
                        Landmark: {ord.address.landmark}
                      </p>
                    )}
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-slate-600 space-y-1">
                    <span className="font-bold text-slate-800 block">Food Order Package:</span>
                    <p className="text-[11px] text-slate-500">
                      {ord.items.map((i) => `${i.food.name} (x${i.quantity})`).join(', ')}
                    </p>
                  </div>

                  {/* Map Navigation & Action Controls */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Collect: <strong>₹{ord.paymentMethod === 'Cash on Delivery' ? ord.totalAmount : 0}</strong> ({ord.paymentMethod})</span>
                      <span className="text-emerald-700 font-bold">Earnings: +₹50</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {ord.orderStatus === 'Preparing' || ord.orderStatus === 'Confirmed' || ord.orderStatus === 'Ready' ? (
                        <>
                          <button
                            onClick={() => handleAcceptDelivery(ord.id)}
                            className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <Bike className="w-4 h-4" />
                            <span>Pick Up & Start Run</span>
                          </button>
                          <button
                            onClick={() => handleRejectDelivery(ord.id)}
                            className="py-2.5 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleMarkDelivered(ord.id)}
                          className="col-span-2 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm Order Delivered to Customer</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2 max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">All Assigned Deliveries Complete</h3>
              <p className="text-xs text-slate-500">
                You're ready for new orders! Keep your phone on standby near Hoodi Main Road.
              </p>
            </div>
          )}
        </div>

        {/* Delivered Orders History */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 font-heading">
            Completed Delivery History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Order ID</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Delivery Drop</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Payout</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders
                  .filter((o) => o.orderStatus === 'Delivered')
                  .map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900">#{ord.id}</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-800">{ord.customerName}</td>
                      <td className="py-2.5 px-4 text-slate-500 truncate max-w-xs">{ord.address.street}, {ord.address.area}</td>
                      <td className="py-2.5 px-4 font-bold tabular-nums">₹{ord.totalAmount}</td>
                      <td className="py-2.5 px-4 text-emerald-600 font-bold">+₹50</td>
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
