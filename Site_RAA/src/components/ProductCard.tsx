import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import Button from './Button'; // Importação do componente Button

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  image: string;
}

export default function ProductCard({ icon: Icon, title, description, path, image }: ProductCardProps) {
  return (
    <Link
      to={path}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-200 text-sm">{description}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <p className="text-gray-600">
          Clique para saber mais sobre nosso {title.toLowerCase()} e suas aplicações.
        </p>
        <Button variant="primary" className="mt-4">Ver Produto</Button>
      </div>
    </Link>
  );
}
