const express = require("express");
const userController = require("../controllers/user.controller");
const upload = require("../middlewares/upload");
const authAdmin = require("../middlewares/authAdmin");
const router = express.Router();

router.get('/get-user', userController.getUser);
router.get('/get-users', authAdmin, userController.getAllUser);
router.post('/get-user-with-email', userController.getUserWithMail);
router.patch('/:userId', upload.Avatar('avatar'), userController.updateUser);
router.post('/create-user',authAdmin, upload.Avatar('avatar'), userController.createUser);
router.delete('/delete-user/:userId', authAdmin, userController.deleteUser);
module.exports = router;
