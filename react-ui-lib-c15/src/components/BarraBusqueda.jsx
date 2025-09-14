import TextField from "@mui/material/TextField";

export default function BarraBusqueda({ valor, alCambiar }) {
    return (
    <TextField
        label="Buscar por título"
        variant="outlined"
        value={valor}
        onChange={(e) => alCambiar(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
    />
    );
}
