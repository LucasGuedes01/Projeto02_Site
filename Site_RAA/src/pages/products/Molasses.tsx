import React from 'react';
import { Droplets, Leaf, Beaker, ShieldCheck } from 'lucide-react';
import ProductFeature from '../../components/ProductFeature';

const features = [
  {
    icon: Beaker,
    title: 'Rico em Nutrientes',
    description: 'Alto teor de açúcares fermentescíveis e minerais essenciais.',
  },
  {
    icon: Leaf,
    title: 'Sustentável',
    description: 'Subproduto 100% natural do processamento da cana-de-açúcar.',
  },
  {
    icon: Droplets,
    title: 'Versatilidade',
    description: 'Múltiplas aplicações na indústria e nutrição animal.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualidade',
    description: 'Rigoroso controle de qualidade em todo processo produtivo.',
  },
];

export default function Molasses() {
  return (
    <div className="pt-20">
      <div 
        className="h-[400px] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.imgur.com/W3zGI2p.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Melaço</h1>
            <p className="text-xl max-w-2xl">
              Subproduto versátil e rico em nutrientes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Melaço de Alta Qualidade
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Nosso melaço é um subproduto valioso do processo de fabricação do açúcar,
                rico em açúcares e minerais, ideal para diversas aplicações industriais
                e nutrição animal.
              </p>
              <ul>
                <li>Alto teor de açúcares fermentescíveis</li>
                <li>Rico em minerais e micronutrientes</li>
                <li>Excelente fonte energética</li>
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

        <div className="bg-amber-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Especificações Técnicas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Composição Típica</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Brix</span>
                  <span className="font-medium">80-85°</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Açúcares Totais</span>
                  <span className="font-medium">45-55%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Proteína</span>
                  <span className="font-medium">3-5%</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Características Físicas</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Cor</span>
                  <span className="font-medium">Marrom Escuro</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Viscosidade</span>
                  <span className="font-medium">12.000-15.000 cP</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">pH</span>
                  <span className="font-medium">5.0-6.5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Aplicações
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Nutrição Animal</h3>
              <p className="text-gray-600">
                Suplementação energética para rações e complementos alimentares.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Fermentação</h3>
              <p className="text-gray-600">
                Substrato para processos fermentativos industriais.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Indústria Alimentícia</h3>
              <p className="text-gray-600">
                Ingrediente para produtos alimentícios e bebidas.
              </p>
            </div>
          </div>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Solicite uma Cotação
          </a>
        </div>
      </div>
    </div>
  );
}