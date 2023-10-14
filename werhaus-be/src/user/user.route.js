var express = require('express');
var router = express.Router();
const controller = require("./user.controller")

router.post('/registers', controller.register)
.post('/logins', controller.login)

module.exports = router;
