const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../controllers/auth');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/profile', authMiddleware, userController.getUserProfile);

router.put('/update', authMiddleware, userController.updateUser);

module.exports = router;