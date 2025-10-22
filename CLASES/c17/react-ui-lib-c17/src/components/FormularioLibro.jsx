import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function FormularioLibro({ onCreated }) {
    const [formulario, setFormulario] = useState({
        titulo: "",
        autor: "",
        precio: "",
    });

    const actualizar = (campo) => (e) =>
        setFormulario({ ...formulario, [campo]: e.target.value });

    const manejarSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        title: formulario.titulo.trim(),
        author: formulario.autor.trim(),
        price: Number(formulario.precio),
    };

    if (!payload.title) return;
    if (!Number.isFinite(payload.price) || payload.price <= 0) {
        alert("Ingresá un precio válido (> 0).");
        return;
    }

    const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        alert("No se pudo crear el libro.");
        return;
    }

    setFormulario({ titulo: "", autor: "", precio: "" });
    onCreated?.(); // avisamos al padre para que haga refetch
    };

    return (
    <Box
        component="form"
        onSubmit={manejarSubmit}
        sx={{ display: "grid", gap: 2, mb: 3 }}
    >
        <TextField
        label="Título"
        value={formulario.titulo}
        onChange={actualizar("titulo")}
        required
        />
        <TextField
        label="Autor"
        value={formulario.autor}
        onChange={actualizar("autor")}
        />
        <TextField
        label="Precio"
        type="number"
        value={formulario.precio}
        onChange={actualizar("precio")}
        inputProps={{ min: 1 }}
        required
        />
        <Button type="submit" variant="contained">
        Agregar libro
        </Button>
    </Box>
    );
}
