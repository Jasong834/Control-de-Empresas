'use strict'

var express = require('express')
var empleadoController = require('../controllers/empleadosController')
var md_auth = require("../middlewares/authenticated")

var api = express.Router()
api.put('/agregar-empleado/:idEmpresa/:idSucursal',md_auth.ensureAuth,empleadoController.agregarEmpleado);
api.put('/editar-empleado/:idEmpresa/:idSucursal/:idEmpleado',md_auth.ensureAuth,empleadoController.editarEmpleado);
api.put('/eliminar-empleado/:idEmpresa/:idSucursal/:idEmpleado',md_auth.ensureAuth,empleadoController.eliminarEmpleados);
module.exports = api;