import { Link } from "react-router-dom";

const sections = [
    { name: "Infantil",        img: "/cat-infantil.jpg",  desc: "Cuentos y libros para peques" },
    { name: "Terror",          img: "/cat-terror.jpg",    desc: "Historias que dan miedo" },
    { name: "Ciencia Ficción", img: "/cat-scifi.jpg",        desc: "Futuros posibles" },
    { name: "Fantasía",        img: "/cat-fantasia.jpg",  desc: "Historias mágicas y épicas" },
    ];

    export default function HomePage() {
    return (
        <div>
        <h2 style={{ margin: "0 0 16px" }}>Secciones</h2>

        <div
            style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            alignItems: "stretch",
            }}
        >
            {sections.map((s) => (
            <Link
                key={s.name}
                to={`/catalog?cat=${encodeURIComponent(s.name)}`}
                style={{
                display: "block",
                textDecoration: "none",
                border: "1px solid #ddd",
                borderRadius: 12,
                overflow: "hidden",
                background: "white",
                }}
            >
                <div style={{ height: 180, background: "#f3f3f3" }}>
                <img
                    src={s.img}
                    alt={s.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.src = "/placeholder-libro.jpg"; }}
                />
                </div>
                <div style={{ padding: 12 }}>
                <h3 style={{ margin: "0 0 6px", color: "#222" }}>{s.name}</h3>
                <p style={{ margin: 0, color: "#666" }}>{s.desc}</p>
                </div>
            </Link>
            ))}
        </div>
        </div>
    );
}
