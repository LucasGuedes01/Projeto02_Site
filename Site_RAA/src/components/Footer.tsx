import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rio Amambai Agroenergia</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                ROD BR 163 KM 118 - Naviraí - MS
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                (67) 3409-0515
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                contato@rioamambaiagroenergia.com.br
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/carreiras" className="hover:text-green-400">Carreiras</Link></li>
              <li><Link to="/contato" className="hover:text-green-400">Contato</Link></li>
              <li><Link to="/localizacao" className="hover:text-green-400">Localização</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Certificações</h3>
            <p className="text-sm">
              Certificada RenovaBio desde 2020, comprometida com a sustentabilidade 
              e qualidade em nossos processos.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Rio Amambai Agroenergia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;