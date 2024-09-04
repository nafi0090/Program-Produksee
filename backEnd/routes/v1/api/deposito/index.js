var express = require('express');
var router = express.Router();

const DEPOSITO_TYPE_CONTROLLER = require('../../../../controller/deposito-type.constroller')

router.get('/', DEPOSITO_TYPE_CONTROLLER.index);
router.post('/create', DEPOSITO_TYPE_CONTROLLER.create);
router.put('/:id/update', DEPOSITO_TYPE_CONTROLLER.update);
router.delete('/:id/delete', DEPOSITO_TYPE_CONTROLLER.deletedata);

module.exports = router