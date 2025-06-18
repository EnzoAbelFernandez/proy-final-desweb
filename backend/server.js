const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});