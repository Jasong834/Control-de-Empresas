'use strict'

var express = require('express')
var loginController = require('../controllers/loginController')


var api = express.Router()
api.post('/registrar-empresa',loginController.agregarEmpresa)
api.post('/login',loginController.login)
module.exports = api;