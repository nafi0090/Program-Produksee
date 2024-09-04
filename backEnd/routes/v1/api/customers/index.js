var express = require('express');
var router = express.Router();

const CUSTOMER_CONTROLLER = require('../../../../controller/customer.controller');

router.get('/', CUSTOMER_CONTROLLER.index);
router.post('/create', CUSTOMER_CONTROLLER.create);
router.put('/:id/update', CUSTOMER_CONTROLLER.update);
router.delete('/:id/delete', CUSTOMER_CONTROLLER.deletedata);

module.exports = router