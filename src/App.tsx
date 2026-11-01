import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HeroSection } from './components/user/HeroSection';
import { PromotionalBanners } from './components/user/PromotionalBanners';
import { CategoryList } from './components/user/CategoryList';
import { FoodSections } from './components/user/FoodSections';
import { SearchView } from './components/user/SearchView';
import { CartView } from './components/user/CartView';
import { CheckoutView } from './components/user/CheckoutView';
import { OrdersView } from './components/user/OrdersView';
import { WishlistView } from './components/user/WishlistView';
import { RestaurantsView } from './components/user/RestaurantsView';
import { OffersView } from './components/user/OffersView';
import { ProfileAuthModal } from './components/user/ProfileAuthModal';
import { FoodDetailModal } from './components/user/FoodDetailModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DeliveryPartnerDashboard } from './components/delivery/DeliveryPartnerDashboard';

import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { LocationModal } from './components/user/LocationModal';

const AppContent: React.FC = () => {
  const { activePanel, activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Top Professional Navigation Bar */}
      <Navbar />

      {/* Main Panel View Routing */}
      <main className="flex-1">
        {activePanel === 'admin' ? (
          <AdminDashboard />
        ) : activePanel === 'delivery' ? (
          <DeliveryPartnerDashboard />
        ) : (
          /* User Panel */
          <>
            {activePage === 'home' && (
              <>
                <HeroSection />
                <PromotionalBanners />
                <CategoryList />
                <FoodSections />
              </>
            )}

            {activePage === 'search' && <SearchView />}
            {activePage === 'cart' && <CartView />}
            {activePage === 'checkout' && <CheckoutView />}
            {activePage === 'orders' && <OrdersView />}
            {activePage === 'wishlist' && <WishlistView />}
            {activePage === 'restaurants' && <RestaurantsView />}
            {activePage === 'offers' && <OffersView />}
            {activePage === 'profile' && <ProfileAuthModal />}
            {activePage === 'login' && <LoginPage />}
            {activePage === 'register' && <RegisterPage />}
          </>
        )}
      </main>

      {/* Food Detail Modal (Accessible across the platform with Add to Cart & Order Now buttons) */}
      <FoodDetailModal />

      {/* Latur Delivery Location Selection Modal */}
      <LocationModal />

      {/* Floating Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
