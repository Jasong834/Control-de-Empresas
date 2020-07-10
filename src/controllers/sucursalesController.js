'use strict'

var Sucursal = require('../models/sucursales')

function agregarSucursal(req,res) {
    var sucursal = new Sucursal();
    var params = req.body;

    sucursal.empresa = req.user.sub;
    sucursal.nombreSucursal = params.nombreSucursal;
    sucursal.direccion = params.direccion
    sucursal.save((err,sucursal)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion de la sucursal'})
        if(!sucursal) return res.status(404).send({message: 'Error al agregar la sucursal'})
        return res.status(200).send({sucursal})
    })    

}

function editarScursal(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;
    var params = req.body;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    Sucursal.findByIdAndUpdate(sucursalId,params,{new:true},(err,sucursal)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de la sucursal'})
        if(!sucursal) return res.status(404).send({message:'Error al editar la sucursal'})
        return res.status(200).send({sucursal})
    })
}

function eliminarSucursal(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    Sucursal.findByIdAndDeleteid(sucursalId,(err,sucursal)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de la sucursal'})
        if(!sucursal) return res.status(404).send({message:'Error al eliminar la sucursal'})
        return res.status(200).send({sucursal})
    })
}

function allSucursales(req,res) {
    var empresaId = req.params.idEmpresa;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    Sucursal.find((err,sucursales)=>{
        if(err) return res.status(500).send({message:'error en la peticion de las sucursales'})
        return res.status(200).send({sucursales})
    })

}

function cantidadProductos(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    Sucursal.findById(sucursalId,(err,sucursal)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de los datos'})
        if(!sucursal) return res.status(404).send({message:'Error en la busqueda de los productos'})
        return res.status(200).send({totalProductos: sucursal.productos.length})
    })
}

module.exports = {
    agregarSucursal,
    editarScursal,
    eliminarSucursal,
    allSucursales,
    cantidadProductos
}