import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useAppContext } from "../context/AppContext.jsx"; // ⬅️ NUEVO

export default function Layout({ children }) {
  const { usuario } = useAppContext(); // ⬅️ NUEVO

    return (
    <Box sx={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
        <AppBar position="static">
        <Toolbar>
            <img src="/pngtree-books-logo-image_80041.jpg" alt="Logo" style={{ height:50, marginRight:15, borderRadius:4 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Librería</Typography>

          {/* Saludo simple usando el estado global */}
            <Typography sx={{ mr: 2 }}>Hola, {usuario} 👋</Typography>

          {/* Botones que ya tenías */}
            <Button color="inherit" href="/">Inicio</Button>
            <Button color="inherit" href="/catalog">Catálogo</Button>
        </Toolbar>
        </AppBar>

        <Container sx={{ flexGrow: 1, mt: 4 }}>
        {children}
        </Container>

        <Box component="footer" sx={{ textAlign:"center", p:2, bgcolor:"#222", color:"white", mt:"auto" }}>
        &copy; 2025 Librería | @libreria.lp | <a href="#" style={{ color:"lightblue" }}>Términos y condiciones</a>
        </Box>
    </Box>
    );
}

