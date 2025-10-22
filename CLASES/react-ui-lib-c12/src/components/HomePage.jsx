import React from 'react';
import Tema from './Tema';
import { Grid } from '@mui/material';

export default function HomePage() {
    return (
        <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
            <Tema
            titulo="Fantasía"
            enlace="/fantasia"
            imagen="/images.jpg"
            descripcion="El Imperio Final - Brandon Sanderson"
            />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Tema
            titulo="Ciencia Ficción"
            enlace="/ciencia-ficcion"
            imagen="/D_NQ_NP_951620-MLA43677613114_102020-O.webp"
            descripcion="Dune - Frank Herbert"
            />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Tema
            titulo="Terror"
            enlace="/terror"
            imagen="/1554d01d226679a6e8402fad007b31a6.webp"
            descripcion="Frankenstein - Mary Shelley"
            />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Tema
            titulo="Infantil"
            enlace="/infantil"
            imagen="/01a088ded508dbb7439c267529a769ca.webp"
            descripcion="Alicia en el País de las Maravillas - Lewis Carroll"
            />
        </Grid>
        </Grid>
    );
}

