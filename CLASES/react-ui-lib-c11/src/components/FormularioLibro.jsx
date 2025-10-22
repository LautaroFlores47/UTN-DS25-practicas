import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function FormularioLibro({ alAgregar }) {
    const [formulario, setFormulario] = useState({
        titulo: "",
        autor: "",
        imagen: "",
        descripcion: "",
    });

    const actualizar = (campo) => (e) =>
    setFormulario({ ...formulario, [campo]: e.target.value });

    const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevo = {
        id: Date.now(),
        titulo: formulario.titulo.trim(),
        autor: formulario.autor.trim(),
        imagen: formulario.imagen.trim() || "/placeholder-libro.jpg",
        descripcion: formulario.descripcion.trim() || "Sin descripción",
        enlace: "/detalle",
    };
    if (!nuevo.titulo) return;     // validación mínima
    alAgregar(nuevo);               // avisamos al padre
    setFormulario({ titulo: "", autor: "", imagen: "", descripcion: "" });
    };

    return (
    <Box component="form" onSubmit={manejarSubmit} sx={{ display: "grid", gap: 2, mb: 3 }}>
        <TextField label="Título" value={formulario.titulo} onChange={actualizar("titulo")} required />
        <TextField label="Autor" value={formulario.autor} onChange={actualizar("autor")} />
        <TextField label="URL de imagen (opcional)" value={formulario.imagen} onChange={actualizar("imagen")} />
        <TextField label="Descripción" value={formulario.descripcion} onChange={actualizar("descripcion")} multiline rows={3} />
        <Button type="submit" variant="contained">Agregar libro</Button>
    </Box>
    );
}
