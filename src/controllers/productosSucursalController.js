'use strict'

var Sucursal = require('../models/sucursales')
var Empresa = require('../models/empresas')

function agregarProducto(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;
    var params = req.body;

    var cantidadS = Number;
    var cantidadP = Number;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para agregar datos esta empresa'})
    }

    Empresa.findOne({'bodega._id':params.idProducto},{'bodega.$.':1},(err,empresa)=>{
        console.log(err)
        if(err) return res.status(500).send({message:'error en la petcion de la empresa'})
        if(!empresa) return res.status(404).send({message:'error en la empresa'})
        cantidadS= empresa.bodega.id(params.idProducto)['cantidad']
        
        if(params.cantidad > cantidadS){
            console.log(cantidadS)
            return res.status(404).send({message:'No existen suficientes existencias del producto'})
        }else if(params.cantidad <= cantidadS){
            cantidadP = cantidadS - params.cantidad;
            Sucursal.findByIdAndUpdate(sucursalId,{$push:{productos:{producto:params.idProducto,cantidad:params.cantidad}}},{new:true},(err,producto)=>{
                if(err) console.log(err)
                if(producto){
                    var update = {}
                    if(cantidadP != null) update['bodega.$.cantidad'] = cantidadP;
                    Empresa.findOneAndUpdate({_id:empresaId,'bodega._id':params.idProducto},update,(err,productoStock)=>{
                        if(err) console.log(err)
                        console.log(productoStock)
                    })
                }
                console.log(producto)
                return res.status(200).send({producto})
            })

        }
    })
}

function editarProducto(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;
    var sucursI = req.params.idSucur;
    var params = req.body;

    var cantidadS = Number;
    var cantidadP = Number;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para agregar datos esta empresa'})
    }

    Empresa.findOne({'bodega._id':params.idProducto},{'bodega.$.':1},(err,empresa)=>{
        console.log(err)
        if(err) return res.status(500).send({message:'error en la petcion de la empresa'})
        if(!empresa) return res.status(404).send({message:'error en la empresa'})
        cantidadS= empresa.bodega.id(params.idProducto)['cantidad']
        console.log(cantidadS)
        
        if(params.cantidad > cantidadS){
            return res.status(404).send({message:'No existen suficientes existencias del producto'})
        }else if(params.cantidad <= cantidadS){
            console.log(cantidadS)
            var update1 ={}
            if(params.canitdad) update1['productos.$.cantidad'] = params.cantidad;
            
            cantidadP = cantidadS - params.cantidad;
            console.log(update1)

            Sucursal.findOneAndUpdate({_id:sucursalId,'productos._id':sucursI},update1,(err,producto)=>{
                if(err) console.log(err)
                if(producto){
                    var update = {}
                    if(cantidadP != null) update['bodega.$.cantidad'] = cantidadP;
                    Empresa.findOneAndUpdate({_id:empresaId,'bodega._id':params.idProducto},update,{new:true},(err,productoStock)=>{
                        if(err) console.log(err)
                        console.log(productoStock)
                    })
                }
                //console.log(producto)
                return res.status(200).send({producto})
            })

        }
    })
}


function deleteProducto(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;
    var sucursI = req.params.idSucur;
    
    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para agregar datos esta empresa'})
    }

    Sucursal.findOneAndUpdate({_id:sucursalId},{$pull:{productos:{_id:sucursI}}},{new:true},(err,productoE)=>{
        if(err) return res.status(500).send({message:'Error en la peticion del producto'})
        if(!productoE) return res.status(404).send({message:'Error al eliminar el producto'})
        return res.status(200).send({productoE})
    })


}



module.exports={
    agregarProducto,
    editarProducto,
    deleteProducto
}