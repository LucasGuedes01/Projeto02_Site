import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LogIn, Shield, AlertCircle } from 'lucide-react';

const mainNavItems = [
  { path: '/', label: 'Início' },
  { path: '/historia', label: 'Nossa História' },
  { path: '/produtos', label: 'Produtos' },
  { path: '/sustentabilidade', label: 'Sustentabilidade' },
  { path: '/noticias', label: 'Notícias' },
  { path: '/carreiras', label: 'Carreiras' },
  { path: '/contato', label: 'Contato' },
  { path: '/localizacao', label: 'Localização' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const renderNavItem = (path, label) => (
    <Link
      key={path}
      to={path}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        location.pathname === path
          ? 'text-green-700 bg-green-50'
          : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-10">
            <Link
              to="/etica"
              className="group flex items-center gap-2 px-4 py-1 text-sm font-medium hover:text-yellow-300 transition-colors mr-8" // Adicionado "mr-8" para alinhamento
            >
              <Shield className="h-4 w-4 text-yellow-400 animate-pulse" />
              <span>Canal de Ética e Denúncias</span>
              <AlertCircle className="h-4 w-4 text-yellow-400 animate-pulse" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://imgur.com/CUPMuDl.png"
                alt="Rio Amambai Agroenergia Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu Centralizado */}
          <div className="hidden md:flex items-center justify-center flex-grow space-x-1">
            {mainNavItems.map(({ path, label }) => renderNavItem(path, label))}
            <Link
              to="/login"
              className="ml-4 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Abrir menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/etica"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="h-5 w-5 text-yellow-400" />
              Canal de Ética e Denúncias
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </Link>
            {mainNavItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === path
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
