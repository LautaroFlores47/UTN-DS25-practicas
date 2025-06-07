import React from 'react';

export default function Layout({ children }) {
    return (
    <div id="contenedor">
        <header id="cabecera">
        <img
            src="/pngtree-books-logo-image_80041.jpg"
            alt="Logo Librería"
            id="logo"
        />
        <h1>Librería</h1>
        </header>

        <nav id="menu">
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/fantasia">Fantasía</a></li>
            <li><a href="/ciencia-ficcion">Ciencia Ficción</a></li>
            <li><a href="/terror">Terror</a></li>
            <li><a href="/infantil">Infantil</a></li>
            <li><a href="/registro">Registrarse</a></li>
            <li><a href="/contacto">Contacto</a></li>
        </ul>
        </nav>

        <main id="contenido">
        {children}
        </main>

        <footer id="pie">
        <p>
            &copy; 2025 Librería | @libreria.lp |{' '}
            <a href="#">Términos y condiciones</a>
        </p>
        </footer>
    </div>
    );
}
