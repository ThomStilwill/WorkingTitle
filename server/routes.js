var express    = require('express');
var app        = express();
var router = express.Router();

router.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


module.exports = router;