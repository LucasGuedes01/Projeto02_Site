import React from 'react';
import { Cookie, Award, Scale, Factory } from 'lucide-react';
import ProductFeature from '../../components/ProductFeature';

const features = [
  {
    icon: Cookie,
    title: 'Alta Qualidade',
    description: 'Açúcar cristal de alta pureza, atendendo aos mais rigorosos padrões de qualidade.',
  },
  {
    icon: Award,
    title: 'Certificações',
    description: 'Produto certificado e em conformidade com normas nacionais e internacionais.',
  },
  {
    icon: Scale,
    title: 'Versatilidade',
    description: 'Ideal para uso industrial e varejo, com diferentes granulometrias disponíveis.',
  },
  {
    icon: Factory,
    title: 'Produção',
    description: 'Capacidade de produção superior a 150 mil toneladas por safra.',
  },
];

export default function Sugar() {
  return (
    <div className="pt-20">
      <div 
        className="h-[400px] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://i.imgur.com/DPgCbKa.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Açúcar</h1>
            <p className="text-xl max-w-2xl">
              Qualidade e pureza para sua indústria e consumidores
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Excelência em Açúcar
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Nosso açúcar é produzido com tecnologia de ponta e rigoroso controle de qualidade, 
                resultando em um produto de alta pureza e excelente desempenho para aplicações 
                industriais e consumo direto.
              </p>
              <ul>
                <li>
                  <strong>Açúcar Cristal:</strong> Cristais uniformes e alta pureza para uso industrial.
                </li>
                <li>
                  <strong>Açúcar VHP:</strong> Very High Polarization, ideal para exportação e 
                  refinarias.
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
              <h3 className="text-lg font-semibold mb-4">Açúcar Cristal</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Polarização</span>
                  <span className="font-medium">99,8° Z mín</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Cor ICUMSA</span>
                  <span className="font-medium">100 UI máx</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Umidade</span>
                  <span className="font-medium">0,04% máx</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Açúcar VHP</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Polarização</span>
                  <span className="font-medium">99,3° Z mín</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Cor ICUMSA</span>
                  <span className="font-medium">1000-1500 UI</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Umidade</span>
                  <span className="font-medium">0,15% máx</span>
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
            Atendemos diversos segmentos da indústria alimentícia, incluindo bebidas, 
            panificação, confeitaria e varejo, com produtos que atendem às mais 
            exigentes especificações do mercado.
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