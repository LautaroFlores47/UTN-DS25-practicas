import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function Layout({ children }) {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh' 
            }}
        >
            {/* Barra superior */}
            <AppBar position="static">
                <Toolbar>
                    <img
                        src="/pngtree-books-logo-image_80041.jpg"
                        alt="Logo Librería"
                        style={{ height: 50, marginRight: 15, borderRadius: 4 }}
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Librería
                    </Typography>
                    <Button color="inherit" href="/">Inicio</Button>
                    <Button color="inherit" href="/fantasia">Fantasía</Button>
                    <Button color="inherit" href="/ciencia-ficcion">Ciencia Ficción</Button>
                    <Button color="inherit" href="/terror">Terror</Button>
                    <Button color="inherit" href="/infantil">Infantil</Button>
                    <Button color="inherit" href="/registro">Registrarse</Button>
                    <Button color="inherit" href="/contacto">Contacto</Button>
                </Toolbar>
            </AppBar>

            {/* Contenido principal */}
            <Container sx={{ flexGrow: 1, marginTop: 4 }}>
                {children}
            </Container>

            {/* Pie de página */}
            <Box 
                component="footer"
                sx={{ 
                    textAlign: 'center', 
                    padding: 2, 
                    backgroundColor: '#222', 
                    color: 'white', 
                    mt: 'auto'  // Esto empuja el footer al fondo
                }}
            >
                &copy; 2025 Librería | @libreria.lp |{' '}
                <a href="#" style={{ color: 'lightblue' }}>Términos y condiciones</a>
            </Box>
        </Box>
    );
}

