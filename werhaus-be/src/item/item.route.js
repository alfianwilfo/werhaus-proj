var express = require('express');
var router = express.Router();
const controller = require("./item.controller")

router.post('/store', controller.store)
.get('/list', controller.list)

module.exports = router;
