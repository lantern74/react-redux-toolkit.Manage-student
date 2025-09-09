import { Navigate } from "react-router-dom";
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// If user is NOT authenticated → redirect to signin
export const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/signin" replace />;
};

// If user IS authenticated → redirect to dashboard
export const PublicRoute = ({ children }: Props) => {
  const token = localStorage.getItem("authToken");
  return !token ? children : <Navigate to="/dashboard" replace />;
};
