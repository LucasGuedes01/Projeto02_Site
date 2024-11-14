import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Location from './pages/Location';
import History from './pages/History';
import Products from './pages/Products';
import Ethanol from './pages/products/Ethanol';
import Sugar from './pages/products/Sugar';
import Molasses from './pages/products/Molasses';
import YeastCream from './pages/products/YeastCream';
import Bagasse from './pages/products/Bagasse';
import Sustainability from './pages/Sustainability';
import News from './pages/News';
import NewsLogin from './pages/news/NewsLogin';
import NewsAdmin from './pages/news/NewsAdmin';
import Careers from './pages/Careers';
import CareersLogin from './pages/careers/CareersLogin';
import CareersAdmin from './pages/careers/CareersAdmin';
import Contact from './pages/Contact';
import Ethics from './pages/Ethics';
import Login from './pages/Dashboard/Login';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import PowerBIDashboard from './pages/Dashboard/PowerBIDashboard';
import AccessibilityButton from './components/AccessibilityButton';
import ProtectedCareersRoute from './components/careers/ProtectedCareersRoute';
import ProtectedNewsRoute from './components/news/ProtectedNewsRoute';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/localizacao" element={<Location />} />
                <Route path="/historia" element={<History />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/produtos/etanol" element={<Ethanol />} />
                <Route path="/produtos/acucar" element={<Sugar />} />
                <Route path="/produtos/melaco" element={<Molasses />} />
                <Route path="/produtos/levedura" element={<YeastCream />} />
                <Route path="/produtos/bagaco" element={<Bagasse />} />
                <Route path="/sustentabilidade" element={<Sustainability />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/noticias/login" element={<NewsLogin />} />
                <Route
                  path="/noticias/admin"
                  element={
                    <ProtectedNewsRoute>
                      <NewsAdmin />
                    </ProtectedNewsRoute>
                  }
                />
                <Route path="/carreiras" element={<Careers />} />
                <Route path="/carreiras/login" element={<CareersLogin />} />
                <Route
                  path="/carreiras/admin"
                  element={
                    <ProtectedCareersRoute>
                      <CareersAdmin />
                    </ProtectedCareersRoute>
                  }
                />
                <Route path="/contato" element={<Contact />} />
                <Route path="/etica" element={<Ethics />} />
              </Routes>
            </main>
            <AccessibilityButton />
            <Footer />
          </>
        }
      />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<PowerBIDashboard />} />
        <Route path="producao" element={<PowerBIDashboard />} />
        <Route path="comercial" element={<PowerBIDashboard />} />
        <Route path="logistica" element={<PowerBIDashboard />} />
        <Route path="rh" element={<PowerBIDashboard />} />
        <Route path="configuracoes" element={<PowerBIDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;