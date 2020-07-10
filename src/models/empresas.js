'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombreEmpresa : String,
    email:String,
    password:String,
    direccion: String,
    bodega:[{
        nombreProducto:String,
        descripcion:String,
        cantidad:Number
    }],
})

module.exports = mongoose.model('empresa', EmpresaSchema)