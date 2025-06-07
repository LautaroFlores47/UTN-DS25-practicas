// src/components/Tema.jsx
import React from 'react';

export default function Tema({ titulo, enlace, imagen, descripcion }) {
    return (
    <div className="tema">
        <h2>
        <a href={enlace}>{titulo}</a>
        </h2>
        <img src={imagen} alt={`Libro ${titulo}`} />
        <p>{descripcion}</p>
    </div>
    );
}
