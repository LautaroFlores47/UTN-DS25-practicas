import { useEffect, useState } from "react";
import Tema from "../components/Tema";
import { authFetch } from "../auth/api"; 

export default function CatalogPage() {
    const [librosApi, setLibrosApi] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");

    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") || "";

    useEffect(() => {
        let cancelado = false;

        async function cargar() {
        try {
            setCargando(true);
            setError("");

            const path = cat
            ? `/api/books?category=${encodeURIComponent(cat)}`
            : `/api/books`;

            const res = await authFetch(path, { method: "GET" });
            const text = await res.text();

            let json;
            try {
            json = JSON.parse(text);
            } catch {
            const snippet = text.slice(0, 200).replace(/\s+/g, " ");
            throw new Error(`Respuesta no-JSON (status ${res.status}). Snippet: ${snippet}`);
            }

            if (!res.ok || json?.success === false) {
            throw new Error(json?.message || `Error HTTP ${res.status}`);
            }

            const arr = Array.isArray(json?.data) ? json.data : [];
            if (!cancelado) setLibrosApi(arr);

            // subir al inicio
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (e) {
            if (!cancelado) setError(e.message || "Error desconocido");
        } finally {
            if (!cancelado) setCargando(false);
        }
        }

        cargar();
        return () => {
        cancelado = true;
        };
    }, [cat]);

    if (cargando) return <p style={{ margin: "8px 0" }}>Cargando catálogo…</p>;
    if (error) return <p style={{ margin: "8px 0", color: "crimson" }}>Error cargando catálogo: {error}</p>;

    const adaptados = librosApi.map((b) => {
        const categoryNames =
        b.categoryNames ?? (Array.isArray(b.categories) ? b.categories.map((c) => c.name) : []);
        const categoriaPrincipal = categoryNames[0] || "General";
        const autorNombre = b.author?.name ?? b.author ?? "Autor desconocido";
        const imagen = b.imageUrl || "/placeholder-libro.jpg";

        return {
        id: b.id,
        titulo: b.title ?? "",
        imagen,
        descripcion: `${autorNombre} · $${b.price ?? ""}`,
        categorias: categoryNames,
        categoria: categoriaPrincipal,
        stock: b.stock ?? 0,
        enlace: "#",
        };
    });

    const q = busqueda.trim().toLowerCase();
    const filtrados = adaptados.filter((l) => !q || l.titulo.toLowerCase().includes(q));

    return (
        <>
        <h2 style={{ margin: "0 0 12px" }}>
            Catálogo {cat ? `· ${cat}` : ""}
        </h2>

        <input
            type="text"
            placeholder="Buscar por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
            }}
        />

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
            No se encontraron libros para esta búsqueda{cat ? ` en ${cat}` : ""}.
            </p>
        )}
        </>
    );
}
