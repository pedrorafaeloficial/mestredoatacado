import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { StoreProvider } from './context/StoreContext';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Catalog = lazy(() => import('./pages/Catalog').then(module => ({ default: module.Catalog })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const AdminLogin = lazy(() => import('./pages/admin/Login').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.AdminDashboard })));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-50">
    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </StoreProvider>
  );
}
