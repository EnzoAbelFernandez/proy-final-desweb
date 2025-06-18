let mockUsers = [{ id: 1, username: "admin", password: "1234" }];
let nextId = 2;

module.exports = {
    login: (username, password, cb) => {
        const user = mockUsers.find(u => u.username === username && u.password === password);
        cb(null, user || null);
    },

    register: (username, password, cb) => {
        if (mockUsers.find(u => u.username === username)) {
            return cb(new Error("Usuario ya existe"));
        }
        const newUser = { id: nextId++, username, password };
        mockUsers.push(newUser);
        cb(null, newUser);
    }
};
