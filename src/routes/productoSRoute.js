'use strict'

var express = require('express')
var productosS = require('../controllers/productosSucursalController')
var md_auth = require("../middlewares/authenticated")

var api = express.Router()
api.put('/agregar-producto-sucursal/:idEmpresa/:idSucursal',md_auth.ensureAuth,productosS.agregarProducto);
api.put('/editar-producto-sucursal/:idEmpresa/:idSucursal/:idSucur',md_auth.ensureAuth,productosS.editarProducto);
api.put('/eliminar-producto-sucursal/:idEmpresa/:idSucursal/:idSucur',md_auth.ensureAuth,productosS.deleteProducto);
module.exports = api;