const express = require('express');
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/upload');
const router = express.Router();

// router.post("/register", userController.register);
router.get('/get-user', userController.getUser);
router.post('/get-user-with-email', upload.ImageOrAvatar('avatar'),userController.getUserWithMail);
router.put('/:userId', userController.updateUser);

module.exports = router;
