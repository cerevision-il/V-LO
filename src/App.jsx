import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Toast      from './components/UI/Toast';
import SideCart   from './components/UI/SideCart';
import Navbar     from './components/Layout/Navbar';
import MobileNav  from './components/Layout/MobileNav';
import Footer     from './components/Layout/Footer';

import Home          from './pages/Home';
import Cart          from './pages/Cart';
import Checkout      from './pages/Checkout';
import Login         from './pages/Login';
import OrderSuccess  from './pages/OrderSuccess';
import Dashboard     from './pages/admin/Dashboard';
import CategoryPage  from './pages/CategoryPage';
import DemoBanner    from './components/UI/DemoBanner';

import menProducts, { MEN_SUBCATEGORIES } from './data/menProducts';
import womenProducts, { WOMEN_SUBCATEGORIES } from './data/womenProducts';

function StorefrontLayout({ children }) {
  return (
    <>
      <DemoBanner />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileNav />
      <SideCart />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path="/"                  element={<Navigate to="/home" replace />} />
          <Route path="/home"              element={<StorefrontLayout><Home /></StorefrontLayout>} />
          <Route path="/men"               element={<StorefrontLayout><CategoryPage title="Men's Collection" description="Discover our curated men's selection, from heavy outerwear to everyday essentials." products={menProducts} categories={MEN_SUBCATEGORIES} /></StorefrontLayout>} />
          <Route path="/women"             element={<StorefrontLayout><CategoryPage title="Women's Collection" description="Elevated silhouettes and premium fabrics. Explore the latest women's arrivals." products={womenProducts} categories={WOMEN_SUBCATEGORIES} /></StorefrontLayout>} />
          <Route path="/cart"              element={<StorefrontLayout><Cart /></StorefrontLayout>} />
          <Route path="/checkout"          element={<StorefrontLayout><Checkout /></StorefrontLayout>} />
          <Route path="/login"             element={<Login />} />
          <Route path="/order-success"     element={<StorefrontLayout><OrderSuccess /></StorefrontLayout>} />
          <Route path="/admin/dashboard"   element={<Dashboard />} />
          <Route path="*"                  element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
