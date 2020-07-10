'use strict'

var bcrypt = require("bcrypt-nodejs");
var Empresa = require('../models/empresas')
var jwt = require("../services/jwt")


function agregarEmpresa(req,res) {
    var empresa = new Empresa();
    var params = req.body;

    if (params.nombreEmpresa && params.email && params.password) {
        empresa.nombreEmpresa = params.nombreEmpresa;
        empresa.email = params.email;
        empresa.direccion = params.direccion;
    
        Empresa.find({ $or: [  
            { email : empresa.email},
            { nombreEmpresa : empresa.nombreEmpresa}
        ]}).exec((err,datos)=>{
            if (err) return res.status(500).send({message : 'Error en la peticion de la empresa'})

            if (datos && datos.length >= 1){
                return res.status(500).send({ message : 'La empresa ya existe'})
            }else{
                
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    empresa.password = hash;
                    empresa.save((err,empresaGuardada)=>{
                        if(err) return res.status(500).send({message: 'Error en la peticion de la empresa'})
                        if(!empresaGuardada) return res.status(404).send({message: 'Error al agregar la empresa'})
                        return res.status(200).send({empresaGuardada})
                    })    
                })
            }    
        })
    }else{
        res.status(200).send({message: 'Llene todos los datos necesarios'})
    }

}



function login(req,res){
    var params = req.body;

    Empresa.findOne({email: params.email}, (err,empresa)=>{
        if (err) return res.status(500).send({message: 'Error de peticion'})

        if (empresa) {
            bcrypt.compare(params.password,empresa.password,(err,check)=>{
                if (check) {
                    if (params.getToken) {
                        return res.status(200).send({
                            token: jwt.createToken(empresa)
                        })
                    }else{
                        empresa.password = undefined;
                        return res.status(200).send({empresa})
                    }
                }else{
                    return res.status(404).send({message: 'La empresa no se ha podido identificar'})
                }
            })
        }else{
            return res.status(404).send({message: 'La empresa no se ha podido logear'})
        }
    })

}




module.exports = {
    agregarEmpresa,
    login
}