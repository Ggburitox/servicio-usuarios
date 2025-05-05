let fakeUsersDB = [
    { id: 1, email: 'admin@example.com', nombre: 'Admin' },
    { id: 2, email: 'user@example.com', nombre: 'Usuario Normal' }
];

exports.getUser = (userId) => {
    return fakeUsersDB.find(user => user.id === userId);
};

exports.createUser = (userData) => {
    const newId = fakeUsersDB.length > 0 ? Math.max(...fakeUsersDB.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, ...userData };
    fakeUsersDB.push(newUser);
    return newUser;
};