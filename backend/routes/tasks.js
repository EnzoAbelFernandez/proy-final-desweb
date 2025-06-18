const express = require("express");
const router = express.Router();

const taskRepo = require('./mock/taskRepoMock');
const taskController = require('./controllers/taskController')(taskRepo);

// Rutas
router.get('/api/tasks', taskController.getAllTasks);
router.post('/api/tasks', taskController.createTask);
router.delete('/api/tasks/:id', taskController.deleteTask);

module.exports = router;