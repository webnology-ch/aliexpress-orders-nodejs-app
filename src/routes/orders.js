const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.get('/', ordersController.listOrders);
router.get('/images', ordersController.imagesView);
router.get('/:id', ordersController.orderDetail);

module.exports = router;