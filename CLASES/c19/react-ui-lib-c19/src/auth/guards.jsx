import { Navigate } from "react-router-dom";
import { getToken, getUser } from "./api";

export function RequireAuth({ children }) {
    const token = getToken();
    if (!token) return <Navigate to="/" replace />; // al login
    return children;
}

export function RequireAdmin({ children }) {
    const token = getToken();
    const user  = getUser();
    if (!token) return <Navigate to="/" replace />;
    if (user?.role !== 'ADMIN') return <Navigate to="/catalog" replace />;
    return children;
}
