'use strict'

var Empresa = require('../models/empresas')

function agregarProducto(req,res) {
    var empresaId = req.params.IdEmpresa;
    var params = req.body;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para agregar datos esta empresa'})
    }

    Empresa.findByIdAndUpdate(empresaId,{$push:{bodega:{nombreProducto: params.nombreProducto,descripcion:params.descripcion,cantidad:params.cantidad}}},{new: true},(err,producto)=>{
        if(err) return res.status(500).send({message:'Error en la peticion del producto'})
        if(!producto) return res.status(404).send({message:'Error al guardar el producto'})
        return res.status(202).send({producto})
    })

}

function editarProducto(req,res) {
    var empresaId = req.params.IdEmpresa;
    var productoId = req.params.IdProducto;
    var params = req.body;
    var update={};

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    if(params.nombreProducto) update['bodega.$.nombreProducto'] = params.nombreProducto;
    if(params.descripcion) update['bodega.$.descripcion'] = params.descripcion;
    if(params.cantidad) update['bodega.$.cantidad'] = params.cantidad;

    Empresa.findOneAndUpdate({_id: empresaId,"bodega._id":productoId },update,{new:true},(err,producto)=>{
        if(err) return res.status(500).send({message:'Error en la peticion del producto'})
        if(!producto) return res.status(404).send({message:'Error al editar el producto'})
        return res.status(200).send({producto})
    })
}

function eliminarProducto(req,res) {
    var empresaId = req.params.IdEmpresa;
    var productoId = req.params.IdProducto;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    Empresa.findOneAndUpdate({"bodega._id":productoId }, {$pull:{bodega:{_id:productoId}} },{new:true},(err,producto)=>{
        if(err) return res.status(500).send({message:'Error en la peticion del producto'})
        if(!producto) return res.status(404).send({message:'Error al eliminar el producto'})
        return res.status(200).send({producto})
    })
}

module.exports = {
    agregarProducto,
    editarProducto,
    eliminarProducto
}