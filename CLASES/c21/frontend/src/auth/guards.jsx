// src/auth/guards.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getToken, getUser } from "./api";

export function RequireAuth({ children }) {
    const token = getToken();
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
}

export function RequireAdmin({ children }) {
    const token = getToken();
    const user  = getUser();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (user?.role !== "ADMIN") {
        // elegí dónde cae un NO-ADMIN; / o /catalog están ok
        return <Navigate to="/" replace />;
    }
    return children;
}
