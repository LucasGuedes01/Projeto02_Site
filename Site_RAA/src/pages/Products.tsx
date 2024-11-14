import React from 'react';
import { Droplet, Cookie, Beaker, TestTube, Trees } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    icon: Droplet,
    title: 'Etanol',
    description: 'Combustível renovável de alta performance',
    path: '/produtos/etanol',
    image: 'https://i.imgur.com/h9AdMma.jpg', // Link direto da imagem no Imgur
  },
  {
    icon: Cookie,
    title: 'Açúcar',
    description: 'Qualidade superior para indústria e varejo',
    path: '/produtos/acucar',
    image: 'https://i.imgur.com/DPgCbKa.jpg',
  },
  {
    icon: Beaker,
    title: 'Melaço',
    description: 'Subproduto versátil para múltiplas aplicações',
    path: '/produtos/melaco',
    image: 'https://i.imgur.com/W3zGI2p.jpg',
  },
  {
    icon: TestTube,
    title: 'Creme de Levedura',
    description: 'Nutrição animal de alta qualidade',
    path: '/produtos/levedura',
    image: 'https://i.imgur.com/jCtvqGN.jpg',
  },
  {
    icon: Trees,
    title: 'Bagaço de Cana',
    description: 'Biomassa sustentável para geração de energia',
    path: '/produtos/bagaco',
    image: 'https://i.imgur.com/f7J4ErA.jpg',
  },
];

export default function Products() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossos Produtos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Excelência em produtos do setor sucroenergético, com foco em qualidade e sustentabilidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.path} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
