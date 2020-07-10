'use strict'

var express = require('express')
var bodegaController = require('../controllers/bodegaController')
var md_auth = require("../middlewares/authenticated")

var api = express.Router()
api.put('/agregar-producto/:IdEmpresa',md_auth.ensureAuth,bodegaController.agregarProducto);
api.put('/editar-producto/:IdEmpresa/:IdProducto',md_auth.ensureAuth,bodegaController.editarProducto);
api.put('/eliminar-producto/:idProducto',md_auth.ensureAuth,bodegaController.eliminarProducto);
module.exports = api;