const bcrypt = require('bcrypt');
const saltRounds = 10;

let usersDB = []; // Base de datos simulada

// 1. Registro
const registerUser = async ({ username, email, password }) => {
    if (usersDB.some(u => u.email === email)) {
        throw new Error('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        id: usersDB.length + 1,
        username,
        email,
        password: hashedPassword
    };

    usersDB.push(newUser);
    return { id: newUser.id, username, email };
};

// 2. Login
const loginUser = async (email, password) => {
    const user = usersDB.find(u => u.email === email);
    if (!user) throw new Error('Credenciales inválidas');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Credenciales inválidas');

    return { id: user.id, username: user.username, email: user.email };
};

// 3. Obtener usuario
const getUser = (userId) => {
    const user = usersDB.find(u => u.id === userId);
    if (!user) return null;
    return { id: user.id, username: user.username, email: user.email };
};

// 4. Actualizar usuario
const updateUser = async (userId, newData) => {
    const userIndex = usersDB.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('Usuario no encontrado');

    usersDB[userIndex] = { ...usersDB[userIndex], ...newData };
    return getUser(userId);
};

// 5. Eliminar usuario
const deleteUser = (userId) => {
    usersDB = usersDB.filter(u => u.id !== userId);
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};