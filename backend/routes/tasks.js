const express = require("express");
const app = express();
app.use(express.json());

const taskRepo = require('./mock/taskRepoMock'); // usarás el real después
const taskController = require('./controllers/taskController')(taskRepo);

// Rutas
app.get('/api/tasks', taskController.getAllTasks);
app.post('/api/tasks', taskController.createTask);
app.delete('/api/tasks/:id', taskController.deleteTask);
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
