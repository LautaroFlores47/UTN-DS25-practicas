import { Box, Typography, CircularProgress, Alert, List, ListItem, ListItemText } from "@mui/material";
import { useFetch } from "../hooks/useFetch.js";

export default function ListaPosts() {
    const { datos: posts, cargando, error } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    if (cargando) return <Box sx={{ display: "flex", gap: 2, py: 2 }}><CircularProgress size={24} /><Typography>Cargando posts…</Typography></Box>;
    if (error) return <Alert severity="error">No se pudieron cargar los posts: {error}</Alert>;

    return (
    <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Posts (desde API)</Typography>
        <List dense sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
        {posts?.map((p) => (
            <ListItem key={p.id}>
            <ListItemText primary={p.title} secondary={p.body} />
            </ListItem>
        ))}
        </List>
    </Box>
    );
}
