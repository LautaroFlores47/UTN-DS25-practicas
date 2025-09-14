import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <Box sx={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <img src="/pngtree-books-logo-image_80041.jpg" alt="Logo" style={{ height:50, marginRight:15, borderRadius:4 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Librería</Typography>

          <Typography sx={{ mr: 2 }}>Hola, ¡bienvenido! 👋</Typography>

          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/catalog">Catálogo</Button>
          <Button color="inherit" component={Link} to="/add">Agregar</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ flexGrow: 1, mt: 4, mb: 6 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ textAlign:"center", p:2, bgcolor:"#222", color:"white", mt:"auto" }}>
        &copy; 2025 Librería | @libreria.lp | <a href="#" style={{ color:"lightblue" }}>Términos y condiciones</a>
      </Box>
    </Box>
  );
}
