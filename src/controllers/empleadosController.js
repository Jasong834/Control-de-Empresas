'use strict'

var Sucursal = require('../models/sucursales')

function agregarEmpleado(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;
    var params = req.body;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para agregar datos esta empresa'})
    }

    Sucursal.findByIdAndUpdate(sucursalId,{$push:{empleados:{nombre:params.nombre,departamento:params.departamento,puesto:params.puesto}}},{new: true},(err,empleado)=>{
        if(err) return res.status(500).send({message:'Error en la peticion del producto'})
        if(!empleado) return res.status(404).send({message:'Error al guardar el producto'})
        return res.status(202).send({empleado})
    })
    
}

function editarEmpleado(req,res) {
    var empresaId = req.params.idEmpresa;
    var sucursalId = req.params.idSucursal;
    var empleadoId = req.params.idEmpleado;
    var params = req.body;
    var update={};
    
    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }
    
    if(params.nombre) update['empleados.$.nombre'] = params.nombre;
    if(params.puesto) update['empleados.$.puesto'] = params.puesto;
    if(params.departamento) update['empleados.$.departamento'] = params.departamento;
    
    Sucursal.findOneAndUpdate({_id: sucursalId,"empleados._id":empleadoId },update,{new: true},(err,empleado)=>{
        console.log(err)
        if(err) return res.status(500).send({message:'Error en la peticion del empleado'})
        if(!empleado) return res.status(404).send({message:'Error al editar el empleado'})
        return res.status(200).send({empleado})
    })
}


function eliminarEmpleados(req,res) {
    var empresaId = req.params.idEmpresa;
    var empleadoId = req.params.idEmpleado;
    var sucursalId  = req.params.idSucursal;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar esta empresa'})
    }

    Sucursal.findOneAndUpdate({_id:sucursalId},{$pull:{empleados:{_id:empleadoId}}},{new:true},(err,empleadoEliminado)=>{
        if(err) return res.status(500).send({message:'Error en la peticion del empleado'})
        if(!empleadoEliminado) return res.status(404).send({message:'Error al eliminar el empleado'})
        return res.status(200).send({empleadoEliminado})
    })
}

module.exports = {
    agregarEmpleado,
    editarEmpleado,
    eliminarEmpleados
}