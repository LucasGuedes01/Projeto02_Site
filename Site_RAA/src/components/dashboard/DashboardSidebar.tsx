import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Factory, 
  Truck, 
  Users,
  Settings
} from 'lucide-react';

const menuItems = [
  {
    name: 'Visão Geral',
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Produção',
    path: '/dashboard/producao',
    icon: Factory
  },
  {
    name: 'Comercial',
    path: '/dashboard/comercial',
    icon: TrendingUp
  },
  {
    name: 'Logística',
    path: '/dashboard/logistica',
    icon: Truck
  },
  {
    name: 'RH',
    path: '/dashboard/rh',
    icon: Users
  },
  {
    name: 'Configurações',
    path: '/dashboard/configuracoes',
    icon: Settings
  }
];

export default function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh-theme(spacing.16))]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}