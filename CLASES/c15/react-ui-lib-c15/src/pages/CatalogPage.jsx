import { useEffect, useState } from "react";
import Tema from "../components/Tema";

export default function CatalogPage() {
    const [librosApi, setLibrosApi] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");

    // Leer categoría desde la URL sin hooks
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") || "";

    useEffect(() => {
        let cancelado = false;
        (async () => {
        try {
            setCargando(true);
            setError("");
            const res = await fetch("/api/books"); // via proxy Vite
            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
            const json = await res.json();
            if (!cancelado) {
            const arr = Array.isArray(json?.books) ? json.books : [];
            setLibrosApi(arr);
            }
        } catch (e) {
            if (!cancelado) setError(e.message || "Error desconocido");
        } finally {
            if (!cancelado) setCargando(false);
        }
        })();
        return () => { cancelado = true; };
    }, []);

    if (cargando) return <p style={{margin:"8px 0"}}>Cargando catálogo…</p>;
    if (error)    return <p style={{margin:"8px 0", color:"crimson"}}>Error cargando catálogo: {error}</p>;

    // Adaptar al componente Tema
    const adaptados = librosApi.map((b) => ({
        id: b.id,
        titulo: b.title ?? "",
        imagen: b.image || "/placeholder-libro.jpg",
        descripcion: `${b.author || "Autor desconocido"} · $${b.price}`,
        categoria: b.category || "General",
        enlace: "#",
    }));

    // Filtro categoría + búsqueda por título (sin hooks)
    const q = busqueda.trim().toLowerCase();
    const filtrados = adaptados.filter((l) => {
        const okCat = !cat || l.categoria === cat;
        const okTitulo = !q || l.titulo.toLowerCase().includes(q);
        return okCat && okTitulo;
    });

    return (
        <>
        <h2 style={{margin:"0 0 12px"}}>Catálogo {cat ? `· ${cat}` : ""}</h2>

        {/* 🔎 Barra de búsqueda (aparece arriba del catálogo) */}
        <input
            type="text"
            placeholder="Buscar por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{width:"100%", padding:"10px 12px", marginBottom:12, borderRadius:8, border:"1px solid #ccc"}}
        />

      {/* Grilla de libros */}
        <div
        style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            alignItems: "stretch",
        }}
        >
        {filtrados.map((libro) => (
            <Tema
            key={libro.id}
            titulo={libro.titulo}
            enlace={libro.enlace}
            imagen={libro.imagen}
            descripcion={libro.descripcion}
            />
        ))}
        </div>

        {filtrados.length === 0 && (
        <p style={{marginTop:12, color:"#666"}}>
            No se encontraron libros para esta búsqueda/categoría.
        </p>
        )}
    </>
    );
}
