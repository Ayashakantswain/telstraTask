var express = require('express');
var router = express.Router();
// const { body, check, param } = require('express-validator');


var controller = require("../controllers/controller");

router.post('/v1', [

], controller.replacePlaceholders)


module.exports = router;
