import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AddBookPage from "./pages/AddBookPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import { RequireAdmin } from "./auth/guards";
import { getToken } from "./auth/api";
import "./App.css";

function HomeOrLogin() {
  const token = getToken();
  return token ? <HomePage /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Inicio: si no hay sesión -> login */}
        <Route path="/" element={<HomeOrLogin />} />

        <Route path="/catalog" element={<CatalogPage />} />

        {/* Agregar: solo ADMIN */}
        <Route path="/add" element={
          <RequireAdmin>
            <AddBookPage />
          </RequireAdmin>
        } />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}
