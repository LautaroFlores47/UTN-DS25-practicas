import React from 'react';
import Tema from './Tema';

export default function HomePage() {
    return (
    <>
        <Tema
        titulo="Fantasía"
        enlace="/fantasia"
        imagen="/images.jpg"
        descripcion="El Imperio Final - Brandon Sanderson"
        />
        <Tema
        titulo="Ciencia Ficción"
        enlace="/ciencia-ficcion"
        imagen="/D_NQ_NP_951620-MLA43677613114_102020-O.webp"
        descripcion="Dune - Frank Herbert"
        />
        <Tema
        titulo="Terror"
        enlace="/terror"
        imagen="/1554d01d226679a6e8402fad007b31a6.webp"
        descripcion="Frankenstein - Mary Shelley"
        />
        <Tema
        titulo="Infantil"
        enlace="/infantil"
        imagen="/01a088ded508dbb7439c267529a769ca.webp"
        descripcion="Alicia en el País de las Maravillas - Lewis Carroll"
        />
    </>
    );
}
