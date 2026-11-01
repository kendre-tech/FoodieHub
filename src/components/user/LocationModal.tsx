import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  X,
  Navigation,
  CheckCircle2,
  Building2,
  Compass,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    selectedAddress,
    laturDeliveryAreas,
    selectLaturArea,
    requestCurrentLocation,
    addUserAddress,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'areas' | 'manual'>('areas');
  const [isLocating, setIsLocating] = useState(false);

  // Manual Address Form State
  const [flatNo, setFlatNo] = useState('');
  const [street, setStreet] = useState('');
  const [manualArea, setManualArea] = useState<string>(laturDeliveryAreas[0]);
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('413512');
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');

  if (!isLocationModalOpen) return null;

  const handleUseGPS = async () => {
    setIsLocating(true);
    await requestCurrentLocation();
    setIsLocating(false);
    setIsLocationModalOpen(false);
  };

  const handleSelectArea = (area: string) => {
    selectLaturArea(area);
    setIsLocationModalOpen(false);
  };

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flatNo || !street) return;

    addUserAddress({
      type: addressType,
      name: selectedAddress.name || 'Dhanashri Kendre',
      phone: selectedAddress.phone || '+91 98201 45890',
      flatNo,
      street,
      area: manualArea,
      landmark,
      city: 'Latur',
      pincode: pincode || '413512',
      isDefault: true,
      lat: 18.4088,
      lng: 76.5604,
    });

    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black font-heading leading-tight">
                Select Delivery Location
              </h3>
              <p className="text-xs text-rose-300 font-medium">
                Latur, Maharashtra, India (413512)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick GPS Location Button */}
          <button
            onClick={handleUseGPS}
            disabled={isLocating}
            className="w-full p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-dashed border-rose-300 text-rose-700 font-bold text-xs flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Navigation className={`w-4 h-4 text-rose-600 ${isLocating ? 'animate-spin' : 'group-hover:scale-110'} transition-transform`} />
              <div className="text-left">
                <span className="block font-black text-slate-900">
                  {isLocating ? 'Detecting Location...' : 'Use Current Location (GPS)'}
                </span>
                <span className="text-[11px] text-slate-500 font-normal">
                  Auto-detect coordinates in Latur, Maharashtra
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
              Detect →
            </span>
          </button>

          {/* Tab Selector: Delivery Areas vs Manual Entry */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('areas')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'areas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              8 Delivery Areas in Latur
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'manual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Manual Address Entry
            </button>
          </div>

          {/* TAB 1: 8 DELIVERY AREAS IN LATUR */}
          {activeTab === 'areas' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Official Delivery Zones:</span>
                <span className="text-rose-600 font-bold">Standard Delivery: ₹50</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {laturDeliveryAreas.map((area) => {
                  const isSelected = selectedAddress.area === area;
                  return (
                    <button
                      key={area}
                      onClick={() => handleSelectArea(area)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-rose-600 bg-rose-50 text-slate-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="min-w-0 pr-1">
                        <span className="font-bold text-xs block truncate">{area}</span>
                        <span className="text-[10px] text-slate-400 block">Latur (413512)</span>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 fill-current" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400">
                  Delivering hot food in 25–30 mins across all 8 Latur municipal zones.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL ADDRESS ENTRY */}
          {activeTab === 'manual' && (
            <form onSubmit={handleSaveManual} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Address Type</label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAddressType(t)}
                      className={`flex-1 py-1.5 rounded-lg border font-bold ${
                        addressType === t ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">House / Flat / Floor No.</label>
                <input
                  type="text"
                  required
                  value={flatNo}
                  onChange={(e) => setFlatNo(e.target.value)}
                  placeholder="e.g. Plot 24, Shree Apartment"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Street / Building Name</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. Near Rajarshi Shahu College Road"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-rose-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Area (Latur)</label>
                  <select
                    value={manualArea}
                    onChange={(e) => setManualArea(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                  >
                    {laturDeliveryAreas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Town Hall, Near Bus Stand"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save & Deliver to this Address
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
