// src/hooks/useFetch.js
import { useEffect, useState } from "react";
import { authFetch } from "../auth/api";

export function useFetch(path, { immediate = true, options = {} } = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(immediate);

    async function run() {
        setLoading(true);
        setError("");
        try {
        const res = await authFetch(path, options);
        const text = await res.text();
        // Intentar parsear JSON con error claro si viene HTML
        let json;
        try { json = JSON.parse(text); }
        catch {
            const snippet = text.slice(0, 200).replace(/\s+/g, " ");
            throw new Error(`Respuesta no-JSON (status ${res.status}). Snippet: ${snippet}`);
        }
        if (!res.ok || json?.success === false) {
            throw new Error(json?.message || `Error HTTP ${res.status}`);
        }
        setData(json?.data ?? json);
        } catch (e) {
        setError(e.message || "Error de red");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => { if (immediate) run(); /* eslint-disable-next-line */ }, [path]);

    return { data, error, loading, refetch: run };
}
