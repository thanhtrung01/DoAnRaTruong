const router = require('express').Router();
const productCTRL = require('../controllers/product.controller');
const { isAuth } = require("../middlewares/authentication");
const upload = require('../middlewares/upload');
const { Cors } = require("../middlewares/cors");

router.get('/', Cors, productCTRL.getProducts);
router.get('/:productId', productCTRL.getProduct);

router.get('/search:keyword', productCTRL.searchProductParams);
router.post('/search', productCTRL.searchProduct);

// router.post('/create-product', upload.single('imageProduct'), productCTRL.createProduct); //, isAuth 
//
router.post('/create-product', upload.productImages(), productCTRL.createProduct); //, isAuth
// router.put('/:productId', isAuth, productCTRL.updateProduct);
// router.delete('/:productId', isAuth, productCTRL.deleteProduct);
router.put('/:productId', productCTRL.updateProduct);
router.delete('/:productId', productCTRL.deleteProduct);

module.exports = router;
