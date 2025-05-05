const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

// 1. REGISTRO (POST /usuarios/register)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación básica
        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'Username, email y password son requeridos'
            });
        }

        // Validación de email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                error: 'Formato de email inválido'
            });
        }

        const newUser = await registerUser({ username, email, password });
        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. LOGIN (POST /usuarios/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email y password son requeridos'
            });
        }

        const userData = await loginUser(email, password);
        res.json({
            message: 'Login exitoso',
            user: userData,
            token: 'fake-jwt-token-' + userData.id // Token simulado
        });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// 3. OBTENER USUARIO (GET /usuarios/:id)
router.get('/:userId', (req, res) => {
    try {
        const user = getUser(Number(req.params.userId));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// 4. ACTUALIZAR USUARIO (PUT /usuarios/:id)
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await updateUser(
            Number(req.params.userId),
            req.body
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. ELIMINAR USUARIO (DELETE /usuarios/:id)
router.delete('/:userId', (req, res) => {
    try {
        deleteUser(Number(req.params.userId));
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;