'use strict'
var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var SucursalSchema = Schema({
    empresa:{type:Schema.ObjectId,ref:'empresa'},
    nombreSucursal:String,
    direccion:String,
    productos:[{
        producto:String,
        cantidad:Number
    }],
    empleados:[{
        nombre: String,
        puesto: String,
        departamento: String
    }]
})

module.exports=mongoose.model('sucursal',SucursalSchema);