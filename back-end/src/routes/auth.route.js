const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/refresh_token', authCtrl.getAccessToken);
// router.post('/forgot-password', authCtrl.forgotPassword);
// router.post('/reset-password', auth, authCtrl.resetPassword);

// // social login
// router.post('/google_login', authCtrl.googleLogin);


module.exports = router;
