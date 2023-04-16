const express = require('express');
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/upload');
const authAdmin = require('../middlewares/authAdmin');
const router = express.Router();
//User
router.get('/get-user', userController.getUser);
router.post('/get-user-with-email', userController.getUserWithMail);
router.patch('/:userId', upload.Avatar('avatar'), userController.updateUser);

//router admin
router.post(
	'/create-user',
	authAdmin,
	upload.Avatar('avatar'),
	userController.createUser
);
module.exports = router;
