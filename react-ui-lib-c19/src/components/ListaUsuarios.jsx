import { Box, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import { useFetch } from "../hooks/useFetch.js";

export default function ListaUsuarios() {
    const { datos: usuarios, cargando, error, refetch } = useFetch("https://jsonplaceholder.typicode.com/users");

    if (cargando) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
        <CircularProgress size={24} />
        <Typography>Cargando usuarios…</Typography>
        </Box>
    );
    }

    if (error) {
    return (
        <Box sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
            No se pudieron cargar los usuarios: {error}
        </Alert>
        <Button variant="outlined" onClick={refetch}>Reintentar</Button>
        </Box>
    );
    }

    return (
    <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
        Usuarios (desde API)
        </Typography>
        <List dense sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
        {usuarios?.map((u, i) => (
            <Box key={u.id}>
            <ListItem>
                <ListItemText
                primary={`${u.name} — ${u.email}`}
                secondary={`${u.company?.name || "Sin compañía"} · ${u.address?.city || "Sin ciudad"}`}
                />
            </ListItem>
            {i < usuarios.length - 1 && <Divider component="li" />}
            </Box>
        ))}
        </List>
    </Box>
    );
}

