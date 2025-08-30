import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import type { AuthResponseDto } from "@/types/auth";
import type { UserRole } from "@/types/user";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useAuthStore.getState().auth as AuthResponseDto;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.roles)) {
    return <Navigate to="/" replace />;
  }

  return <>{children} </>;
};
//render children nếu thỏa dk

export default ProtectedRoute;
