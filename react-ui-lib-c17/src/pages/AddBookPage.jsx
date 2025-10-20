import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function AddBookPage() {
    const [form, setForm] = useState({
        titulo: "",
        autor: "",
        precio: "",
        categoria: "",
        imagen: "",
    });

    const actualizar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();

        const payload = {
        title: form.titulo.trim(),
        authorName: form.autor.trim(), // 👈 explícito
        price: Number(form.precio),
        categoryNames: form.categoria.trim() ? [form.categoria.trim()] : [],
        imageUrl: form.imagen.trim() || "/placeholder-libro.jpg",
        stock:  Number(10), // opcional: fija stock>0 para que siempre se vea
        };

        if (!payload.title) return alert("Ingresá un título.");
        if (!Number.isFinite(payload.price) || payload.price <= 0) {
        return alert("Ingresá un precio válido (> 0).");
        }

        const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return alert(err?.message || "No se pudo crear el libro.");
        }

        setForm({ titulo: "", autor: "", precio: "", categoria: "", imagen: "" });
        alert("Libro creado correctamente.");
    };

    return (
        <>
        <Typography variant="h4" sx={{ mb: 2 }}>Agregar libro</Typography>
        <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2, maxWidth: 480 }}>
            <TextField label="Título" value={form.titulo} onChange={actualizar("titulo")} required />
            <TextField label="Autor" value={form.autor} onChange={actualizar("autor")} />
            <TextField label="Precio" type="number" value={form.precio} onChange={actualizar("precio")} inputProps={{ min: 1 }} required />
            <TextField label="Categoría" value={form.categoria} onChange={actualizar("categoria")} placeholder="Clásicos / Ciencia Ficción / Terror / Infantil" />
            <TextField label="URL de imagen (opcional)" value={form.imagen} onChange={actualizar("imagen")} placeholder="/placeholder-libro.jpg" />
            <Button type="submit" variant="contained">Crear</Button>
        </Box>
        </>
    );
}
