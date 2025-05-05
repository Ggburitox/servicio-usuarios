const bcrypt = require('bcrypt');
const saltRounds = 10;

// Base de datos simulada
let usersDB = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: '$2b$10$G8ZcZyY1WJcD5Z7Q5WYJ3.9u7zQ0rJW7XkQJ3YQ3YQ3YQ3YQ3YQ3YQ' // hash de "admin123"
    }
];

// Helper para generar IDs
const generateId = () => usersDB.length > 0 ? Math.max(...usersDB.map(u => u.id)) + 1 : 1;

// Registro de usuario
exports.registerUser = async (userData) => {
    const { username, email, password } = userData;
    
    // Validar si el email ya existe
    if (usersDB.some(user => user.email === email)) {
        throw new Error('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
        id: generateId(),
        username,
        email,
        password: hashedPassword
    };

    usersDB.push(newUser);
    return { id: newUser.id, username: newUser.username, email: newUser.email };
};

// Login de usuario
exports.loginUser = async (email, password) => {
    const user = usersDB.find(user => user.email === email);
    if (!user) throw new Error('Credenciales inválidas');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Credenciales inválidas');

    return { id: user.id, username: user.username, email: user.email };
};

// Obtener usuario por ID
exports.getUser = (userId) => {
    const user = usersDB.find(user => user.id === userId);
    if (!user) return null;
    return { id: user.id, username: user.username, email: user.email };
};
