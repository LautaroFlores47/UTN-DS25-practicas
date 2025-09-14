"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
let books = [
    { id: 1, title: "Don Quijote", author: "Cervantes", price: 1500, category: "Clásicos", image: "/placeholder-libro.jpg" },
    { id: 2, title: "1984", author: "Orwell", price: 1200, category: "Ciencia Ficción", image: "/placeholder-libro.jpg" },
    { id: 3, title: "IT", author: "Stephen King", price: 1800, category: "Terror", image: "/placeholder-libro.jpg" },
    { id: 4, title: "El Principito", author: "Saint-Exupéry", price: 900, category: "Infantil", image: "/placeholder-libro.jpg" },
];
app.get("/api/books", (_req, res) => {
    res.json({ books, total: books.length });
});
app.post("/api/books", (req, res) => {
    const { title, author, price, category, image } = req.body || {};
    if (!title)
        return res.status(400).json({ message: "El campo 'title' es obligatorio." });
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "El precio debe ser un número mayor que 0." });
    }
    const nextId = books.length === 0 ? 1 : Math.max(...books.map(b => b.id)) + 1;
    const newBook = {
        id: nextId,
        title,
        author: author || "N/A",
        price,
        category: (category || "General"),
        image: (image || "/placeholder-libro.jpg"),
    };
    books.push(newBook);
    return res.status(201).json({ book: newBook, message: "Libro creado correctamente." });
});
app.listen(PORT, () => {
    console.log(`🚀 API lista en http://localhost:${PORT}`);
});
