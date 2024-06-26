const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.route');
const routerCart = require('./cart.router');
const { verifyJwt } = require('../utils/verifyJWT');
const router = express.Router();

router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/carts', verifyJwt, routerCart)

module.exports = router;