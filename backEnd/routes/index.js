var express = require('express');
var router = express.Router();

const V1_ROUTER = require('./v1');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.use('/v1', V1_ROUTER);

module.exports = router;