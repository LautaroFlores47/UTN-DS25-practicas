import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CATEGORIAS = [
    { nombre: "Clásicos",        imagen: "/cat-fantasia.jpg" },
    { nombre: "Ciencia Ficción", imagen: "/cat-scifi.jpg" },
    { nombre: "Terror",          imagen: "/cat-terror.jpg" },
    { nombre: "Infantil",        imagen: "/cat-infantil.jpg" },
];

export default function HomePage() {
    return (
    <>
        <Typography variant="h4" style={{ marginBottom: 16 }}>Categorías</Typography>

        <div
        style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            alignItems: "stretch",
        }}
        >
        {CATEGORIAS.map((c) => (
            <Card
            key={c.nombre}
            elevation={2}
            style={{ height: "100%", transition: ".2s", overflow: "hidden" }}
            >
            <CardActionArea component={Link} to={`/catalog?cat=${encodeURIComponent(c.nombre)}`}>
                <CardMedia
                component="img"
                image={c.imagen}
                alt={c.nombre}
                style={{ height: 180, objectFit: "cover" }}
                />
                <CardContent>
                <Typography variant="h6" align="center">{c.nombre}</Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    Ver libros de {c.nombre}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        ))}
        </div>
    </>
    );
}
