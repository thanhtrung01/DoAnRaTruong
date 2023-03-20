const router = require('express').Router();
const upload = require('../middlewares/upload');
const authCTRL = require('../controllers/auth/auth.controller');

const { isAuth } = require('../middlewares/authentication');

router.post('/login', isAuth, authCTRL.login);
router.post('/register', upload.productImages('avatar'), authCTRL.register);
router.post('/logout', isAuth, authCTRL.login);
router.post('/refresh-tokens', isAuth, authCTRL.login);
router.post('/forgot-password', isAuth, authCTRL.login);
router.post('/reset-password', isAuth, authCTRL.resetPassword);
router.post('/send-verification-email', isAuth, authCTRL.resetPassword);
router.post('/verify-email', isAuth, authCTRL.resetPassword);


module.exports = router;
