const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/users');

// Registrar usuario
router.post('/', (req, res) => {
    try {
        const { email, nombre } = req.body;
        if (!email || !nombre) {
            return res.status(400).json({ error: 'Email y nombre son requeridos' });
        }
        const newUser = createUser({ email, nombre });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
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