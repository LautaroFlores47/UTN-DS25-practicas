import { useState } from "react";
import React from "react";
import Layout from "./components/Layout";
import Tema from "./components/Tema";
import BarraBusqueda from "./components/BarraBusqueda";
import FormularioLibro from "./components/FormularioLibro";
import ListaUsuarios from "./components/ListaUsuarios"; 
import ListaPosts from "./components/ListaPosts";
import "./EJ5estilos.css";

export default function App() {
  const [libros, setLibros] = useState([
    { id: 1, titulo: "Fantasía", autor: "Varios", enlace: "/fantasia", imagen: "/images.jpg", descripcion: "Historias llenas de magia y aventuras." },
    { id: 2, titulo: "Ciencia Ficción", autor: "Varios", enlace: "/ciencia-ficcion", imagen: "/D_NQ_NP_951620-MLA43677613114_102020-O.webp", descripcion: "Viajes espaciales y futuros distópicos." },
    { id: 3, titulo: "Terror", autor: "Varios", enlace: "/terror", imagen: "/1554d01d226679a6e8402fad007b31a6.webp", descripcion: "Relatos que te pondrán los pelos de punta." },
    { id: 4, titulo: "Infantil", autor: "Varios", enlace: "/infantil", imagen: "/01a088ded508dbb7439c267529a769ca.webp", descripcion: "Cuentos y aventuras para los más pequeños." },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const librosFiltrados = libros.filter((l) =>
    l.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarLibro = (nuevo) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <Layout>
      {/* Búsqueda */}
      <BarraBusqueda valor={busqueda} alCambiar={setBusqueda} />

      {/* Formulario para agregar */}
      <FormularioLibro alAgregar={agregarLibro} />

      {/* Lista (filtrada) de libros */}
      <div
        className="books-grid"
        style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        {librosFiltrados.map((libro) => (
          <Tema
            key={libro.id}
            titulo={libro.titulo}
            enlace={libro.enlace}
            imagen={libro.imagen}
            descripcion={libro.descripcion}
          />
        ))}
      </div>

      <ListaUsuarios /> 
      <ListaPosts /> 
    </Layout>
  );
}




