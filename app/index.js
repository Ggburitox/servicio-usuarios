const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

// Middleware CRUCIAL para recibir JSON
app.use(express.json());

// Configuración correcta del router
app.use('/usuarios', userRoutes); // Asegúrate que coincida con tu ruta POST

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});