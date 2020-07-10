'use strict'

var express = require('express')
var sucursalController = require('../controllers/sucursalesController')
var md_auth = require("../middlewares/authenticated")

var api = express.Router()
api.put('/agregar-sucursal',md_auth.ensureAuth,sucursalController.agregarSucursal);
api.put('/editar-sucursal/:idEmpresa',md_auth.ensureAuth,sucursalController.editarScursal);
api.put('/eliminar-sucursal/:idSucursal',md_auth.ensureAuth,sucursalController.eliminarSucursal);
api.get('/sucursales/:idEmpresa',md_auth.ensureAuth,sucursalController.allSucursales);
api.get('/sucursales-cantidad-productos/:idEmpresa/:idSucursal',md_auth.ensureAuth,sucursalController.cantidadProductos);
module.exports = api;