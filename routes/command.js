const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('command', { title: 'Googie: the art ificial word speaker' });
});

module.exports = router;
