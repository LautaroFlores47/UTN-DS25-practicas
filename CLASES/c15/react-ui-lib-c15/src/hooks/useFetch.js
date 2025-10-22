import { useEffect, useState, useCallback } from "react";

export function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargar = useCallback(async () => {
    try {
        setCargando(true);
        setError("");
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const json = await res.json();
        setDatos(json);
    } catch (err) {
        setError(err.message || "Error desconocido");
    } finally {
        setCargando(false);
    }
    }, [url]);

    useEffect(() => {
    cargar();
    }, [cargar]);

    return { datos, cargando, error, refetch: cargar };
}
