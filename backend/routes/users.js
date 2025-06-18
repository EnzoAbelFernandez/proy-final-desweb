const express = require('express');
const router = express.Router();

// Importás el mock o el real
const userRepo = require('./mock/userRepoMock'); // o ./repos/userRepoSqlite
const userController = require('./controllers/userController')(userRepo);

router.post('/api/users/login', userController.login);
router.post('/api/users/register', userController.register);

module.exports = router;
