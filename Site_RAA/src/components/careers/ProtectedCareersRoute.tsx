import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCareersAuthStore } from '../../stores/careersAuthStore';

interface ProtectedCareersRouteProps {
  children: React.ReactNode;
}

export default function ProtectedCareersRoute({ children }: ProtectedCareersRouteProps) {
  const isAuthenticated = useCareersAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/carreiras/login" replace />;
  }

  return <>{children}</>;
}