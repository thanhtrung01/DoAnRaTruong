const router = require('express').Router();

const orderCTRL = require('../controllers/order.controller');

const { isAuth } = require('../middlewares/authentication');

router.get('/', orderCTRL.getOrders);
router.get('/:orderId', orderCTRL.getOrder);
router.post('/create-order', orderCTRL.createOrder); //, isAuth
//router.put("/:orderId", isAuth, orderCTRL.updateOrder);
// router.delete('/:orderId', isAuth, orderCTRL.deleteOrder);
router.delete('/:orderId', orderCTRL.deleteOrder);

module.exports = router;
