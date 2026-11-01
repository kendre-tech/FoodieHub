import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerUser, setActivePage, setActivePanel, sendOtp, verifyOtp, addNotification } = useApp();

  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & Error Handling
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // OTP Verification Interface State
  const [otpDigits, setOtpDigits] = useState(['4', '2', '8', '1']);
  const [otpTimer, setOtpTimer] = useState(45);
  const [otpError, setOtpError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setIsLoading(true);
    await sendOtp(email.trim());
    setIsLoading(false);
    setStep('otp');
    setOtpTimer(45);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);

    if (val && index < 3) {
      const nextInput = document.getElementById(`register-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyAndRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    const entered = otpDigits.join('');

    if (verifyOtp(entered) || entered === '4281') {
      const res = registerUser(fullName, email, phone, password);
      if (res.success) {
        setActivePage('home');
      } else {
        setOtpError(res.message);
      }
    } else {
      setOtpError('Invalid OTP code. Please enter 4281 to verify.');
    }
  };

  const handleResendOtp = async () => {
    await sendOtp(email);
    setOtpTimer(45);
    setOtpDigits(['4', '2', '8', '1']);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-md shadow-rose-500/20">
            <UtensilsCrossed className="w-6 h-6" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            {step === 'form' ? 'Create HoodiHub Account' : 'Verify Email OTP'}
          </h1>

          <p className="text-xs text-slate-500">
            {step === 'form'
              ? 'Join HoodiHub to order across all 8 zones in Latur (413512)'
              : `Enter the 4-digit code sent to ${email}`}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-semibold animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: REGISTRATION FORM */}
        {step === 'form' && (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dhanashri Kendre"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Mobile Number (+91)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9820145890"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium text-slate-900"
                />
              </div>
            </div>

            {/* Password with Show/Hide Toggle */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Password (min 6 chars)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password with Show/Hide Toggle */}
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Sending OTP...' : 'Continue to Email OTP Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: EMAIL OTP VERIFICATION INTERFACE */}
        {step === 'otp' && (
          <div className="space-y-5 text-center animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-2 rounded-xl text-xs font-semibold">
              <span>Evaluation Code: </span>
              <strong className="font-mono text-rose-600 text-sm">4281</strong>
            </div>

            {otpError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyAndRegister} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`register-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-13 h-14 text-center text-2xl font-black font-mono bg-slate-50 border-2 border-slate-200 focus:border-rose-600 rounded-2xl focus:outline-hidden text-slate-900 transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify OTP & Complete Registration</span>
              </button>
            </form>

            <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-rose-600 font-bold hover:underline"
              >
                Resend Code
              </button>
              <button
                type="button"
                onClick={() => setStep('form')}
                className="text-slate-500 hover:underline"
              >
                ← Edit Details
              </button>
            </div>
          </div>
        )}

        {/* Switch to Login Page */}
        <div className="pt-2 text-center text-xs text-slate-600">
          <span>Already have an account? </span>
          <button
            onClick={() => setActivePage('login')}
            className="font-black text-rose-600 hover:underline cursor-pointer"
          >
            Sign In here
          </button>
        </div>

        {/* Separate Admin Login link */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Manager or Restaurant Owner?</span>
          <button
            onClick={() => setActivePanel('admin')}
            className="font-bold text-amber-600 hover:underline flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
