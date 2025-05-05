const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

// Rutas
app.use('/usuarios', userRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', mode: 'local-testing' });
});

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Servicio de Usuarios en puerto ${PORT}`);
});