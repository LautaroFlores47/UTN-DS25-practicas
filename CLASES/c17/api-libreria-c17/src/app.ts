import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bookRoutes from './routes/book.routes';

const app = express();

// CORS abierto en dev (podés restringir origin luego)
app.use(cors());
app.use(express.json());

// Endpoints de prueba
app.get('/health', (_req, res) => res.json({ ok: true }));
app.post('/debug/echo', (req, res) => res.json({ received: req.body }));

// Rutas (con y sin /api por si el front pega distinto)
app.use('/api/books', bookRoutes);
app.use('/books', bookRoutes);

// MIDDLEWARE DE ERRORES con LOGS
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  // Log en consola (para ver el detalle en terminal)
    console.error('❌ ERROR:', {
        path: req.path,
        message: err?.message,
        code: err?.code,
        stack: err?.stack,
    });

    const status = err.statusCode || 500;
  // En dev devolvemos info suficiente para entender el fallo
    res.status(status).json({
        success: false,
        message: err?.message || 'Error interno del servidor',
        code: err?.code,
        stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack
    });
});

export default app;
