var express = require('express');
var router = express.Router();

const ACCOUNT_CONTROLLER = require('../../../../controller/account.controller');

router.get('/', ACCOUNT_CONTROLLER.index);
router.post('/create', ACCOUNT_CONTROLLER.create);
router.put('/:id/update', ACCOUNT_CONTROLLER.update);
router.delete('/:id/delete', ACCOUNT_CONTROLLER.deleteAccount);

// transaction
router.put('/:id/deposit', ACCOUNT_CONTROLLER.deposit);
router.put('/:id/withdraw', ACCOUNT_CONTROLLER.withdraw);

module.exports = router