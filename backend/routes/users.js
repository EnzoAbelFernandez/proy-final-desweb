const express = require('express');
const router = express.Router();

// Importás el mock o el real
const userRepo = require('../repos/userRepoSqLite');
const userController = require('../controllers/userController')(userRepo);

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
