var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    console.log("MASUK");
  res.json({
    message: 'this is test end point'
  })
});

module.exports = router;
