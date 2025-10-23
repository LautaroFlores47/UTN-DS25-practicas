import app from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/health', (_req, res) => res.status(200).send('ok'));

app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});
