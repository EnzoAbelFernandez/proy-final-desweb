module.exports = (userRepo) => ({
    login: (req, res) => {
        const { username, password } = req.body;
        userRepo.login(username, password, (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (user) return res.json({ success: true, user });
            res.status(401).json({ success: false, message: "Credenciales inválidas" });
        });
    },

    register: (req, res) => {
        const { username, password } = req.body;
        userRepo.register(username, password, (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: user.id, username: user.username });
        });
    }
});
