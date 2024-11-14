import React from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';

export default function Location() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossa Localização</h1>
          <p className="text-xl text-gray-600">
            Rio Amambai Agroenergia - Naviraí, MS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Endereço</p>
                  <p className="text-gray-600">ROD BR 163 KM 118</p>
                  <p className="text-gray-600">Naviraí - MS</p>
                  <p className="text-gray-600">CEP: 79950-000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Telefone</p>
                  <p className="text-gray-600">(67) 3409-0500</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">E-mail</p>
                  <p className="text-gray-600">contato@rioamambaiagroenergia.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Como Chegar</p>
                  <p className="text-gray-600">
                    Localizada na BR-163, KM 118, nossa unidade é de fácil acesso pela rodovia principal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.590166814575!2d-54.21991482526799!3d-23.13657044888386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x948a7f0f98b4959f%3A0x7a2acf274c15ff1d!2sRio%20Amambai%20Agroenergia!5e0!3m2!1spt-BR!2sbr!4v1710284144435!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Rio Amambai Agroenergia"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}