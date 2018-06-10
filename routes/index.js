const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Googie: the art ificial word speaker' });
});

router.get('/control', function(req, res, next) {
  res.render('control', { title: 'Googie: the art ificial word speaker' });
});

router.get('/command', function(req, res, next) {
  res.render('command', { title: 'Googie: the art ificial word speaker' });
});

module.exports = router;
