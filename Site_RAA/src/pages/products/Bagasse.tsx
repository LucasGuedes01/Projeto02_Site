import React from 'react';
import { Trees, Zap, Recycle, Truck } from 'lucide-react';
import ProductFeature from '../../components/ProductFeature';

const features = [
  {
    icon: Trees,
    title: 'Sustentável',
    description: 'Biomassa 100% renovável para geração de energia limpa.',
  },
  {
    icon: Zap,
    title: 'Alto Poder Calorífico',
    description: 'Excelente fonte de energia para processos industriais.',
  },
  {
    icon: Recycle,
    title: 'Economia Circular',
    description: 'Aproveitamento integral dos resíduos da cana-de-açúcar.',
  },
  {
    icon: Truck,
    title: 'Logística',
    description: 'Disponibilidade e entrega programada conforme demanda.',
  },
];

export default function Bagasse() {
  return (
    <div className="pt-20">
      <div 
        className="h-[400px] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.imgur.com/7jNvlrg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Bagaço de Cana</h1>
            <p className="text-xl max-w-2xl">
              Biomassa sustentável para geração de energia limpa
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Energia Renovável
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                O bagaço de cana é uma biomassa de alto valor energético, resultante 
                do processo de moagem da cana-de-açúcar. É uma fonte renovável de 
                energia, utilizada principalmente em caldeiras industriais.
              </p>
              <ul>
                <li>
                  <strong>Cogeração:</strong> Geração simultânea de energia térmica e elétrica.
                </li>
                <li>
                  <strong>Sustentabilidade:</strong> Fonte renovável com baixa emissão de carbono.
                </li>
                <li>
                  <strong>Eficiência:</strong> Alto poder calorífico e boa combustão.
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
              <h3 className="text-lg font-semibold mb-4">Características Físicas</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Umidade</span>
                  <span className="font-medium">48-52%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Fibras</span>
                  <span className="font-medium">45-50%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Cinzas</span>
                  <span className="font-medium">2-3%</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Poder Calorífico</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">PCI (50% umidade)</span>
                  <span className="font-medium">1.800 kcal/kg</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Densidade</span>
                  <span className="font-medium">150-200 kg/m³</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Granulometria</span>
                  <span className="font-medium">5-50 mm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Aplicações Industriais
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            O bagaço de cana é uma excelente opção para indústrias que buscam uma 
            fonte de energia renovável e sustentável, com fornecimento regular e 
            custo competitivo.
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