var express = require('express');
var router = express.Router();
const controller = require("./item.controller")

router.post('/store', controller.store)

module.exports = router;