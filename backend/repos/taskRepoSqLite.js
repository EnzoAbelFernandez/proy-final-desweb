const db = require('../database/db');

module.exports = {
    getAll: (cb) => {
        db.all("SELECT * FROM tasks", [], (err, rows) => {
            cb(err, rows);
        });
    },

    create: ({ title, description }, cb) => {
        db.run(
            "INSERT INTO tasks (title, description) VALUES (?, ?)",
            [title, description],
            function (err) {
                cb(err, this?.lastID);
            }
        );
    },

    delete: (id, cb) => {
        db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
            cb(err, this?.changes);
        });
    }
};
