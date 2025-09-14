import express from "express";
import prisma from "./prisma";

const app = express();
const PORT = 3000;

app.use(express.json());

// GET /api/books -> trae de la DB
app.get("/api/books", async (_req, res) => {
    try {
    const books = await prisma.book.findMany({ orderBy: { id: "asc" } });
    res.json({ books, total: books.length });
    } catch (e) {
    console.error("GET /api/books error:", e);
    res.status(500).json({ message: "Error al obtener libros" });
    }
});

// POST /api/books -> crea en la DB
app.post("/api/books", async (req, res) => {
    try {
    const { title, author, price, category, image } = req.body || {};

    if (!title) {
        return res.status(400).json({ message: "El campo 'title' es obligatorio." });
    }
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "El precio debe ser un número mayor que 0." });
    }

    const created = await prisma.book.create({
        data: {
        title,
        author: author || "N/A",
        price,
        category: category || "General",
        image: image || "/placeholder-libro.jpg",
        },
    });

    res.status(201).json({ book: created, message: "Libro creado correctamente." });
    } catch (e) {
    console.error("POST /api/books error:", e);
    res.status(500).json({ message: "Error al crear libro" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API C16 lista en http://localhost:${PORT}`);
});
