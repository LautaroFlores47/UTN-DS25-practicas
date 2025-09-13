import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Estado global simple (puede ser tema, idioma, carrito... aca usamos usuario)
    const [usuario, setUsuario] = useState("Lauti");

    const value = { usuario, setUsuario };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook de conveniencia para consumir el contexto
export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext debe usarse dentro de <AppProvider>");
    return ctx;
}
