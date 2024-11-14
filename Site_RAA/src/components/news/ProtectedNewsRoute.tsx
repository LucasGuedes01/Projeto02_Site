import React from 'react';
import { Navigate } from 'react-router-dom';
import { useNewsAuthStore } from '../../stores/newsAuthStore';

interface ProtectedNewsRouteProps {
  children: React.ReactNode;
}

export default function ProtectedNewsRoute({ children }: ProtectedNewsRouteProps) {
  const isAuthenticated = useNewsAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/noticias/login" replace />;
  }

  return <>{children}</>;
}