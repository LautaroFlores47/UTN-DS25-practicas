import { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper } from "@mui/material";
import { authFetch } from "../auth/api";

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
        authorName: form.autor.trim(),
        price: Number(form.precio),
        categoryNames: form.categoria.trim() ? [form.categoria.trim()] : [],
        imageUrl: form.imagen.trim() || "/placeholder-libro.jpg",
        stock: Number(10),
        };

        if (!payload.title) return alert("Ingresá un título.");
        if (!Number.isFinite(payload.price) || payload.price <= 0) {
        return alert("Ingresá un precio válido (> 0).");
        }

        const res = await authFetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
        if (res.status === 401) {
            alert("Necesitás iniciar sesión.");
            window.location.href = "/login";
            return;
        }
        const err = await res.json().catch(() => ({}));
        return alert(err?.message || "No se pudo crear el libro.");
        }

        setForm({ titulo: "", autor: "", precio: "", categoria: "", imagen: "" });
        alert("Libro creado correctamente.");
    };

    return (
        <Container maxWidth="sm">
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
            Agregar libro
            </Typography>

            <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
            <TextField fullWidth label="Título" value={form.titulo} onChange={actualizar("titulo")} required />
            <TextField fullWidth label="Autor" value={form.autor} onChange={actualizar("autor")} />
            <TextField fullWidth label="Precio" type="number" value={form.precio} onChange={actualizar("precio")} inputProps={{ min: 1 }} required />
            <TextField fullWidth label="Categoría" value={form.categoria} onChange={actualizar("categoria")} placeholder="Clásicos / Ciencia Ficción / Terror / Infantil" />
            <TextField fullWidth label="URL de imagen (opcional)" value={form.imagen} onChange={actualizar("imagen")} placeholder="/placeholder-libro.jpg" />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Button type="submit" variant="contained">Crear</Button>
            </Box>
            </Box>
        </Paper>
        </Container>
    );
}
