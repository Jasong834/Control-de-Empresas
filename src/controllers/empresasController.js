'use strict'

var Empresa = require('../models/empresas')
var Sucursal = require('../models/sucursales')



function editarEmpresa(req,res) {
    var empresaId = req.params.IdEmpresa;
    var params = req.body;

    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para editar esta empresa'})
    }

    Empresa.findByIdAndUpdate(empresaId,params,{new:true},(err,empresaEditada)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de la encuesta'})
        if(!empresaEditada) return res.status(404).send({message:'Error al editar la empresa'})
        return res.status(200).send({empresaEditada})
    })

}

function eliminarEmpresa(req,res) {
    var empresaId = req.params.IdEmpresa;
    
    if (empresaId != req.user.sub) {
        return res.status(500).send({message: 'No tiene permisos para eliminar esta empresa'})
    }

    Empresa.findByIdAndDelete(empresaId,(err,empresaEliminada)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de la empresa'})
        if(!empresaEliminada) return res.status(404).send({message:'Error al eliminar la empresa'})
        if(empresaEliminada){
            Sucursal.deleteMany({empresa:empresaId},(err,sucursal)=>{
                if(err) console.log (err)
                console.log(sucursal)
            })
        }
        return res.status(200).send({empresaEliminada})
    })
}




function buscarById(req,res) {
    var empleadoId = req.params.IdEmpleado;

    Empresa.find({empleados:{$elemMatch:{_id:empleadoId}}},(err,empleado)=>{
        if(err) return res.status(500).send({message:'Error en la consulta de la empresa'})
        if(!empleado) return res.status(404).send({message:'error el aencontrar la empresa'})
        return res.status(200).send({empleado})
    })
}

// function buscarEmpleado(req,res) {
//     var dato = req.params.dato;
//     var empresaId =  req.params.IdEmpresa;
//     console.log(dato);
    
// // pro
//     Empresa.find({_id:empresaId, 'empleados.nombre': {$regex: dato,$options:'i' }  },  { 'empleados.$': 1 },(err,datos)=>{
//         console.log(err);
        
//         if(err) return res.status(500).send({message:'Error en la peticion del los datos'}) 
//         if(!datos) return res.status(404).send({message:'Error en al busqueda del dato'})
//         return res.status(200).send({datos})
//     })
// }


function cantidadProductos(req,res) {
    var empresaId = req.params.IdEmpresa;

    if (empresaId != req.user.sub)  {
        return res.status(500).send({message: 'No tiene permisos para editar datos esta empresa'})
    }

    Empresa.findById(empresaId,(err,empresa)=>{
        if(err) return res.status(500).send({message:'Error en la peticion de los datos'})
        if(!empresa) return res.status(404).send({message:'Error en la busqueda de los productos'})
        return res.status(200).send({totalProductos: empresa.bodega.length})
    })
}

function buscarProducto(req,res) {
    var dato = req.params.dato;
    var empresaId =  req.params.IdEmpresa;
    console.log(dato);
    
// pro
    Empresa.find({_id:empresaId, 'bodega.nombreProducto': {$regex: dato,$options:'i' }  },  { 'bodega.$': 1 },(err,datos)=>{
        console.log(err);
        
        if(err) return res.status(500).send({message:'Error en la peticion del los datos'}) 
        if(!datos) return res.status(404).send({message:'Error en al busqueda del dato'})
        return res.status(200).send({datos})
    })
}


module.exports={
    editarEmpresa,
    eliminarEmpresa,
    buscarById,
    cantidadProductos,
    buscarProducto
}