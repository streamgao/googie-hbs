const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('control', { title: 'Googie: the art ificial word speaker' });
});

router.get('/command', function(req, res, next) {
    res.render('command', { title: 'Googie: the art ificial word speaker' });
});


// router.get('/test', function(req, res, next) {
//   res.send('respond with a test resource');
// });

module.exports = router;
