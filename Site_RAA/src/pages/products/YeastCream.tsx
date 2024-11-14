import React from 'react';
import { Beaker, ShieldCheck, Microscope, Heart } from 'lucide-react';
import ProductFeature from '../../components/ProductFeature';

const features = [
  {
    icon: Beaker,
    title: 'Alta Proteína',
    description: 'Rico em proteínas e aminoácidos essenciais para nutrição animal.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança',
    description: 'Processo controlado garantindo um produto seguro e de qualidade.',
  },
  {
    icon: Microscope,
    title: 'Tecnologia',
    description: 'Produzido com tecnologia avançada de separação e concentração.',
  },
  {
    icon: Heart,
    title: 'Benefícios',
    description: 'Melhora o desempenho e a saúde dos animais.',
  },
];

export default function YeastCream() {
  return (
    <div className="pt-20">
      <div 
        className="h-[400px] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.imgur.com/jCtvqGN.jpg',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Creme de Levedura</h1>
            <p className="text-xl max-w-2xl">
              Nutrição animal de alta qualidade
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Proteína de Alta Qualidade
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Nosso creme de levedura é obtido através de um processo controlado
                de separação e concentração das leveduras utilizadas na fermentação
                do etanol, resultando em um produto rico em proteínas e nutrientes.
              </p>
              <ul>
                <li>Alto teor proteico (maior que 30%)</li>
                <li>Rico em vitaminas do complexo B</li>
                <li>Excelente fonte de aminoácidos</li>
                <li>Certificação de qualidade</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <ProductFeature key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Especificações Técnicas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Composição Nutricional</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Proteína Bruta</span>
                  <span className="font-medium">30-35%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Umidade</span>
                  <span className="font-medium">70-75%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Cinzas</span>
                  <span className="font-medium">4-6%</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Características</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Aparência</span>
                  <span className="font-medium">Cremosa</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Cor</span>
                  <span className="font-medium">Bege a Marrom Claro</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">pH</span>
                  <span className="font-medium">4.5-5.5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Benefícios e Aplicações
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Nutrição Animal</h3>
              <p className="text-gray-600">
                Excelente fonte proteica para rações de diversos animais.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Digestibilidade</h3>
              <p className="text-gray-600">
                Alta digestibilidade e biodisponibilidade de nutrientes.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Sustentabilidade</h3>
              <p className="text-gray-600">
                Produto sustentável derivado do processo de produção de etanol.
              </p>
            </div>
          </div>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Solicite uma Cotação
          </a>
        </div>
      </div>
    </div>
  );
}