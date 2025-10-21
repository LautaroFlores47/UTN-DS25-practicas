import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

export default function Tema({ titulo, enlace, imagen, descripcion }) {
    return (
        <Card elevation={2} sx={{ height:"100%", transition:".2s", "&:hover":{ transform:"translateY(-2px)", boxShadow: 6 } }}>
        <CardActionArea href={enlace}>
            <CardMedia
            component="img"
            height="180"
            image={imagen}
            alt={`Libro ${titulo}`}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {descripcion}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}
