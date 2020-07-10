'use strict'

//Variables Globales
const express = require("express")
const app = express();
const bodyparser = require("body-parser")

//Carga de rutas
var empresa_routes = require("./routes/empresaRoutes")
var login_routes = require('./routes/loginRoutes')
var bodega_routes = require('./routes/bodegaRoutes')
var sucursales_routes = require('./routes/sucursalesRoutes')
var empleado_routes = require('./routes/empleadoRoutes')
var productosS = require('./routes/productoSRoute')
//MIDDLEWARES
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Cabeceras
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Accept,Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE')
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE')
    next();
})

//Rutas
app.use('/api',empresa_routes,login_routes,bodega_routes,sucursales_routes,empleado_routes,productosS)
//export
module.exports = app;