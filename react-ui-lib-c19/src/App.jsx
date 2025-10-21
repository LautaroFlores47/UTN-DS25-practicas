import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import AddBookPage from "./pages/AddBookPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { RequireAuth, RequireAdmin } from "./auth/guards";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Home con secciones */}
        <Route path="/" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />
        <Route path="/catalog" element={
          <RequireAuth>
            <CatalogPage />
          </RequireAuth>
        } />
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
