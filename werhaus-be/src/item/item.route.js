var express = require('express');
var router = express.Router();
const controller = require("./item.controller")

router.get('/itemList', controller.itemList);

module.exports = router;
