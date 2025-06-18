const db = require('../database/db');

module.exports = {
    login: (username, password, cb) => {
        db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], cb);
    },

    register: (username, password, cb) => {
        db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, password],
            function (err) {
                if (err) return cb(err);
                cb(null, { id: this.lastID, username });
            }
        );
    }
};
