import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProductFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ProductFeature: React.FC<ProductFeatureProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <Icon className="w-8 h-8 text-green-600 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ProductFeature;