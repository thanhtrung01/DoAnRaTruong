const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/google', userController.google);
router.post('/google_login', userController.googleLogin);

module.exports = router;
