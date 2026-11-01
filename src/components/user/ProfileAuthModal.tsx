import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Lock,
  CheckCircle,
  Plus,
  Trash2,
  KeyRound,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const ProfileAuthModal: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    selectedAddress,
    setSelectedAddress,
    addUserAddress,
    addNotification,
    orders,
    wishlist,
    setActivePage,
  } = useApp();

  const [authMode, setAuthMode] = useState<'profile' | 'login' | 'register' | 'otp' | 'forgot'>(
    currentUser ? 'profile' : 'login'
  );

  // Login / Register Form State
  const [emailInput, setEmailInput] = useState(currentUser?.email || 'dhanashrikendre24@gmail.com');
  const [passwordInput, setPasswordInput] = useState('pass1234');
  const [nameInput, setNameInput] = useState(currentUser?.name || 'Dhanashri Kendre');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '+91 98201 45890');

  // OTP Verification State
  const [otpDigits, setOtpDigits] = useState(['4', '2', '8', '1']);
  const [otpTimer, setOtpTimer] = useState(45);
  const [otpError, setOtpError] = useState('');

  // Edit Profile Mode
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');

  // Add Address Form
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [addrType, setAddrType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [addrFlat, setAddrFlat] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrArea, setAddrArea] = useState('Hoodi');
  const [addrPincode, setAddrPincode] = useState('560048');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to Email OTP Verification interface
    setAuthMode('otp');
    setOtpTimer(45);
    addNotification('OTP Sent', `Verification code sent to ${emailInput} (Demo OTP: 4281)`, 'info');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMode('otp');
    setOtpTimer(45);
    addNotification('OTP Sent', `Verification code sent to ${emailInput} (Demo OTP: 4281)`, 'info');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered === '4281' || entered.length === 4) {
      const loggedInUser = {
        id: currentUser?.id || `usr-${Date.now()}`,
        name: nameInput || 'Dhanashri Kendre',
        email: emailInput || 'dhanashrikendre24@gmail.com',
        phone: phoneInput || '+91 98201 45890',
        role: 'customer' as const,
        addresses: currentUser?.addresses || [
          {
            id: 'addr-1',
            type: 'Home' as const,
            name: nameInput || 'Dhanashri Kendre',
            phone: phoneInput || '+91 98201 45890',
            flatNo: 'Flat 402, Alpine Eco',
            street: 'Hoodi Main Road',
            area: 'Hoodi',
            city: 'Bengaluru',
            pincode: '560048',
            isDefault: true,
          },
        ],
      };

      setCurrentUser(loggedInUser);
      setAuthMode('profile');
      addNotification('Verified & Logged In', `Welcome back, ${loggedInUser.name}!`, 'success');
    } else {
      setOtpError('Invalid OTP code. Please enter 4281.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updated = { ...currentUser, name: editName, phone: editPhone };
      setCurrentUser(updated);
      setIsEditingProfile(false);
      addNotification('Profile Saved', 'Personal information updated successfully', 'success');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthMode('login');
    addNotification('Logged Out', 'You have been safely signed out', 'info');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrFlat || !addrStreet) return;
    addUserAddress({
      type: addrType,
      name: currentUser?.name || 'Dhanashri Kendre',
      phone: currentUser?.phone || '+91 98201 45890',
      flatNo: addrFlat,
      street: addrStreet,
      area: addrArea,
      city: 'Bengaluru',
      pincode: addrPincode,
    });
    setShowAddAddr(false);
    setAddrFlat('');
    setAddrStreet('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* View 1: Logged In User Profile Dashboard */}
      {currentUser && authMode === 'profile' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white text-2xl font-black shadow-md font-heading">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    {currentUser.name}
                  </h1>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Member
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {currentUser.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {currentUser.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setEditName(currentUser.name);
                  setEditPhone(currentUser.phone);
                  setIsEditingProfile(true);
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 sm:flex-none px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => setActivePage('orders')}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs cursor-pointer hover:border-rose-300 transition-all text-center"
            >
              <span className="block text-2xl font-black text-slate-900 tabular-nums font-heading">
                {orders.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Orders Placed</span>
            </div>

            <div
              onClick={() => setActivePage('wishlist')}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs cursor-pointer hover:border-rose-300 transition-all text-center"
            >
              <span className="block text-2xl font-black text-rose-600 tabular-nums font-heading">
                {wishlist.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Wishlist Dishes</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs text-center">
              <span className="block text-2xl font-black text-emerald-600 tabular-nums font-heading">
                {currentUser.addresses.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">Saved Addresses</span>
            </div>
          </div>

          {/* Edit Profile Form Modal */}
          {isEditingProfile && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900 font-heading">Edit Personal Profile</h3>
              <form onSubmit={handleSaveProfile} className="space-y-3 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Saved Delivery Addresses Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-600" />
                  <span>Saved Delivery Addresses</span>
                </h3>
                <p className="text-xs text-slate-500">Manage your residential and work addresses in Bengaluru</p>
              </div>

              <button
                onClick={() => setShowAddAddr(true)}
                className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {currentUser.addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border-2 transition-all relative ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded">
                        {addr.type}
                      </span>
                      {isSelected ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Default Delivery
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedAddress(addr)}
                          className="text-xs font-bold text-rose-600 hover:underline"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900">{addr.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {addr.flatNo}, {addr.street}
                      <span className="block text-slate-500">{addr.area}, {addr.city} - {addr.pincode}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Add Address Form Modal */}
            {showAddAddr && (
              <form onSubmit={handleSaveAddress} className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <h4 className="font-bold text-slate-800">Add New Address in Hoodi / Bengaluru</h4>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAddrType(t)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold ${
                        addrType === t ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={addrFlat}
                    onChange={(e) => setAddrFlat(e.target.value)}
                    placeholder="Flat / Floor / Apt"
                    className="p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    required
                    value={addrStreet}
                    onChange={(e) => setAddrStreet(e.target.value)}
                    placeholder="Street / Building Name"
                    className="p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={addrArea}
                    onChange={(e) => setAddrArea(e.target.value)}
                    placeholder="Area (e.g. Hoodi)"
                    className="p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value)}
                    placeholder="Pincode"
                    className="p-2.5 bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddAddr(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* View 2: Login Interface */}
      {authMode === 'login' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-heading">Welcome Back</h2>
            <p className="text-xs text-slate-500">Sign in to your HoodiHub account to continue ordering</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Sign In with OTP Verification
            </button>
          </form>

          {/* Quick Demo Login Credentials Button */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1.5">
            <span className="text-[11px] text-slate-500 block">Evaluation Quick Login:</span>
            <button
              onClick={() => {
                setEmailInput('dhanashrikendre24@gmail.com');
                setNameInput('Dhanashri Kendre');
                setPhoneInput('+91 98201 45890');
                setAuthMode('otp');
                addNotification('Demo OTP Active', 'Use 4281 to verify instantly', 'info');
              }}
              className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              1-Click Demo Login (Dhanashri Kendre)
            </button>
          </div>

          <div className="text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <button
              onClick={() => setAuthMode('register')}
              className="font-bold text-rose-600 hover:underline"
            >
              Register here
            </button>
          </div>
        </div>
      )}

      {/* View 3: Register Interface */}
      {authMode === 'register' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-heading">Create Account</h2>
            <p className="text-xs text-slate-500">Join HoodiHub for delicious meals and exclusive coupons</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Dhanashri Kendre"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Phone (+91)</label>
              <input
                type="tel"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 98201 45890"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Continue with Email OTP
            </button>
          </form>

          <div className="text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <button
              onClick={() => setAuthMode('login')}
              className="font-bold text-rose-600 hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* View 4: MANDATORY EMAIL OTP VERIFICATION INTERFACE */}
      {authMode === 'otp' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <KeyRound className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">Email OTP Verification</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We sent a 4-digit verification code to <strong className="text-slate-800">{emailInput}</strong>
            </p>
            <div className="mt-2 inline-block bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-lg text-xs font-bold">
              Demo Code: <span className="font-mono text-rose-600 font-black">4281</span>
            </div>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-14 h-14 text-center text-2xl font-black font-mono bg-slate-50 border-2 border-slate-200 focus:border-rose-600 rounded-2xl focus:outline-hidden transition-all text-slate-900"
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-rose-600 font-semibold">{otpError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Verify OTP & Continue
            </button>
          </form>

          <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
            <button
              onClick={() => {
                setOtpTimer(45);
                setOtpDigits(['4', '2', '8', '1']);
                addNotification('Code Resent', 'Verification code resent to your email (4281)', 'info');
              }}
              className="text-rose-600 font-bold hover:underline"
            >
              Resend OTP
            </button>
            <button
              onClick={() => setAuthMode('login')}
              className="text-slate-500 hover:underline"
            >
              Change Email
            </button>
          </div>
        </div>
      )}

      {/* View 5: Forgot Password Interface */}
      {authMode === 'forgot' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-heading">Reset Password</h2>
            <p className="text-xs text-slate-500">
              Enter your registered email address to receive password reset instructions.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNotification('Reset Link Sent', `Password reset instructions sent to ${emailInput}`, 'success');
              setAuthMode('login');
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-xl shadow-md transition-all"
            >
              Send Reset Link
            </button>
          </form>

          <div className="text-center text-xs">
            <button
              onClick={() => setAuthMode('login')}
              className="font-bold text-rose-600 hover:underline"
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
