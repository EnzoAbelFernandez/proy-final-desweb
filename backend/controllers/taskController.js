// controllers/taskController.js
module.exports = (taskRepo) => ({
    getAllTasks: (req, res) => {
        taskRepo.getAll((err, tasks) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(tasks);
        });
    },

    createTask: (req, res) => {
        const { title, description } = req.body;
        taskRepo.create({ title, description }, (err, id) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id, title, description });
        });
    },

    deleteTask: (req, res) => {
        const id = req.params.id;
        taskRepo.delete(id, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deleted: changes });
        });
    }
});
