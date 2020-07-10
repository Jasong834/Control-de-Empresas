'use strict'

var express = require('express')
var empresasController = require('../controllers/empresasController')
var md_auth = require("../middlewares/authenticated")

var api = express.Router()
api.put('/editar-empresa/:IdEmpresa',md_auth.ensureAuth,empresasController.editarEmpresa);
api.delete('/eliminar-empresa/:IdEmpresa',md_auth.ensureAuth,empresasController.eliminarEmpresa);
// api.get('/buscar-empleado/:IdEmpleado',empresasController.buscarById);
api.get('/buscar-empleado-especifico/:IdEmpresa/:dato',md_auth.ensureAuth,empresasController.buscarProducto);
api.get('/cantidad-productos/:IdEmpresa',md_auth.ensureAuth,empresasController.cantidadProductos);
module.exports = api;