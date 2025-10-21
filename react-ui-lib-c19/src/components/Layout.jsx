import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { getToken, getUser, logout } from "../auth/api";

export default function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const token = getToken();
  const user = getUser();
  const isAdmin = user?.role === "ADMIN";

  if (isAuthPage) {
    // Vista minimal para login/registro
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#e8f1fb", // azul pastel
          p: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 480 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src="/pngtree-books-logo-image_80041.jpg"
              alt="Logo"
              style={{ height: 64, borderRadius: 8, objectFit: "contain" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
              Librería
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    );
  }

  // Layout normal para el resto de páginas
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src="/pngtree-books-logo-image_80041.jpg"
            alt="Logo"
            style={{ height: 50, marginRight: 15, borderRadius: 4 }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Librería
          </Typography>

          {token ? (
            <Typography sx={{ mr: 2 }}>
              {user?.name || user?.email} ({user?.role})
            </Typography>
          ) : (
            <Typography sx={{ mr: 2 }}>Hola, ¡bienvenido! 👋</Typography>
          )}

          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/catalog">Catálogo</Button>

          {isAdmin && (
            <Button color="inherit" component={Link} to="/add">Agregar</Button>
          )}

          {token ? (
            <Button color="inherit" onClick={logout}>Salir</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Registro</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ flexGrow: 1, mt: 4, mb: 6 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ textAlign: "center", p: 2, bgcolor: "#222", color: "white", mt: "auto" }}>
        &copy; {new Date().getFullYear()} Librería | @libreria.lp |{" "}
        <a href="#" style={{ color: "lightblue" }}>Términos y condiciones</a>
      </Box>
    </Box>
  );
}
