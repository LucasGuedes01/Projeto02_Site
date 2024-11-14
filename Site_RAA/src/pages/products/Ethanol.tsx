import React from 'react';
import { Droplets, Truck, BarChart, Factory } from 'lucide-react';
import ProductFeature from '../../components/ProductFeature';

const features = [
  {
    icon: Droplets,
    title: 'Alta Pureza',
    description: 'Etanol de alta qualidade para diversos usos industriais e combustível.',
  },
  {
    icon: Truck,
    title: 'Logística',
    description: 'Distribuição eficiente com frota própria e parceiros.',
  },
  {
    icon: BarChart,
    title: 'Produção',
    description: 'Capacidade superior a 200 milhões de litros por safra.',
  },
  {
    icon: Factory,
    title: 'Tecnologia',
    description: 'Processo produtivo moderno e automatizado.',
  },
];

export default function Ethanol() {
  return (
    <div className="pt-20">
      <div 
        className="h-[400px] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.imgur.com/0gut9Pp.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Etanol</h1>
            <p className="text-xl max-w-2xl">
              Energia renovável para um futuro sustentável
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Qualidade Superior
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Nosso etanol é produzido com tecnologia de ponta e rigoroso controle 
                de qualidade, atendendo às mais exigentes especificações do mercado 
                nacional e internacional.
              </p>
              <ul>
                <li>
                  <strong>Etanol Hidratado:</strong> Para uso como combustível.
                </li>
                <li>
                  <strong>Etanol Anidro:</strong> Para mistura com gasolina.
                </li>
                <li>
                  <strong>Etanol Industrial:</strong> Para diversos segmentos industriais.
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <ProductFeature key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Especificações Técnicas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Etanol Hidratado</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Teor Alcoólico</span>
                  <span className="font-medium">92,5-93,8% INPM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Acidez Total</span>
                  <span className="font-medium">30 mg/L máx</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">pH</span>
                  <span className="font-medium">6,0-8,0</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Etanol Anidro</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Teor Alcoólico</span>
                  <span className="font-medium">99,3% INPM mín</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Condutividade</span>
                  <span className="font-medium">500 μS/m máx</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Densidade</span>
                  <span className="font-medium">791,5 kg/m³ máx</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Aplicações e Mercados
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Atendemos diversos segmentos do mercado, desde combustíveis até 
            aplicações industriais específicas, sempre com qualidade e 
            regularidade no fornecimento.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Solicite uma Cotação
          </a>
        </div>
      </div>
    </div>
  );
}
