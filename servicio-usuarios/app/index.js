const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://usuarios-db:27017/cine', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rutas
app.use('/usuarios', userRoutes);

app.listen(8001, () => {
    console.log('Servicio de Usuarios en puerto 8001');
});