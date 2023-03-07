const router = require('express').Router();
const upload = require('../middlewares/upload');
const authCTRL = require('../controllers/auth/auth.controller');

const { isAuth } = require('../middlewares/authentication');

router.post('/login', authCTRL.login);
router.post('/register', upload.single('avatar'), authCTRL.register);
router.post('/reset-password', isAuth, authCTRL.resetPassword);

module.exports = router;
