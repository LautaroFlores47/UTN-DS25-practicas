import { useEffect, useState } from "react";
import Tema from "../components/Tema";

export default function CatalogPage() {
    const [librosApi, setLibrosApi] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");

    // Leer categoría desde la URL (ej: /catalog?cat=Terror)
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") || "";

    useEffect(() => {
        let cancelado = false;
        (async () => {
        try {
            setCargando(true);
            setError("");

            // Si preferís server-side filter: fetch(`/api/books?category=${encodeURIComponent(cat)}`)
            const res = await fetch("/api/books"); // via proxy Vite
            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
            const json = await res.json();

            // 🔧 La API devuelve { success, data:[...] }, NO { books:[...] }
            const arr = Array.isArray(json?.data) ? json.data : [];

            if (!cancelado) setLibrosApi(arr);
        } catch (e) {
            if (!cancelado) setError(e.message || "Error desconocido");
        } finally {
            if (!cancelado) setCargando(false);
        }
        })();
        return () => { cancelado = true; };
    }, []);

    if (cargando) return <p style={{ margin: "8px 0" }}>Cargando catálogo…</p>;
    if (error) return <p style={{ margin: "8px 0", color: "crimson" }}>Error cargando catálogo: {error}</p>;

    // Adaptar estructura de la API a la tarjeta Tema
    const adaptados = librosApi.map((b) => {
        const categoryNames = b.categoryNames ?? (Array.isArray(b.categories) ? b.categories.map(c => c.name) : []);
        const categoriaPrincipal = categoryNames[0] || "General";
        const autorNombre = b.author?.name ?? "Autor desconocido";
        const imagen = b.imageUrl || "/placeholder-libro.jpg";

        return {
        id: b.id,
        titulo: b.title ?? "",
        imagen,
        descripcion: `${autorNombre} · $${b.price}`,
        categorias: categoryNames,      // array para filtrar bien
        categoria: categoriaPrincipal,  // compat con UI actual
        stock: b.stock ?? 0,
        enlace: "#",
        };
    });

    // Filtros: por categoría (desde query) + por texto (título)
    const q = busqueda.trim().toLowerCase();

    const filtrados = adaptados.filter((l) => {
        const okCat = !cat || (Array.isArray(l.categorias) && l.categorias.some(n => n.toLowerCase() === cat.toLowerCase()));
        const okTitulo = !q || l.titulo.toLowerCase().includes(q);
        // si querés ocultar sin stock, descomentá:
        // const okStock = l.stock > 0;
        // return okCat && okTitulo && okStock;
        return okCat && okTitulo;
    });

    return (
        <>
        <h2 style={{ margin: "0 0 12px" }}>Catálogo {cat ? `· ${cat}` : ""}</h2>

        {/* 🔎 Barra de búsqueda */}
        <input
            type="text"
            placeholder="Buscar por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginBottom: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        {/* Grilla */}
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
            <p style={{ marginTop: 12, color: "#666" }}>
            No se encontraron libros para esta búsqueda/categoría.
            </p>
        )}
        </>
    );
}
