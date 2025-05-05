const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/users');

// Registrar usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const newUser = await registerUser({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }
        const user = await loginUser(email, password);
        res.json({ 
            message: 'Login exitoso',
            user,
            token: 'fake-jwt-token-' + user.id // Simulación de token
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Obtener usuario por ID
router.get('/:userId', (req, res) => {
    const user = getUser(Number(req.params.userId));
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
});

module.exports = router;
module.exports = router;
