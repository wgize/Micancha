// src/guards/SimpleGuard.jsx
import { Navigate } from "react-router-dom";

export default function RoleGuard({ children, role }) {
  const userRole = localStorage.getItem("role");
  console.log("[SimpleGuard] rol requerido:", role, "- rol actual:", userRole);
  if (!userRole || userRole !== role)
    return <Navigate to="/forbidden" replace />;
  return children;
}
