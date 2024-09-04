const express = require('express');
const router = express.Router();
const CUSTOMER_ROUTER = require('./customers');
const ACCOUNT_ROUTER = require('./account');
const DEPOSITO_TYPE_ROUTER = require('./deposito');

router.use('/customers', CUSTOMER_ROUTER);
router.use('/account', ACCOUNT_ROUTER);
router.use('/deposito', DEPOSITO_TYPE_ROUTER);

module.exports = router;