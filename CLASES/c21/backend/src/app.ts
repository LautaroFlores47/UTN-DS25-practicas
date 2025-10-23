import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// debug opcional
app.get('/health', (_req,res)=>res.json({ok:true}));

// rutas
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// error handler básico
app.use((err:any, _req:any, res:any, _next:any) => {
  const status = err.statusCode || 500;
  res.status(status).json({ success:false, message: err.message || 'Error interno' });
});

app.get('/', (_req, res) => {
  res.send('API de Librería corriendo ✅');
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

export default app;
